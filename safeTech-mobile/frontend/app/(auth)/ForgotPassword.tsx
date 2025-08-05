import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';



  
const ForgotPassword = () => {
    const [email, onChangeEmail] = React.useState('');

  return (
     <SafeAreaView style={{ flex: 1, backgroundColor: "white", }}>
        <View style={{marginRight:15}} >
            <TouchableOpacity onPress={()=> router.replace('/(auth)/Login')}>
                <Ionicons name="chevron-back" size={24} color="grey" />
            </TouchableOpacity>
        </View>
        <Text style={styles.forgot}>Forgot Password</Text>
        <Text style={{marginLeft:20}}>Please enter your email address. You will receive a link to create a new password via email.</Text>
          
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}style={styles.container}>
            <Text style={{marginTop:30, marginLeft:20,}}>Email Address</Text>
            <View style={{marginTop:10, marginLeft:20,backgroundColor:"#fafafa", borderRadius:10,width:370}}>
                <TextInput value={email}
                       onChangeText={text => onChangeEmail(text)}
                       style={styles.email}
                       placeholder="Enter Email Address"
                       placeholderTextColor="grey"
                       keyboardType="email-address" 
                        />
            </View>

            <View style={styles.container1}>
                <TouchableOpacity style={styles.button}>
                    <Text>Send </Text>
                </TouchableOpacity>
            </View> 
            <View style={{alignSelf:"center", marginTop:20}}>
             <Text>Didn't receive link?
                <TouchableOpacity>
                    <Text style={{textDecorationLine:'underline', color:"#0d9488"}}> Resend</Text>
                </TouchableOpacity>
             </Text>
            </View>
            
          </KeyboardAvoidingView>
        </SafeAreaView>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        flex:1
      },
     forgot:{
        fontSize:30,
        fontWeight:'600',
        marginTop:30,
        marginLeft:20
      },
      email:{
        color: "black",
        marginVertical: 10,
        marginHorizontal:10,
      },
      container1:{
         marginTop:40,
         alignSelf:"center"
      },
      button:{
        width: 370,
        backgroundColor: "#0d9488",
        borderRadius: 15,
        padding:15,
        alignItems:"center"
      },
})