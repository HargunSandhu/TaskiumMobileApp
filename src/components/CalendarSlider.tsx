import React, {useState, useRef, useEffect} from 'react';
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

export default function CalendarSlider({
  onMonthChange,
  onDateChange,
}: {
  onMonthChange?: (month: string) => void;
  onDateChange?: (date: Date) => void;
}) {
  const initialStart = new Date();
  initialStart.setDate(initialStart.getDate() - 30);

  const [dates, setDates] = useState(() => generateDateRange(initialStart, 60));
  const carouselRef = useRef<ICarouselInstance>(null);
  const [activeIndex, setActiveIndex] = useState(30); // start in middle

  useEffect(() => {
    const currentDate = dates[activeIndex];
    if (currentDate) {
      const monthYear = currentDate.toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      });
      onMonthChange?.(monthYear);
      onDateChange?.(currentDate);
    }
  }, [activeIndex, dates]);

  const handleSnap = (index: number) => {
    // Append dates if close to end
    if (index > dates.length - 10) {
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
    }

    // Prepend dates if close to start
    if (index < 10) {
      const firstDate = dates[0];
      const newDates = generateDateRange(
        new Date(
          firstDate.getFullYear(),
          firstDate.getMonth(),
          firstDate.getDate() - 30,
        ),
        30,
      );
      setDates(prev => [...newDates, ...prev]);
      index += 30; // adjust to maintain same visual date
      carouselRef.current?.scrollTo({index, animated: false});
    }

    setActiveIndex(index);
  };

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
              style={[styles.item, isActive && styles.activeItem]}
              onPress={() => {
                setActiveIndex(index);
                carouselRef.current?.scrollTo({index, animated: true});
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
}

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH - 8,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
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
