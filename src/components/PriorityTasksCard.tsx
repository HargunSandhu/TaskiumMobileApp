import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type PriorityTaskCardProps = {
  task_name?: string;
  priority?: string;
  due_date?: string;
  progress?: number;
};

const PriorityTaskCard = ({
  task_name,
  priority,
  due_date,
  progress,
}: PriorityTaskCardProps) => {
  const PriorityTag = () => {
    let color;
    let label;
    if (priority === 'low') {
      color = '#32D74B';
      label = 'Low Priority';
    } else if (priority === 'medium') {
      color = '#FFD60A';
      label = 'Medium Priority';
    } else if (priority === 'high') {
      color = '#FF3B30';
      label = 'High Priority';
    }
    // console.log('priority:', priority);

    return (
      <View style={[styles.priorityTag, {borderColor: color}]}>
        <Text style={[styles.priorityText, {color}]}>{label}</Text>
      </View>
    );
  };
  return (
    <View style={styles.card}>
      <LinearGradient colors={['#00C9FF', '#9256F5']} style={styles.leftBar} />

      <View style={styles.content}>
        <Text style={styles.heading}>{task_name}</Text>
        <PriorityTag />
        <Text style={styles.date}>
          {
            <Text>
              {due_date
                ? new Date(due_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'No due date'}
            </Text>
          }
        </Text>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{progress}</Text>
          <View style={styles.progressBarBackground}>
            <LinearGradient
              colors={['#5282FF', '#A26BFE']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={[styles.progressBarFill, {width: progress}]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1C1C26',
    borderRadius: 16,
    padding: 16,
    width: 330,
    height: 144,
    // marginLeft: 35,
    alignItems: 'center',
    marginBottom: 12,
  },
  leftBar: {
    width: 16,
    height: '100%',
    borderRadius: 10,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  priorityTag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 4,
    // width: 90,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '500',
  },
  date: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#2D2D3A',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 8,
  },
});

export default PriorityTaskCard;
