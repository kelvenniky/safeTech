import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useEmergencyStore, useLocationStore } from "@/store";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllEmergencies = () => {
  const [getEmerg, setGetEmerg] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("new");
  const navigation = useNavigation();
  const { setDestinationLocation, userLatitude, userLongitude } = useLocationStore();
  const [loading, setLoading] = useState(true);
  const { setEmergencyStatus, emergencyStatus } = useEmergencyStore();
  

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  async function getAllData() {
    try {
      const res = await axios.get("http://172.20.10.4:5001/emerg");
      setGetEmerg(res.data.data);
    } catch (error) {
      console.error("Error fetching emergencies:", error);
    }
  }

  useEffect(() => {
    getAllData(); 

    const intervalId = setInterval(() => {
      getAllData(); 
    }, 5000); 

    return () => clearInterval(intervalId); 
  }, []);

  const updateEmergencyStatus = async (id) => {
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.post(
        `http://172.20.10.4:5001/emergency/${id}/status`,
        { status: "accepted" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      getAllData(); 
    } catch (error) {
      console.error("Error updating emergency status:", error.response.data);
    }
  };

  const handleDestinationPress = (emergency) => {
    const location = {
      latitude: emergency.location.latitude,
      longitude: emergency.location.longitude,
      address: emergency.address,
      userId: emergency.userId,
      eId: emergency._id,
    };

    setDestinationLocation(location);
    updateEmergencyStatus(emergency._id);
    router.push("/(admin)/Journey");
  };

  const filteredEmergencies = getEmerg.filter((emergency) => {
    if (selectedCategory === "new") return emergency.status === "pending";
    if (selectedCategory === "completed") return emergency.status !== "pending";
    return true; 
  });


const total = getEmerg.length
  return (
    <View className="flex-1">
      <View className="flex-row bg-white justify-between pb-2 h-32 border-b-2 border-gray-200 items-end">
        <View className="flex-row gap-32 items-center">
          <View>
            <Image
              source={require("../../assets/images/mem.png")}
              style={styles.gif}
              resizeMode="contain"
              className="relative"
            />
            <View className="bg-red-400 rounded-full h-2 w-2 absolute left-11"></View>
          </View>
          <Text className="text-xl font-semibold">All Emergencies</Text>
        </View>
        <View className="mb-3">
          <Entypo className="mr-3" name="new-message" size={24} color="black" />
        </View>
      </View>
      <View className="mx-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-7 rounded-md w-full mt-1 bg-white"
        >
          <View className="flex-row gap-5 items-center overflow-x-auto">
            <TouchableOpacity
              onPress={() => setSelectedCategory("new")}
              className={`flex justify-center item-center h-10 rounded-3xl px-5 ${selectedCategory === "new" ? "bg-teal-600" : "bg-gray-100"}`}
            >
              <Text className={`font-semibold ${selectedCategory === "new" ? "text-white" : "text-teal-800"}`}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory("completed")}
              className={`flex justify-center item-center h-10 rounded-3xl px-3 ${selectedCategory === "completed" ? "bg-teal-600" : "bg-gray-100"}`}
            >
              <Text className={`font-semibold ${selectedCategory === "completed" ? "text-white" : "text-teal-800"}`}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory("all")}
              className={`flex justify-center item-center h-10 rounded-3xl px-6 ${selectedCategory === "all" ? "bg-teal-600" : "bg-gray-100"}`}
            >
              <Text className={`font-semibold ${selectedCategory === "all" ? "text-white" : "text-teal-800"}`}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 flex justify-center item-center h-10 rounded-3xl px-3">
              <Text className="text-teal-800 font-semibold">Canceled</Text>
            </TouchableOpacity>
          </View>
        
        </ScrollView>
        <View>
          </View>

        <ScrollView className="mt-2">
          <View className="grid gap-4">
            {filteredEmergencies.map((emergency) => (
              <View
                key={emergency._id}
                className="bg-white py-3 rounded-md shadow-lg shadow-slate-300"
              >
                <View className="p-2 grid gap-4">
                  <View className="flex-row gap-2 items-center justify-between">
                    <View className="flex-row gap-2 items-center">
                      <View className="bg-gray-100 flex items-center justify-center w-9 h-9 rounded-full">
                        <Ionicons name="person" size={18} color="teal" />
                      </View>
                      <Text className="font-semibold text-gray-600">
                        {emergency.userName}/ {emergency.userEmail}/{emergency.status}
                      </Text>
                    </View>
                    <Text className="font-semibold text-gray-600">
                      {new Date(emergency.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                  <View>
      {loading && (
        <ActivityIndicator size="large" color="teal"  />
      )}
      <Image
        source={{
          uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=900&center=lonlat:${userLongitude},${userLatitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
        }}
        style={{
          marginRight: 10,
          width: "100%",
          height: 50,
          borderRadius: 10,
        }}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </View>
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="location-pin" size={20} color="teal" />
                    <Text className="font-semibold text-gray-600">
                      {emergency.address}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                  <Ionicons name="keypad-outline" size={20} color="teal" />
                    <Text className="font-semibold text-gray-600">
                      {emergency.closestMedicId}
                    </Text>
                  </View>

              
                </View>
              </View>
            ))}
          </View>
          <View className="h-60"></View>
        </ScrollView>
      </View>
    </View>
  );
};

export default AllEmergencies;

const styles = StyleSheet.create({
  gif: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});