import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Vibration,
  Modal,
  Pressable,
  Linking,
  Share,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome6,
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import API_BASE_URL from "@/common/ApiUrl";
import { router } from "expo-router";
import { useEmergencyStore, useLocationStore } from "@/store";
import FloatingView from "@/components/FloatingView";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import User from "@/components/User";

interface UserDataResponse {
  data: UserData;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface UserData {
  name: string;
  email: string;
  _id: string;
}

interface UsersResponse extends Array<User> {}

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [address, setAddress] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {
    setDestinationLocation,
    setUserLocation,
    userLatitude,
    userLongitude,
  } = useLocationStore();
  const { setEmergencyStatus, emergencyStatus } = useEmergencyStore();
  const [active, setActive] = useState('')


  const [showAddress, setShowAddress] = useState(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
 
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location permission not granted.");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      getAddress(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
    };
    getPermissions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (response.length > 0) {
        const { name, city, region, country } = response[0];
        const formattedAddress = `${name || ""}, ${city || ""}, ${
          region || ""
        }, ${country || ""}`.trim();
        setAddress(formattedAddress || "Address not found");
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error getting address:", error);
      Alert.alert("Error", "Unable to retrieve address.");
    }
  };

  const userLat = location?.coords.latitude;
  const userLong = location?.coords.longitude;

  const handleEmergencyPress = async () => {
    console.log(userLat, userLong);

    const emergencyLocation = {
      latitude: userLat,
      longitude: userLong,
      address: address,
    };

    setUserLocation(emergencyLocation);
    if (location) {
      Vibration.vibrate();
      Toast.show({
        type: "success",
        text1: "Emergency request sent",
        text1Style: { fontSize: 17 },
      });
    }
    setModalVisible(false);
    router.push("/(root)/UserMap");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  useEffect(() => {
    const fetchEmergencyRequestId = async () => {
        const keyon = await AsyncStorage.getItem('emergencyRequestId');
        setActive(keyon || ''); // Set to empty if null
    };

    fetchEmergencyRequestId();
}, []);

const handleCall = () => {
    const phoneNumber = "0500998110";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleShow = () => {
    setShowAddress(true);
  };

const handleShare = async () => {
    try {
      await Share.share({
        message: `I'm at ${address}`,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share address.");
    }
  };

  const fetchUsers = async () => {
    try {
      if (userId) {
        console.log('errroooeeeerrrr')
        return; 
      }
      setLoading(true); 

      const response = await axios.get<UsersResponse>(
        `${API_BASE_URL}/get-users`
      );
      setUsers(response.data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    }finally{
      setLoading(false); 

    }
  };



  useEffect(() => {
      fetchUsers();
    
  }, [userId]);






  return (
     <SafeAreaView className="h-full px-4 bg-[#FEFCFD]">
      <View>
        {showAddress ? (
          <View className="mt-6 flex flex-row items-center justify-between border p-2 rounded-xl border-[#A1A5A8]">
            <Pressable className="flex flex-row gap-2 items-center">
              <Pressable onPress={handleShow}>
                <FontAwesome6 name="location-dot" size={26} color="#A1A5A8" />
              </Pressable>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 w-full">
                <Text className="line-clamp-1 text-ellipsis text-[#A1A5A8]  font-semibold text-lg">
                  {address || "Loading address..."}
                </Text>
              </ScrollView>
              <Pressable onPress={() => setShowAddress(false)}>
                <AntDesign name="close" size={24} color="#A1A5A8" />
              </Pressable>
            </Pressable>
          </View>
        ) : (
          <View className="mt-6 flex flex-row items-center justify-between">
            <Pressable onPress={handleShow} className="flex flex-row gap-2 items-center">
              <FontAwesome6 name="location-dot" size={26} color="#A1A5A8" />
              <Text className="line-clamp-1 w-9/12 text-ellipsis text-[#A1A5A8] font-semibold text-lg">
                {address || "Loading address..."}
              </Text>
            </Pressable>
            <Pressable onPress={() => router.replace("/(root)/ProfileScreen")} className="flex flex-row  items-center">
                     <MaterialIcons name="account-circle" size={40} color="#d9d9d9" className="border-2 border-red-500 rounded-full" />
             
            </Pressable>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleShare} className="mt-14 flex items-end mr-2">
        <View className="flex items-center gap-1">
          <FontAwesome6 name="share-square" size={24} color="" />
          <Text className="font-semibold text-sm text-gray-400">Share</Text>
        </View>
      </TouchableOpacity>

      <View className="flex mx-4 mt-20">
        <TouchableOpacity onPress={handleEmergencyPress} className="border border-red-100 shadow-red-200 rounded-lg">
          <View className="bg-red-500 w-full flex items-center shadow-md shadow-red-400 p-4 rounded-full">
            <Image source={require('../../../assets/images/location.png')} className="w-20 h-20" />
          </View>
        </TouchableOpacity>
        <Text className="mt-14 font-light text-center text-[#A1A5A8] text-2xl">
          Tap In case of Emergency
        </Text>
      </View>
      <View className="mt-10 mx-14 grid gap-4">
        <View className="flex flex-row gap-6">
          <TouchableOpacity
            onPress={handleCall}
            className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl gap-2 p-4"
          >
            <MaterialIcons name="wifi-calling-3" size={34} color="#A1A5A8" />
            <Text className="text-lg font-semibold">Call</Text>
          </TouchableOpacity>

          {
            !loading ? (
            <FlatList
            data={users}
            renderItem={({ item }) => <User item={item} />}
            keyExtractor={(item) => item._id}
          />
           ):(
            <TouchableOpacity className="border border-[#DEDEDE] flex w-1/2 justify-center items-center rounded-xl gap-2 p-4">
            <MaterialIcons name="wechat" size={38} color="#A1A5A8" />
            <Text className="text-lg font-semibold">Report Issue</Text>
          </TouchableOpacity>
           )
          }
          

          
        </View>
        <View className="flex flex-row items-center justify-center gap-6">
          <TouchableOpacity
            onPress={() => router.replace("/Report")}
            className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl gap-2 p-4"
          >
            <FontAwesome name="newspaper-o" size={35} color="#A1A5A8" />
            <Text className="text-lg font-semibold">News</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: "#0d9488",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 100,
  },
  cancelButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 100,
  },
  gife: {
    width: 45,
    height: 45,
  },
});