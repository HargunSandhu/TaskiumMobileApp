import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import Images from '../assets/Images';
import CalendarSlider from '../components/CalendarSlider';

const Calendar = () => {
  const [currentMonthYear, setCurrentMonthYear] = useState(
    new Date().toLocaleDateString('en-GB', {month: 'long', year: 'numeric'}),
  );

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
            style={styles.icon}
          />
          <Text style={styles.text}>{currentMonthYear}</Text>
        </View>

        <CalendarSlider onMonthChange={setCurrentMonthYear} />
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
    marginBottom: 20,
  },
  icon: {
    marginRight: 12, // fixed gap between icon and month text
  },
  text: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default Calendar;
