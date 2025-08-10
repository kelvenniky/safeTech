import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "@/common/ApiUrl";
import { useProfileContext } from "@/components/ProfileContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { profile, setProfile } = useProfileContext(); // Ensure profile is accessed

  async function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    const userData = { email, password };

    try {
      const res = await axios.post(`${API_BASE_URL}/login-user`, userData);
      if (res.data.status === "ok") {
        Alert.alert("Login Successfully");
        await AsyncStorage.setItem("token", res.data.data);
        await AsyncStorage.setItem("userId", res.data.userId);
        await AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
        await AsyncStorage.setItem("userType", res.data.userType);
        const userProfile = await AsyncStorage.getItem('profile')

        // Conditional routing based on userType and profile availability
        if (res.data.userType === "medic") {
          router.replace("/(admin)/(tabs)/AdminHome");
        } else if (res.data.userType === "user") {
          if (userProfile) {
            router.replace("/(root)/(tabs)/Home");
          } else {
            router.replace("/ProfileScreen");
          }
        }
      } else {
        handleLoginError(res.data);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Network Error", "Unable to connect to the server. Please check your internet connection.");
    }
  }

  function handleLoginError(data: { status: string; message: any; }) {
    if (data.status === "user_not_found") {
      Alert.alert("User doesn't exist");
    } else if (data.status === "error") {
      Alert.alert("Login Failed", data.message || "Incorrect password.");
    } else {
      Alert.alert("Unexpected Error", "An unexpected error occurred. Please try again.");
    }
  }

  return (
    <SafeAreaView className="flex bg-white h-full">
      <View className="flex items-center mt-28 justify-center">
        <Image source={require('../../assets/images/looo.png')} className="w-32 h-32" />
      </View>
      <View className="mx-7">
        <Text className="text-3xl mt-8 text-center font-semibold">Login</Text>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="mt-10">
            <Text>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Email Address"
              placeholderTextColor="grey"
              keyboardType="email-address"
              className="mt-2 bg-[#fafafa] border border-red-600 rounded-lg py-4 pl-2"
            />
          </View>
          <View className="mt-10">
            <Text>Password</Text>
            <View className="relative">
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your Password"
                placeholderTextColor="grey"
                secureTextEntry={!showPassword}
                className="mt-2 bg-[#fafafa] border border-red-600 rounded-lg py-4 pl-2 pr-10"
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 20 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
        <View className="mt-3 flex items-end">
          <TouchableOpacity>
            <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10">
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Login</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10 flex items-center">
          <View className="flex flex-row">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/SignUp")}>
              <Text style={{ color: "#dc2626", textDecorationLine: "underline" }}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="mt-20 flex items-center">
          <View>
            <Text className="mb-2">Or</Text>
          </View>
          <View style={{ marginBottom: 240 }}>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => router.replace("/(auth)/PersonnelSignUp")}
            >
              <Text>SignUp as Security Staff</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    width: 350,
    height: 50,
    backgroundColor: "#dc2626",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  button1: {
    width: 350,
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#dc2626",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
});