import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/common/ApiUrl";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
      userType: "user",
    };

    axios
      .post(`${API_BASE_URL}/register`, userData)
      .then((res) => {
        Alert.alert("Success", "Sign up successful!");
        AsyncStorage.setItem("token", res.data.data);
        router.replace("/(auth)/Login");
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error", "Sign up failed! Please try again.");
      });
  };

  return (
    <SafeAreaView className="flex bg-white h-full">
      <View className="mx-7 mt-9">
        <TouchableOpacity onPress={() => router.replace("/(auth)/Login")}>
          <Ionicons name="chevron-back" size={24} color="grey" />
        </TouchableOpacity>

        <Text className="text-3xl mt-8 font-semibold">Sign Up</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="mt-10">
            <Text>Name</Text>
            <TextInput
              value={name}
              onChange={(e) => setName(e.nativeEvent.text)}
              placeholder="Enter your name"
              placeholderTextColor="grey"
              className="mt-2 bg-[#fafafa] rounded-lg py-4 pl-2"
            />
          </View>

          <View className="mt-10">
            <Text>Email Address</Text>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
              placeholder="Enter Email Address"
              placeholderTextColor="grey"
              keyboardType="email-address"
              className="mt-2 bg-[#fafafa] rounded-lg py-4 pl-2"
            />
          </View>

          <View className="mt-10">
            <Text>Password</Text>
            <View className="relative">
              <TextInput
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                placeholder="Enter your Password"
                placeholderTextColor="grey"
                secureTextEntry={!showPassword}
                className="mt-2 bg-[#fafafa] rounded-lg py-4 pl-2 pr-10"
              />
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 20 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View className=" mt-3 flex items-end">
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/ForgotPassword")}
          >
            <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10 flex  items-center">
          <View className="flex flex-row">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/Login")}>
              <Text
                style={{ color: "#0d9488", textDecorationLine: "underline" }}
              >
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  SignUp: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 30,
    marginLeft: 20,
  },
  inputContainer: {
    marginTop: 10,
    marginLeft: 35,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: 370,
  },
  input: {
    color: "black",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    width: 370,
    backgroundColor: "#0d9488",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  container1: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 280,
  },
  footer: {
    marginTop: 30,
    marginBottom: 240,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
