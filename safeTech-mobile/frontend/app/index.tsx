import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid'; 
import FlashMessage from "react-native-flash-message";

const Index = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  useEffect(() => {
    const ToAddress = async () => {
      if (location) {
        const showAddress = await Location.reverseGeocodeAsync({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        });
      }
    };

    ToAddress();
  }, [location]);

  async function getData() {
    const data = await AsyncStorage.getItem("isLoggedIn");
    const userType = await AsyncStorage.getItem("userType");

    setUserType(userType);
    setIsLoggedIn(data === "true");
  }

  useEffect(() => {
    getData();
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <SafeAreaView>
      <Toast />
      <Redirect href={'/SplashScreen'}/>
      {isLoggedIn && userType === "medic" ? (
        <Redirect href={"/(admin)/(tabs)/AdminHome"} />
      ) : isLoggedIn && userType === "user" ? (
        <Redirect href={"/(root)/(tabs)/Home"} />
      ) : !isLoggedIn ? (
        <Redirect href={"/(auth)/Welcome"} />
      ) : null}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({});
