import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const WeeklyCalendar = () => {
  const today = new Date(); // Set to June 10, 2023
  const currentWeekStart = today.getDate() - today.getDay(); // Get the start of the week (Sunday)

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today); // Create a new Date instance for each day
    date.setDate(currentWeekStart + i); // Set the date to the specific day of the week
    return {
      dayName: date.toLocaleString('default', { weekday: 'short' }),
      day: date.getDate().toString(),
      isToday: date.toDateString() === today.toDateString(), // Check if it's today
    };
  });

  const formattedDate = today.toLocaleDateString('default', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const handleDayPress = (day) => {
    console.log('Selected day:', day);
  };

  return (
    <View className='mt-4 overflow-x-auto'>
      <View className='' style={styles.weekContainer}>
        {daysOfWeek.map((day, index) => (
          <TouchableOpacity
          className=''
            key={index}
            style={[styles.dayContainer, day.isToday && styles.highlightedDay]} // Highlight today
            onPress={() => handleDayPress(day)}
          >
            <Text  style={styles.dayName}>{day.dayName} </Text>
            <Text style={styles.day}>{day.day}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 17,
    marginBottom: 15,
    alignItems: "center",
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    flex: 1,
    padding:10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  highlightedDay: {
    backgroundColor: '#ccfbf1', // Color for the highlighted day
  },
  dayName: {
    fontSize: 12,
    fontWeight: '500',
  },
  day: {
    fontSize: 14,
    color: 'gray',
  },
});

export default WeeklyCalendar;