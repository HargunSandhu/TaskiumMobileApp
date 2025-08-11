import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const VISIBLE_ITEMS = 5;
const ITEM_SPACING = 8;
const ITEM_WIDTH =
  (SCREEN_WIDTH - ITEM_SPACING * (VISIBLE_ITEMS - 1)) / VISIBLE_ITEMS;

function getDates(range: number) {
  const today = new Date();
  const dates = [];

  for (let i = -range; i <= range; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
}

const CalendarSlider = ({
  onMonthChange,
}: {
  onMonthChange?: (month: string) => void;
}) => {
  const [dates] = useState(() => getDates(90)); // 3 months before & after
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(Math.floor(dates.length / 2));

  useEffect(() => {
    const currentDate = dates[activeIndex];
    const monthYear = currentDate.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    });
    onMonthChange?.(monthYear);
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5, // centers the item
    });
  };

  return (
    <View style={{marginTop: 20}}>
      <FlatList
        ref={flatListRef}
        horizontal
        data={dates}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={activeIndex}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH + ITEM_SPACING,
          offset: (ITEM_WIDTH + ITEM_SPACING) * index,
          index,
        })}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              style={[
                styles.item,
                {width: ITEM_WIDTH, marginRight: ITEM_SPACING},
                isActive && styles.activeItem,
              ]}
              onPress={() => handleSelect(index)}>
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
};

const styles = StyleSheet.create({
  item: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#1A1A1A',
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
