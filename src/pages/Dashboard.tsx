import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../components/Header';
import Images from '../assets/Images';
import TaskSelector from '../components/TaskSelector';
import DailyTasksList from '../components/DailyTasksList';
import PriorityTasksList from '../components/PriorityTaskList';
import Menu from '../components/Menu';

const Dashboard = () => {
  const [taskType, setTaskType] = useState<'daily' | 'priority'>('daily');
  const [searchQuery, setSearchQuery] = useState('');

  const date = new Date();
  const currentDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.logo}>
        <Header />
      </View>

      <View style={styles.topContainer}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>Hello User</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>
        <Menu />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          placeholderTextColor="#6E6E7A"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Image source={{uri: Images.searchIcon}} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      <TaskSelector selected={taskType} setSelected={setTaskType} />

      {taskType === 'daily' && <DailyTasksList searchQuery={searchQuery} />}
      {taskType === 'priority' && (
        <PriorityTasksList searchQuery={searchQuery} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#0B0B0F',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    marginTop: 25,
  },
  greeting: {
    fontSize: 36,
    fontWeight: '900',
    color: '#fff',
  },
  date: {
    fontSize: 24,
    color: '#fff',
  },
  greetingContainer: {
    marginTop: 14,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16161D',
    borderColor: '#23232B',
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    height: 50,
    marginTop: 35,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
    color: '#fff',
  },
  searchIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});

export default Dashboard;
