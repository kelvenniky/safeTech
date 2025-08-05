import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ProfileScreen = () => {
  return (
    <SafeAreaView className="mx-6">
      <View className=" flex items-center flex-row mt-6 ">
        <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/Home")}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text className="ml-24 text-2xl font-semibold">ProfileScreen</Text>
      </View>
      <View className="mt-14">
        <Pressable className="flex items-center justify-center">
          <Image
            source={require("../../assets/images/profile1.png")}
            className="border-red-600 border-2 w-32 h-32 rounded-full"
          />
        </Pressable>
      </View>
      <View className="mt-10 grid gap-6">
        <View className="grid gap-2">
          <Text className="font-semibold ml-4  ">Student ID</Text>
          <TextInput
            placeholder="Enter Your School ID"
            placeholderTextColor={"gray"}
            className="border-2 border-gray-400 rounded-full px-4 py-4"
          />
        </View>
        <View className="grid gap-2">
          <Text className="font-semibold ml-4  ">Course Of Study</Text>
          <TextInput
            placeholder="Enter Course Of Study"
            placeholderTextColor={"gray"}
            className="border-2 border-gray-400 rounded-full px-4 py-4"
          />
        </View>{" "}
        <View className="grid gap-2">
          <Text className="font-semibold ml-4   ">Place Of Residence</Text>
          <TextInput
            placeholder="Enter Place Of Residence"
            placeholderTextColor={"gray"}
            className="border-2 border-gray-400 rounded-full px-4 py-4"
          />
        </View>{" "}
        <View className="grid gap-2">
          <Text className="font-semibold  ml-4 ">Student year</Text>
          <TextInput
            placeholder="Enter Your Year"
            placeholderTextColor={"gray"}
            className="border-2 border-gray-400 rounded-full px-4 py-4"
          />
        </View>
      </View>
      <View className="mt-12 flex items-center justify-center">
        <TouchableOpacity className="w-3/4 border border-red-600 bg-[#F69294] shadow-slate-50 shadow-md   rounded-full py-4">
          <Text className="text-xl text-center font-semibold text-white">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
