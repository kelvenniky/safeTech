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
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import API_BASE_URL from "@/common/ApiUrl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit() {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }
    const userData = {
      email: email,
      password: password,
    };

    axios
      .post(`${API_BASE_URL}/login-user`, userData)
      .then((res) => {
        if (res.data.status === "ok") {
          Alert.alert("Login Successfully");
          AsyncStorage.setItem("token", res.data.data);
          AsyncStorage.setItem("userId", res.data.userId);
          console.log("Setting userId in AsyncStorage:", res.data.userId);
          AsyncStorage.setItem("isLoggedIn", JSON.stringify(true));
          AsyncStorage.setItem("userType", res.data.userType);

          if (res.data.userType === "medic") {
            router.replace("/(admin)/(tabs)/AdminHome");
          } else {
            router.replace("/(root)/(tabs)/Home");
          }
        } else if (res.data.status === "user_not_found") {
          Alert.alert("User doesn't exist");
        } else if (res.data.status === "error") {
          Alert.alert(
            "Login Failed",
            res.data.message || "Incorrect password."
          );
        } else {
          Alert.alert(
            "Unexpected Error",
            "An unexpected error occurred. Please try again."
          );
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(
          "Network Error",
          "Unable to connect to the server. Please check your internet connection."
        );
      });
  }

  return (
    <SafeAreaView className="flex bg-white h-full">
      <View className="mx-7 mt-9">
        <Text className="text-3xl mt-8 font-semibold">Login</Text>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
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
        <View className="mt-3 flex items-end">
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/AddImage")}
          >
            <Text style={{ fontWeight: "bold" }}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10">
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="mt-10 flex items-center">
          <View className="flex flex-row">
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.replace("/(auth)/SignUp")}>
              <Text
                style={{ color: "#0d9488", textDecorationLine: "underline" }}
              >
                Register Now
              </Text>
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
              <Text>SignUp as Paramedic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  login: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 45,
    marginLeft: 30,
  },
  email: {
    color: "black",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  password: {
    color: "black",
    marginVertical: 10,
    marginHorizontal: 10,
  },
  button: {
    width: 350,
    height: 50,
    backgroundColor: "#0d9488",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  container1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  button1: {
    width: 350,
    height: 50,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#0d9488",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
});
