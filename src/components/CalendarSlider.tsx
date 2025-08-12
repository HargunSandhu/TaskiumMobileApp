import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

const SCREEN_WIDTH = Dimensions.get('window').width;
const VISIBLE_ITEMS = 5;
const ITEM_WIDTH = SCREEN_WIDTH / VISIBLE_ITEMS;

function generateDateRange(start: Date, days: number) {
  const dates: Date[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    dates.push(date);
  }
  return dates;
}

export type CalendarSliderRef = {
  scrollToDate: (date: Date) => void;
};

const CalendarSlider = forwardRef<
  CalendarSliderRef,
  {
    onMonthChange?: (month: string) => void;
    onDateChange?: (date: Date) => void;
  }
>(({onMonthChange, onDateChange}, ref) => {
  // initial 60-day window centered on today
  const initialStart = new Date();
  initialStart.setDate(initialStart.getDate() - 30);

  const [dates, setDates] = useState(() => generateDateRange(initialStart, 60));
  const carouselRef = useRef<ICarouselInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(30); // start in middle
  const isUpdatingRef = useRef(false);

  const notifyParent = (date: Date) => {
    const monthYear = date.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
    onMonthChange?.(monthYear);
    onDateChange?.(date);
  };

  const handleSnap = (rawIndex: number) => {
    if (isUpdatingRef.current) return;
    let index = rawIndex;
    const visibleDate = dates[index]; // capture visible date BEFORE modifying dates

    // Append when near end
    if (index > dates.length - 10) {
      isUpdatingRef.current = true;
      const lastDate = dates[dates.length - 1];
      const newDates = generateDateRange(
        new Date(
          lastDate.getFullYear(),
          lastDate.getMonth(),
          lastDate.getDate() + 1,
        ),
        30,
      );
      setDates(prev => [...prev, ...newDates]);
      // active index remains the same visual date
      setActiveIndex(index);
      // notify parent with the visible date we captured
      notifyParent(visibleDate);
      isUpdatingRef.current = false;
      return;
    }

    // Prepend when near start
    if (index < 10) {
      isUpdatingRef.current = true;
      const firstDate = dates[0];
      const start = new Date(firstDate);
      start.setDate(firstDate.getDate() - 30);
      const newDates = generateDateRange(start, 30);
      setDates(prev => [...newDates, ...prev]);
      const newIndex = index + newDates.length; // keep same visible date
      // small delay to let carousel notice new data
      setTimeout(() => {
        carouselRef.current?.scrollTo({index: newIndex, animated: false});
      }, 30);
      setActiveIndex(newIndex);
      notifyParent(visibleDate);
      isUpdatingRef.current = false;
      return;
    }

    // Normal snap within bounds
    setActiveIndex(index);
    notifyParent(dates[index]);
  };

  // Expose scrollToDate to parent. If date isn't inside current window, prepend/append as needed.
  useImperativeHandle(ref, () => ({
    scrollToDate: (date: Date) => {
      // Normalize target to midnight for comparison
      const target = new Date(date);
      target.setHours(0, 0, 0, 0);

      // try to find exact date first
      const foundIndex = dates.findIndex(d => {
        const dd = new Date(d);
        dd.setHours(0, 0, 0, 0);
        return dd.getTime() === target.getTime();
      });

      if (foundIndex !== -1) {
        setActiveIndex(foundIndex);
        carouselRef.current?.scrollTo({index: foundIndex, animated: true});
        notifyParent(dates[foundIndex]);
        return;
      }

      // compute diff in days from dates[0]
      const start = new Date(dates[0]);
      start.setHours(0, 0, 0, 0);
      const diffDays = Math.round(
        (target.getTime() - start.getTime()) / 86400000,
      );

      if (diffDays < 0) {
        // need to prepend
        const needed = Math.ceil(Math.abs(diffDays) / 30) * 30;
        const newStart = new Date(start);
        newStart.setDate(start.getDate() - needed);
        const newDates = generateDateRange(newStart, needed);
        setDates(prev => [...newDates, ...prev]);
        const newIndex = diffDays + newDates.length;
        setTimeout(() => {
          carouselRef.current?.scrollTo({index: newIndex, animated: true});
        }, 40);
        setActiveIndex(newIndex);
        notifyParent(target);
        return;
      }

      if (diffDays >= dates.length) {
        // need to append
        const needed = Math.ceil((diffDays - dates.length + 1) / 30) * 30;
        const last = dates[dates.length - 1];
        const appendStart = new Date(last);
        appendStart.setDate(last.getDate() + 1);
        const newDates = generateDateRange(appendStart, needed);
        setDates(prev => [...prev, ...newDates]);
        const newIndex = diffDays;
        setTimeout(() => {
          carouselRef.current?.scrollTo({index: newIndex, animated: true});
        }, 40);
        setActiveIndex(newIndex);
        notifyParent(target);
        return;
      }

      // fallback (shouldn't happen)
    },
  }));

  return (
    <View style={{marginTop: 20}}>
      <Carousel
        ref={carouselRef}
        width={ITEM_WIDTH}
        height={90}
        style={{width: SCREEN_WIDTH}}
        data={dates}
        loop={false}
        defaultIndex={activeIndex}
        onSnapToItem={handleSnap}
        renderItem={({item, index}) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              style={[
                styles.item,
                isActive && styles.activeItem,
                isActive && {transform: [{scale: 1.08}]},
              ]}
              onPress={() => {
                // instant update on press
                setActiveIndex(index);
                carouselRef.current?.scrollTo({index, animated: true});
                notifyParent(item);
              }}>
              <Text style={[styles.dateText, isActive && styles.activeDate]}>
                {item.getDate()}
              </Text>
              <Text style={[styles.dayText, isActive && styles.activeDay]}>
                {item.toLocaleDateString('en-GB', {weekday: 'short'})}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH - 8,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
    marginHorizontal: 4,
  },
  activeItem: {
    backgroundColor: '#9B7CF9',
  },
  dateText: {
    fontSize: 18,
    color: '#ccc',
  },
  activeDate: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dayText: {
    fontSize: 12,
    color: '#888',
  },
  activeDay: {
    color: '#fff',
  },
});

export default CalendarSlider;
