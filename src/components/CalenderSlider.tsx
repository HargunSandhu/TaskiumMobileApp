import React, {useRef, useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

const ITEM_WIDTH = 60;
const SCREEN_WIDTH = Dimensions.get('window').width;
const SPACER = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

function getMonthDates(centerDate: Date, range: number = 30): Date[] {
  const dates: Date[] = [];
  for (let i = -range; i <= range; i++) {
    const copy = new Date(centerDate.getTime());
    copy.setDate(copy.getDate() + i);
    dates.push(copy);
  }
  return dates;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

const CalendarSlider = ({
  onDateChange,
}: {
  onDateChange?: (date: Date) => void;
}) => {
  const flatListRef = useRef<FlatList>(null);

  const today = new Date();
  const initialDates = getMonthDates(today);
  const todayIndex = initialDates.findIndex(d => isSameDay(d, today));

  const [dates] = useState<Date[]>(initialDates);
  const [selectedIndex, setSelectedIndex] = useState<number>(todayIndex);

  useEffect(() => {
    if (todayIndex !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: todayIndex,
          animated: false,
          viewPosition: 0.5, // 👈 centers the item
        });
        onDateChange?.(dates[todayIndex]);
      }, 100);
    }
  }, []);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const centerOffset = event.nativeEvent.contentOffset.x + SCREEN_WIDTH / 2;
    const index = Math.round(centerOffset / ITEM_WIDTH);
    if (index >= 0 && index < dates.length) {
      setSelectedIndex(index);
      onDateChange?.(dates[index]);
    }
  };

  const renderItem = ({item, index}: {item: Date; index: number}) => {
    const isSelected = index === selectedIndex;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          {backgroundColor: isSelected ? '#6750A4' : '#1C1C23'},
        ]}
        onPress={() => {
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5, // 👈 centers the item when pressed
          });
          setSelectedIndex(index);
          onDateChange?.(item);
        }}>
        <Text style={[styles.day, {color: isSelected ? '#fff' : '#ccc'}]}>
          {item.toLocaleDateString('en-US', {weekday: 'short'})}
        </Text>
        <Text style={[styles.date, {color: isSelected ? '#fff' : '#ccc'}]}>
          {item.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={dates}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: SPACER}}
      renderItem={renderItem}
      snapToInterval={ITEM_WIDTH}
      snapToAlignment="center"
      decelerationRate="fast"
      onMomentumScrollEnd={handleMomentumScrollEnd}
      scrollEventThrottle={16}
      getItemLayout={(_, index) => ({
        length: ITEM_WIDTH,
        offset: ITEM_WIDTH * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 4,
  },
  day: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CalendarSlider;
