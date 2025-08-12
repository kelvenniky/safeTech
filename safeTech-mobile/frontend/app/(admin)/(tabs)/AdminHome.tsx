import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AntDesign,
  Entypo,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import WeeklyCalender from "../../../components/WeeklyCalendar";
import { Link, router } from "expo-router";
import { useLocationStore } from "@/store";

const AdminHome = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState("");
  const [getEmerg, setGetEmerg] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const { setUserLocation } = useLocationStore();
  const [newEmergency, setNewEmergency] = useState(false);
    const [newEmerg, setNewEmerg] = useState('none')
      const [showAddress, setShowAddress] = useState(false);
    
  



  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location permission not granted.");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const address = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });

      // Set user location and address
      setUserLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });

      await addLocation(currentLocation.coords.latitude, currentLocation.coords.longitude);
      getAddress(currentLocation.coords.latitude, currentLocation.coords.longitude);
    };
    getPermissions();
  }, []);

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (response.length > 0) {
        const { name, city, region, country } = response[0];
        const formattedAddress = `${name || ""}, ${city || ""}, ${region || ""}, ${country || ""}`.trim();
        setAddress(formattedAddress || "Address not found");
      } else {
        setAddress("Address not found");
      }
    } catch (error) {
      console.error("Error getting address:", error);
      Alert.alert("Error", "Unable to retrieve address.");
    }
  };

  const addLocation = async (latitude: number, longitude: number) => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found in AsyncStorage.");
      return;
    }

    try {
      await axios.post(
        `http://172.20.10.4:5001/add-location/${userId}/location`,
        {
          location: { latitude, longitude },
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating location status:", error);
    }
  };

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    const trimmedToken = token ? token.trim() : null;

    if (!trimmedToken) {
      console.error("Token is undefined or null");
      return;
    }

    axios
      .post("http://172.20.10.4:5001/userdata", { token: trimmedToken })
      .then((res) => {
        const userData = res.data.data;
        setUserData(userData);
        // Update user location immediately after getting user data
        if (userData && userData.location) {
          setUserLocation({
            latitude: userData.location.latitude,
            longitude: userData.location.longitude,
            address: address,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }

  async function getAllData() {
    try {
      const res = await axios.get("http://172.20.10.4:5001/emerg");
      setGetEmerg(res.data.data);
    } catch (error) {
      console.error("Error fetching emergencies:", error);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (userData) {
        // Ensure to add the latest location
        addLocation(userData.location.latitude, userData.location.longitude);
      }
      getData();
      getAllData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [userData]);

  const updateUserState = async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");
    const newState = isOnline ? "offline" : "online";
    if (!token || !userId) {
      Alert.alert("Error", "User not authenticated.");
      return;
    }

    try {
      await axios.post(
        `http://172.20.10.4:5001/userState/${userId}/state`,
        { state: newState },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsOnline(!isOnline);
      Vibration.vibrate();
      Alert.alert("Success", `You are ${newState} now!`);
      getData();
    } catch (error) {
      console.error("Error updating user state:", error);
      Alert.alert("Error", "Failed to update user state.");
    }
  };


    async function getAllUserData() {

      const userId = await AsyncStorage.getItem("userId");
    try {
      const res = await fetch(`http://172.20.10.4:5001/my-emergencies?userId=${userId}`);
      const data = await res.json();

      setGetEmerg(data);
    
    } catch (error) {
      console.error("Error fetching emergencies:", error);
    }
  }

  useEffect(() => {
    getAllData(); 

    const intervalId = setInterval(() => {
      getAllUserData(); 
    }, 1000); 

      const pendingEmergencies = getEmerg.filter((emergency: { status: string; }) => emergency.status === "pending");
    if (pendingEmergencies.length > 0) {
      setNewEmerg('new')
    }

    if (pendingEmergencies.length = 0) {
      setNewEmerg('none')
    }

    return () => clearInterval(intervalId); 
  }, []);


  const handleShow = () => {
    setShowAddress(true);
  };


  return (
    <SafeAreaView className="h-full bg-white flex ">

     <View className="px-6">
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
        
      <View className="mx-3">
        <View className="overflow-x-auto bg-white rounded-md">
        </View>
        <TouchableOpacity
          onPress={updateUserState}
          className="mx-auto px-5 py-2 mt-2 flex-row gap-2 items-center rounded-md"
        >
          <Text className={`font-bold ${userData?.state === 'online' ? 'text-red-500' : 'text-teal-600'} capitalize text-lg`}>
            {userData?.state || "Loading"}
          </Text>
          <Text>
            {userData?.state === 'online' ? (
              <MaterialIcons name="online-prediction" size={24} color="red" className="animate-ping" />
            ) : (
              <Ionicons name="cloud-offline-outline" size={24} color="teal" />
            )}
          </Text>
        </TouchableOpacity>

        <View className=" mt-56">
            <View className="flex flex-row items-center justify-center gap-6">
                    <TouchableOpacity
                     onPress={() => router.replace("/")}
                     className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl  gap-2 px-4 py-6"
                   >
                     <MaterialIcons name="phone-callback" size={35} color="#ef4444" />
                     <Text className="text-lg font-semibold">Call Logs</Text>
                   </TouchableOpacity>
                   <TouchableOpacity
                     onPress={() => router.replace("/")}
                     className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl  gap-2 px-4 py-6"
                   >
                  <MaterialIcons name="wechat" size={38} color="#ef4444" />
                     <Text className="text-lg font-semibold">Chat</Text>
                   </TouchableOpacity>
                 </View>

                  <View className="flex flex-row mt-6 items-center justify-center gap-6">
                   <TouchableOpacity
                     onPress={() => router.replace("/(admin)/Emergencies")}
                     className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl  gap-2 px-4 py-6"
                   >
                    <MaterialIcons name="history" size={30} color="#ef4444" />
                     <Text className="text-lg font-semibold">Recents</Text>
                   </TouchableOpacity>
                     <TouchableOpacity
                     onPress={() => router.replace("/MedicsOnline")}
                     className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl  gap-2 px-4 py-6"
                   >
                     <MaterialIcons name="person-pin" size={34} color="#ef4444" />
                     <Text className="text-lg font-semibold">Personnels</Text>
                   </TouchableOpacity>
                 </View>
                  <View className="flex flex-row mt-6 items-center justify-center gap-6">
                  
                     <TouchableOpacity
                     onPress={() => router.replace("/(admin)/Summary")}
                     className="border w-1/2 border-[#DEDEDE] flex justify-center items-center rounded-xl  gap-2 px-4 py-6"
                   >
                     <Entypo name="text-document" size={30} color="#ef4444" />
                     <Text className="text-lg font-semibold">Summary</Text>
                   </TouchableOpacity>
                 </View>

        </View>
     

     
         
     

      

      </View>
     </View>
    </SafeAreaView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({});