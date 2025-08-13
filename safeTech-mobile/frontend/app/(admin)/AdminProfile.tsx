import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/common/ApiUrl";

const AdminProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [staffID, setStaffID] = useState("");
  const [course, setCourse] = useState("");
  const [residence, setResidence] = useState("");
  const [year, setYear] = useState("");
    const [profile, setProfile] = useState({});


  interface UserData {
    name: string;
    email: string;
    contact?: string;
    staffID?: string;
    course?: string;
    residence?: string;
    year?: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    const trimmedToken = token ? token.trim() : null;

    if (!trimmedToken) {
      console.error("Token is undefined or null");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/userdata`, { token: trimmedToken });
      const data = res.data.data;

      setName(data.name);
      setEmail(data.email);
      setContact(data.contact || "");
      setStaffID(data.staffID || "");
      setCourse(data.course || "");
      setYear(data.year || "");
      setResidence(data.residence || "");
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    const trimmedToken = token ? token.trim() : null;

    if (!trimmedToken) {
      Alert.alert("Error", "Token is not available. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/profile`, {
        token,
        contact,
        staffID,
        course,
        residence,
        year,
      });

      console.log(response.data);
     

      if (response.data.success) {
         setProfile(response.data.data)
            console.log('hhhh',profile);

        Alert.alert("Success", "Profile saved successfully!");
         AsyncStorage.setItem("profile", JSON.stringify(profile));
        router.replace('/(root)/(tabs)/Home');
      } else {
        Alert.alert("Error", response.data.message || "Failed to save request. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "An error occurred while saving the profile. Please try again.");
    }
  };

  return (
    <SafeAreaView className="mx-6">
      <View className="flex items-center flex-row mt-6">
        <TouchableOpacity onPress={() => router.replace("/(admin)/(tabs)/AdminHome")}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text className="ml-36 text-2xl font-semibold">Profile</Text>
      </View>
      <View className="mt-6">
        <Pressable className="flex items-center justify-center">
          <MaterialIcons name="account-circle" size={150} color="#d9d9d9" />
        </Pressable>
      </View>
      
      <View className="mt-6 grid gap-6">
         <View className="grid gap-2">
          <Text className="font-semibold ml-4">Name</Text>
          <TextInput
            placeholder="Enter your Name"
            placeholderTextColor={"gray"}
            className="border border-gray-400 rounded-xl px-4 py-4"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View className="grid gap-2">
          <Text className="font-semibold ml-4">Contact</Text>
          <TextInput
            placeholder="Enter your Contact"
            placeholderTextColor={"gray"}
            className="border border-gray-400 rounded-xl px-4 py-4"
            value={contact}
            onChangeText={setContact}
          />
        </View>
        <View className="grid gap-2">
          <Text className="font-semibold ml-4">Student ID</Text>
          <TextInput
            placeholder="Enter Your School ID"
            placeholderTextColor={"gray"}
            className="border border-gray-400 rounded-xl px-4 py-4"
            value={staffID}
            onChangeText={setStaffID}
          />
        </View>
       
      
      
      </View>
      <View className="mt-12 flex items-center justify-center">
        <TouchableOpacity onPress={handleSave} className="w-full bg-red-500 shadow-sm rounded-xl py-4">
          <Text className="text-xl text-center font-semibold text-white">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({});