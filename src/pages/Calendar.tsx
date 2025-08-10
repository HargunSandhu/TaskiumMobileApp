import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import Images from '../assets/Images';
import CalendarSlider from '../components/CalendarSlider';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDate = selectedDate.toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={styles.main}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{alignItems: 'center', paddingBottom: 100}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Header />

        <Text style={styles.heading}>Calendar</Text>

        <View style={styles.row}>
          <Image
            source={{uri: Images.calendar2}}
            height={40}
            width={40}
            tintColor={'#fff'}
          />
          <Text style={styles.text}>{currentDate}</Text>
        </View>

        <CalendarSlider />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#0B0B0F',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontFamily: 'Poppins',
    fontSize: 42,
    color: '#ffffff',
    fontWeight: '800',
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '45%',
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default Calendar;
