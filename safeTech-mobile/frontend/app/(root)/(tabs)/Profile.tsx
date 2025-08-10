import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import API_BASE_URL from '@/common/ApiUrl';
import { useProfileContext } from '@/components/ProfileContext';

interface UserData {
  name: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null); 
  const {setProfile, profile}= useProfileContext()

 

  function SignOut() {
    AsyncStorage.setItem('isLoggedIn', '');
    AsyncStorage.setItem('token', '');
    AsyncStorage.setItem('userId', '');
    setProfile(null)
    console.log('prooo', profile)
    
    

    router.replace("/Login");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <MaterialIcons name="account-circle" size={150} color="#d9d9d9" />
      </View>

      <View style={{ marginTop: 10, marginLeft: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Settings</Text>
      </View>

      <View style={{ flexDirection: 'row', marginLeft: 24, marginTop: 10 }}>
        <TouchableOpacity style={styles.button} onPress={()=>router.replace('/(root)/Account')}>
          <MaterialCommunityIcons name="account-circle-outline" size={24} color="black" />
          <Text style={{ fontSize: 16 }}>Account</Text>
        </TouchableOpacity>
      </View>
      

    

      <View style={{ marginTop: 20, marginLeft: 30 }}>
        <Text style={{ fontSize: 20, fontWeight: '600' }}>Legal</Text>
      </View>

      <View style={{ flexDirection: 'row', marginLeft: 24, marginTop: 10 }}>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="document-text-outline" size={24} color="black" />
          <Text style={{ fontSize: 16 }}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ flexDirection: 'row', marginLeft: 24, marginTop: 10 }}>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="medical-information" size={24} color="black" />
          <Text style={{ fontSize: 16 }}>About SafeTech</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ marginLeft: 30, marginTop: 10 }}>
        <TouchableOpacity onPress={() => SignOut()} >
          <Text style={{ color: '#dc2626', fontWeight: 'bold' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fafafa',
    width: 380,
    height: 60,
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10
  }
});

export default Profile;