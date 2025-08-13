import { AntDesign, Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

const SummaryScreen = ({ }) => {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLow, setShowLow] = useState(false)


  const fetchEmergencies = async () => {
    const userId = await AsyncStorage.getItem("userId");
    console.log(userId)

    try {
      const response = await fetch(`http://172.20.10.4:5001/my-emergencies?userId=${userId}`);
      const data = await response.json();
      setEmergencies(data);
    } catch (error) {
      console.error("Error fetching emergencies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const emergencyCounts = {};
  emergencies.forEach(emergency => {
    const date = new Date(emergency.createdAt).toLocaleDateString();
    emergencyCounts[date] = (emergencyCounts[date] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(emergencyCounts),
    datasets: [
      {
        data: Object.values(emergencyCounts),
      },
    ],
  };


  const toggleShowLow = () => setShowLow((prev) => !prev);

  const total = emergencies.length
  const totalCompleted = emergencies.filter(emergencies=> emergencies.status === "completed").length
  const totalCancelled = emergencies.filter(emergencies=> emergencies.status === "cancelled").length


  return (
    <View className=" h-full">
        <View className="flex-row bg-white justify-between pb-2 h-32 border-b-2 border-gray-200 items-end">
        <View className="flex-row gap-32 mb-4 items-center">
          <View className="px-4">
          <Pressable onPress={()=>router.replace('/(admin)/(tabs)/AdminHome')}>
            <AntDesign name="left" size={25}/>
          </Pressable>
          </View>
          <Text className="text-xl font-semibold">Data Visualization</Text>
        </View>
        <View className="mb-3">
        </View>
      </View>
      <ScrollView className="px-4 bg-white">
      <View className="mt-10 bg-white shadow rounded-md py-4 px-4  flex-row justify-between">
            
           <Entypo name="text-document" size={24} color="red" />
            <Text className=" text-xl font-semibold">{total} Total Requests</Text>
        </View>
        <View className="mt-2 bg-white shadow rounded-md py-4 px-4 flex-row justify-between">
       <Entypo name="text-document" size={24} color="red" />
            <Text className=" text-xl font-semibold">{totalCompleted} Completed Requests</Text>
        </View>
        <View className="mt-2 bg-white shadow rounded-md py-4 px-4 flex-row justify-between">
       <Entypo name="text-document" size={24} color="red" />
            <Text className=" text-xl font-semibold">{totalCancelled} Cancelled Requests</Text>
        </View>
        <TouchableOpacity onPress={toggleShowLow} className="mt-2 bg-white shadow rounded-md py-4 px-4 flex-row justify-between">
       <Entypo name="text-document" size={24} color="red" />
            <Text className=" text-xl font-bold">All  Requests</Text>
            <Feather name="chevron-right" size={24} color="red" />
        </TouchableOpacity>
   {
    showLow &&(
        <View className="mt-5 gap-2 ">
        {
            emergencies.map((emergency)=>{
                return(
                    <View key={emergency._id} className="bg-white shadow px-4 flex-row items-center gap-4 py-4">
                     <MaterialIcons name="document-scanner" size={24} color="black" />
                        <View>
                        <Text className="text-gray-600 font-semibold">{emergency.userName} / {emergency.userEmail}</Text>
                        <Text className="text-gray-600 font-semibold">Status: {emergency.status}</Text>
                        </View>



                    </View>

                )
            })
        }
      </View>
    )
   }
        </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  gif: {
    width: 30,
    height: 30,
    marginLeft: 15,
  },
});

export default SummaryScreen;