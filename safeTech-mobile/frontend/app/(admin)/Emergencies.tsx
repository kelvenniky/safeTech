import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
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
        <View className="flex-row mb-4 px-4 gap-32 items-center">
          <Pressable onPress={()=>router.replace('/(admin)/(tabs)/AdminHome')}>
            <AntDesign name="left" size={25}/>
          </Pressable>
          <Text className="text-xl font-semibold">Requests</Text>
        </View>
     
      </View>
      <View className="mx-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-4 rounded-md w-full mt-1 "
        >
          <View className="flex-row gap-5 items-center overflow-x-auto">
            <TouchableOpacity
              onPress={() => setSelectedCategory("new")}
              className={`flex justify-center item-center h-10 rounded-3xl px-5 ${selectedCategory === "new" ? " border-b-2 border-red-600" : "bg-gray-100"}`}
            >
              <Text className={`font-semibold ${selectedCategory === "new" ? "" : ""}`}>New</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory("completed")}
              className={`flex justify-center item-center h-10 rounded-3xl px-3 ${selectedCategory === "completed" ? "border-b-2 border-red-600" : "bg-gray-100"}`}
            >
              <Text className={`font-semibold ${selectedCategory === "completed" ? "" : ""}`}>Completed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedCategory("all")}
              className={`flex justify-center item-center h-10 rounded-3xl px-6 ${selectedCategory === "all" ? "border-b-2 border-red-600" : "bg-gray-100"}`}
            >
              <Text className={`font-semibold ${selectedCategory === "all" ? "" : ""}`}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 flex justify-center item-center h-10 rounded-3xl px-3" onPress={deleteAcceptedEmergencies}>
              <Text className=" font-semibold">Canceled</Text>
            </TouchableOpacity>
          </View>
        
        </ScrollView>
        <View>
          </View>

        <ScrollView className="mt-2">
          <View className="grid gap-4 px-4">
            {filteredEmergencies.map((emergency) => (
              <View
                key={emergency._id}
                className="bg-white py-3  border border-red-400 rounded-lg  shadow-lg shadow-slate-300"
              >

                <View className="p-2 grid gap-2 ">
                  <View className="flex-row gap-2 items-center justify-between">
                 
                    <View className="flex-row items-center gap-1">
                    <Entypo name="location" size={18} color="red" />
                    <Text className="font-semibold text-gray-600">
                      {emergency.address}
                    </Text>
                  </View>
                    <Text className="font-semibold text-gray-600">
                      {new Date(emergency.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </View>
                     <View className="flex-row gap-2 items-center">
                      <View className=" flex items-center justify-center  rounded-full">
                        <Ionicons name="person" size={15} color="red" />
                      </View>
                      <Text className="font-semibold text-gray-600">
                        {emergency.userName}-{emergency.status}
                      </Text>
                    </View>
                  <View>
     
    </View>
                  

                  {emergency.status !== "pending" && 
                    <TouchableOpacity
                      onPress={() => continueDestinationPress(emergency)}
                      className="w-2/3 mx-auto bg-gray-400 rounded-full flex items-center shadow py-3"
                    >
                      <Text className="text-white text-lg font-semibold">
                        View
                      </Text>
                    </TouchableOpacity>
                  }
                  
                  {emergency.status === "pending" && 
                    <TouchableOpacity
                      onPress={() => handleDestinationPress(emergency)}
                      className="w-2/3 mx-auto bg-red-600 rounded-full flex items-center shadow py-3"
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
          <View className="h-96"></View>
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