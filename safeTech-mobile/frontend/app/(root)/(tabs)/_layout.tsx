import { router, Tabs } from "expo-router";
import {
  Ionicons,
  Feather,
  FontAwesome6,
  Entypo,
  Foundation,
  FontAwesome,
} from "@expo/vector-icons";
import Octicons from '@expo/vector-icons/Octicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import React from "react";


const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
          tabBarActiveTintColor: "#F33849",
        tabBarInactiveTintColor: "#A1A5A8",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FEFCFD",
          display:'flex',
          alignItems:"center",       
          marginBottom: 30,
          borderRadius: 80,
          flexDirection: "row",
          justifyContent: "space-around",
          position: "absolute",
          overflow: "hidden",
          marginHorizontal:60,
          height:70,
          borderWidth:1,
         
          
          
        
         
        },
        
      }}
    >
      
      <Tabs.Screen
  name="Home"
  options={{
    title: "Home",
    tabBarIcon: ({ color }) => (
    <Entypo name="home" size={30} color={color} />
    ),
    headerTitle: "",
    headerShown: false,
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
    },
  
   
  }}
/>
      <Tabs.Screen
        name="Maps"
        options={{
          title: "Maps ",
          tabBarIcon: ({ color }) => (
           <Entypo name="location" size={28} color={color} />
          ),
          headerTitle: "",
          headerShown: false,
          headerStyle:{
            backgroundColor:"#14b8a6"
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 20,
          },
       
    headerLeft: () => (
      <View className="flex flex-row items-center gap-1 ml-5">
        <Text className="text-2xl font-semibold text-white">First Aid Topics</Text>
      </View>
    ),
        }}
      />
    
     
     
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
        <Ionicons name="settings-sharp" size={30}  color={color}/>         ),
          headerShown: false,
        }}
      />
    </Tabs>


  );
};

export default TabLayout;
