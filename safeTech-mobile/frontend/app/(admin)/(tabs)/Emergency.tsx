import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useEmergencyStore, useLocationStore } from "@/store";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Emergencies = () => {
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

  const updateUserState = async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");
    const newState = 'busy'
  

    try {
      await axios.post(
        `http://172.20.10.4:5001/userState/${userId}/state`,
        { state: newState },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", `You are ${newState} now!`);
      console.log(newState)
    } catch (error) {
      console.error("Error updating user state:", error);
      Alert.alert("Error", "Failed to update user state.");
    }
  };

  const handleDestinationPress = (emergency) => {
    const location = {
      latitude: emergency.location.latitude,
      longitude: emergency.location.longitude,
      address: emergency.address,
      userId: emergency.userId,
      eId: emergency._id,
      route:'user',
    };

    setDestinationLocation(location);
    updateEmergencyStatus(emergency._id);
    updateUserState()
    router.push("/(admin)/Journey");
  };


  const continueDestinationPress = (emergency) => {
    const location = {
      latitude: emergency.location.latitude,
      longitude: emergency.location.longitude,
      address: emergency.address,
      userId: emergency.userId,
      eId: emergency._id,
      route:'user',
    };

    setDestinationLocation(location);
    router.push("/(admin)/Journey");
  };

  const filteredEmergencies = getEmerg.filter((emergency) => {
    if (selectedCategory === "new") return emergency.status === "pending";
    if (selectedCategory === "completed") return emergency.status == "completed";
    return true; 
  });




const deleteAcceptedEmergencies = async () => {
  try {
    const response = await axios.delete('http://172.20.10.4:5001/emergencies');
    console.log(response.data.message); // Log the success message
  } catch (error) {
    console.error("Error deleting emergencies:", error);
    // Handle error (e.g., show a message to the user)
  }
};


const total = getEmerg.length
  return (
    <View className="flex-1">
      <View className="flex-row bg-white justify-between pb-2 h-32 border-b-2 border-gray-200 items-end">
        <View className="flex-row gap-32 items-center">
          <View>
            <Image
              source={require("../../../assets/images/box.png")}
              style={styles.gif}
              resizeMode="contain"
              className="relative"
            />
          </View>
          <Text className="text-xl font-semibold"> My Emergencies</Text>
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
            <TouchableOpacity className="bg-gray-100 flex justify-center item-center h-10 rounded-3xl px-3" onPress={deleteAcceptedEmergencies}>
              <Text className="text-teal-800 font-semibold">Canceled</Text>
            </TouchableOpacity>
          </View>
        
        </ScrollView>
        <View>
          </View>

        <ScrollView className="mt-2">
          <View className="grid gap-2">
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
          height: 150,
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

                  {emergency.status !== "pending" && 
                    <TouchableOpacity
                      onPress={() => continueDestinationPress(emergency)}
                      className="w-2/3 mx-auto bg-blue-500 rounded-lg flex items-center shadow py-2"
                    >
                      <Text className="text-white text-lg font-semibold">
                        View
                      </Text>
                    </TouchableOpacity>
                  }
                  
                  {emergency.status === "pending" && 
                    <TouchableOpacity
                      onPress={() => handleDestinationPress(emergency)}
                      className="w-2/3 mx-auto bg-teal-600 rounded-lg flex items-center shadow py-2"
                    >
                      <Text className="text-white text-lg font-semibold">
                        Accept
                      </Text>
                    </TouchableOpacity>
                  }
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

export default Emergencies;

const styles = StyleSheet.create({
  gif: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});