import { Tabs } from "expo-router";
import React from "react";
import {
  Ionicons,
  Foundation,
  FontAwesome,
} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const TabLayout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarActiveTintColor: "teal",
      tabBarInactiveTintColor: "grey",
      tabBarStyle: {
        height: 80,
        borderTopWidth:1,
        
    
      },
      
    }}
  >
    
    <Tabs.Screen
name="AdminHome"
options={{
  title: "Home",
  tabBarIcon: ({ color }) => (
  <Foundation name="home" size={25} color={color} />
  ),
  headerTitle: "",
  headerShown: true,
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerStyle: {
    height: 110,
    borderBottomColor: "white", 
  },
 
  headerLeft: () => (
    <View className="flex flex-row items-center gap-1 ml-5">
      <View >
  <Image
            source={require("../../../assets/images/ambulance.png")} 
            style={{width:40, height:40}}
            resizeMode="contain" 
          />        </View>
      <Text className="text-xl font-bold text-red-500"> EmerGenZ</Text>
    </View>
  ),
}}
/>
    <Tabs.Screen
      name="Emergency"
      options={{
        title: "Emergency ",
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="emergency" size={24} color={color} />
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
      name="Maps"
      options={{
        title: "Maps",
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="google-maps" size={24} color={color} /> 
        ),
        headerShown: false,
      }}
    />
    <Tabs.Screen
            name="AdminChats"
            options={{
              title: "AdminChats",
              tabBarIcon: ({ color }) => (
              <Ionicons name="chatbubble-ellipses-sharp" size={24} color={color} />          ),
              headerShown: false,
              headerStyle: {
                height: 110,
                borderBottomColor: "white", 
              },
            }}
          />
   
    <Tabs.Screen
      name="Profile"
      options={{
        title: "Profile",
        tabBarIcon: ({ color }) => (
<MaterialIcons name="person" size={26} color={color} />          ),
        headerShown: false,
      }}
    />
  </Tabs>
  );
};

export default TabLayout;
