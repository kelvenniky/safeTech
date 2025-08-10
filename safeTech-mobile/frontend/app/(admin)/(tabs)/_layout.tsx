import { Tabs } from "expo-router";
import React from "react";
import {
  Ionicons,
  Foundation,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


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
          borderWidth:1,}}}
  >
    
    <Tabs.Screen
name="AdminHome"
options={{
  title: "Home",
  tabBarIcon: ({ color }) => (
  <Foundation name="home" size={30} color={color} />
  ),
  headerTitle: "",
  headerShown: false,
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerStyle: {
    height: 110,
    borderBottomColor: "white", 
  },
 
  
}}
/>
  
    <Tabs.Screen
      name="Maps"
      options={{
        title: "Maps",
        tabBarIcon: ({color}) => (
          <Entypo name="location" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
  
   
    <Tabs.Screen
      name="Profile"
      options={{
        title: "Profile",
        tabBarIcon: ({ color }) => (
<MaterialIcons name="person" size={30} color={color} />          ),
        headerShown: false,
      }}
    />
  </Tabs>
  );
};

export default TabLayout;
