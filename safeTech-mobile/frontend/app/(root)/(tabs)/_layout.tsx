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
  
    headerRight: () => (
      <View className="flex flex-row items-center gap-2 justify-center mr-5">
         <TouchableOpacity className="bg-teal-600 p-2 rounded-full" onPress={()=>{router.replace("/(root)/Call")}}>
          <MaterialCommunityIcons name="phone-outline" size={18} color="white" />
        </TouchableOpacity>
       <TouchableOpacity className="flex flex-row items-center gap-2 justify-center relative  " onPress={()=>router.push('/(root)/UserMap')} >
    <FontAwesome name="bell-o" size={24} color="black"  />
    <View className="rounded-full bg-red-500 px-2 py-1 top-[-8] left-3  absolute"><Text className="text-white text-xs">2</Text></View>
    </TouchableOpacity>
       
      </View>
    ),
    headerLeft: () => (
      <View className="flex flex-row items-center gap-1 ml-1">
        <View >
          <Image
            source={require("../../../assets/images/ambulance.png")} 
            style={{width:40, height:40}}
            resizeMode="contain" 
          />        </View>
        <Text className="text-xl font-bold text-red-600">EmerGenZ</Text>
      </View>
    ),
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
