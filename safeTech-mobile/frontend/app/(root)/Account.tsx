import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '@/common/ApiUrl';


interface UserData {
  name: string;
  email:string;
}

const Account = () => {


const [userData, setUserData] = useState<UserData | null>(null); 

async function getData() {
  const token = await AsyncStorage.getItem('token');
  const userId = await AsyncStorage.getItem('userId');

  const trimmedToken = token ? token.trim() : null;
  console.log(trimmedToken, userId)

  
  if (!trimmedToken) {
    console.error('Token is undefined or null');
    return;
  }

  axios.post(`${API_BASE_URL}/userdata`, { token: trimmedToken })
    .then(res => {
      setUserData(res.data.data); 
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
}

useEffect(() => {
  getData();
}, []);

  return (
    <SafeAreaView className="bg-white h-full ">
        <View style={{marginTop:20,marginLeft:10, alignItems:'center',flexDirection:"row" }}>
                <View style={{ position: 'relative', alignItems: 'center',marginLeft:120  }}>
                <MaterialIcons name="account-circle" size={130} color="#d9d9d9" />
                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 13,
                    backgroundColor: 'white',
                    borderRadius: 20, 
                    padding: 5 
                }}>
                    <Ionicons name="cloud-upload" size={20} color="#0d9488" />
                </View>
            </View>
          
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
            <Text style={{marginTop:40, marginLeft:30,}}>Email Address</Text>
                <View style={{marginTop:10, marginLeft:35,backgroundColor:"#fafafa", borderRadius:10,width:370}}>
                  <TextInput value={userData?.email || 'Loading...'}
                           style={styles.email}
                           placeholder="Enter Email Address"
                           placeholderTextColor="grey"
                           keyboardType="email-address" 
                     />
               </View>
        
            <Text style={{marginTop:40, marginLeft:30,}}>First Name</Text>
                <View style={{marginTop:10, marginLeft:35,backgroundColor:"#fafafa", borderRadius:10,width:370}}>
                  <TextInput value={userData?.name || 'Loading...'}
                           style={styles.firstName}
                           placeholder="Enter First Name"
                           placeholderTextColor="grey"
                    />
                </View>
        </KeyboardAvoidingView>
        
              <View style={styles.container1}>
                <TouchableOpacity style={styles.button}>
                  <Text style={{color:'white', fontSize:18, fontWeight:'bold'}}>Save</Text>
                </TouchableOpacity>
              </View>
    </SafeAreaView>
  )
}

export default Account

const styles = StyleSheet.create({
  email:{
        color: "black",
        marginVertical: 10,
        marginHorizontal:10,
      },
  firstName:{
    color: "black",
    marginVertical: 10,
    marginHorizontal:10,
  },
  button:{
    width: 370,
    backgroundColor: "#0d9488",
    borderRadius: 15,
    padding:15,
    alignItems:"center"
  },
  container1:{
    justifyContent: 'center',
    alignSelf:"center",
    marginTop:35
  }
})