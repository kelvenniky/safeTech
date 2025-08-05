import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="Language"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: "#ffffff",

          headerStyle: {
            backgroundColor: "#14b8a6",
          },
          headerRight: () => (
            <TouchableOpacity
              className="flex flex-row items-center gap-2 bg-teal-500 justify-center mr-5"
              onPress={() => router.replace("/(root)/(tabs)/Profile")}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View className="flex flex-row items-center gap-1 ">
              <Text className="text-2xl font-semibold ">Choose Language</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Call"
        options={{
          headerShown: true,
          headerTitle: "",
          headerTintColor: "#ffffff",

          headerStyle: {
            backgroundColor: "#14b8a6",
          },
          headerRight: () => (
            <TouchableOpacity
              className="flex flex-row items-center gap-2 bg-teal-500 justify-center mr-5"
              onPress={() => router.replace("/(root)/(tabs)/Profile")}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <View className="flex flex-row  items-center gap-1 ">
              <Text className="text-2xl text-gray-600 font-semibold ">
                Call for Help
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen name="DetailScreen/[id]" options={{ headerShown: false }} />
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
      <Stack.Screen
        name="MedicHistory"
        options={{
          headerShown: true,
          headerTitle: () => (
            <View style={{ marginRight: 20 }}>
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Medic History
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
        name="NewMed"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="Calender"
        options={{ headerShown: false, headerTitle: "" }}
      />
      <Stack.Screen
        name="History"
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
