import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    

 
      <Stack.Screen
        name="Account"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ marginRight: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>Account </Text>
            </View>
          ),
          headerLeft: () => (
            <View>
              <TouchableOpacity
                onPress={() => router.replace("/(root)/(tabs)/Profile")}>
                <Ionicons name="chevron-back" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MedicalProfile"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ marginRight: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Medical Profile
              </Text>
            </View>
          ),
          headerLeft: () => (
            <View>
              <TouchableOpacity
                onPress={() => router.replace("/(root)/(tabs)/Profile")}
              >
                <Ionicons name="chevron-back" size={32} color="black" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
     
      <Stack.Screen name="Chatroom" options={{ headerShown: false }} />
      <Stack.Screen
        name="ProfileScreen"
        options={{ headerShown: false, headerTitle: "" }}
      />
       <Stack.Screen
        name="UserMap"
        options={{ headerShown: false, headerTitle: "" }}
      />
       <Stack.Screen
        name="DriverScreen"
        options={{ headerShown: false, headerTitle: "" }}
      />
    
      
       <Stack.Screen
        name="Report"
        options={{ headerShown: false, headerTitle: "" }}
      />
    </Stack>
  );
};

export default Layout;
