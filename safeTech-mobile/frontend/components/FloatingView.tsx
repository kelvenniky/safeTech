import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FloatingView = () => {
  return (
    <View style={styles.floatingContainer} >
      <TouchableOpacity style={styles.floatingButton} onPress={()=>router.push('/(root)/UserMap')} className='animate-bounce p-8 '>
        <Image source={require('../assets/images/box.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    top:300,
    right: 30, 
    elevation: 10, 
    zIndex: 10,
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
});

export default FloatingView;