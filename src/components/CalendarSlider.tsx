import React, {useMemo, useRef} from 'react';
import {View, Pressable} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type {ICarouselInstance} from 'react-native-reanimated-carousel';
import Carousel from 'react-native-reanimated-carousel';

const SCREEN_WIDTH = 360; // or Dimensions.get('window').width
const VISIBLE_ITEMS = 5; // how many dates to show
const ITEM_WIDTH = SCREEN_WIDTH / VISIBLE_ITEMS;
const ITEM_HEIGHT = 70;

function getDates(range: number) {
  const today = new Date();
  const dates = [];
  for (let i = -range; i <= range; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function CalendarSlider() {
  const dates = useMemo(() => getDates(30), []);
  const carouselRef = useRef<ICarouselInstance>(null);

  return (
    <View
      style={{
        paddingVertical: 20,
        backgroundColor: '#0D0D0D',
      }}>
      <Carousel
        ref={carouselRef}
        loop={false}
        style={{
          width: SCREEN_WIDTH,
          height: ITEM_HEIGHT,
        }}
        width={ITEM_WIDTH}
        height={ITEM_HEIGHT}
        data={dates}
        defaultIndex={30} // keep this if you want today in center
        mode="horizontal-stack"
        modeConfig={{
          snapDirection: 'left', // default is left, but will center items
          stackInterval: ITEM_WIDTH,
        }}
        snapEnabled
        pagingEnabled={false}
        renderItem={({item, animationValue, index}) => (
          <DateItem
            animationValue={animationValue}
            date={item}
            onPress={() => {
              carouselRef.current?.scrollTo({
                index,
                animated: true,
              });
            }}
          />
        )}
      />
    </View>
  );
}

interface DateItemProps {
  animationValue: Animated.SharedValue<number>;
  date: Date;
  onPress?: () => void;
}

const DateItem: React.FC<DateItemProps> = ({animationValue, date, onPress}) => {
  const translateY = useSharedValue(0);

  const containerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.7, 1, 0.7],
      Extrapolation.CLAMP,
    );

    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['transparent', '#6C63FF', 'transparent'],
    );

    return {
      opacity,
      backgroundColor,
    };
  }, [animationValue]);

  const textStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [1, 1.25, 1],
      Extrapolation.CLAMP,
    );

    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#aaa', '#fff', '#aaa'],
    );

    return {
      transform: [{scale}, {translateY: translateY.value}],
      color,
    };
  }, [animationValue, translateY]);

  const subTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ['#888', '#fff', '#888'],
    );
    return {color};
  }, [animationValue]);

  const onPressIn = () => {
    translateY.value = withTiming(-8, {duration: 200});
  };

  const onPressOut = () => {
    translateY.value = withTiming(0, {duration: 200});
  };

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          {
            width: ITEM_WIDTH,
            height: ITEM_HEIGHT,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          },
          containerStyle,
        ]}>
        <Animated.Text style={[{fontSize: 22, fontWeight: 'bold'}, textStyle]}>
          {date.getDate()}
        </Animated.Text>
        <Animated.Text style={[{fontSize: 14}, subTextStyle]}>
          {date.toLocaleString('en-US', {weekday: 'short'})}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
};
