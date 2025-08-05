import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import API_BASE_URL from '@/common/ApiUrl';
import axios from 'axios';


interface MedicData {
  name: string;
  _id: string;
  state: string;
  email: string;
  location: {
      latitude: number;  
      longitude: number;  
  };
}

const MedicsOnline = () => {
    const [medics, setMedics] = useState<MedicData[]>([]);

  const fetchMedics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allmedics`);

      setMedics(response.data); 
    } catch (err) {
      console.error('Error fetching medics:', err);
    }
  };

  useEffect(() => {
    fetchMedics();
    const intervalId = setInterval(fetchMedics, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View className='h-full'>
      <View className="flex-row bg-white justify-between pb-2 h-32 border-b-2 border-gray-200 items-end">
        <View className="flex-row gap-32 items-center">
          <View>
            <Image
              source={require("../../assets/images/box.png")}
              style={styles.gif}
              resizeMode="contain"
              className="relative"
            />
          </View>
          <Text className="text-xl font-semibold">Medics Online</Text>
        </View>
        <View className="mb-3">
          <Entypo className="mr-3" name="new-message" size={24} color="black" />
        </View>
      </View>
      <ScrollView className="px-4 bg-white">
      <View className='mt-12'>
      {medics.length > 0 ? (
          medics.map((medic) => (
            <View key={medic._id} className=" mb-4 bg-white shadow rounded-md py-4 px-4 flex-row gap-4">
             <View className='grid gap-2 items-center justify-center'>
             <Image
                source={require("../../assets/images/med.png")}
                style={styles.gif}
                resizeMode="contain"
                className="relative"
              />
              {
                medic?.state ==='online' ?(
                 <View className="w-2 h-2 bg-teal-700 ml-4 rounded-full"></View>
                    
                ):(
                <View className="w-2 h-2 bg-red-700 ml-4  rounded-full"></View>
                    
                )
              }
             </View>
              <View>
                
                <Text className='text-md font-bold text-gray-600'>{medic?.name}</Text>
                <Text className='text-md font-bold text-gray-600'>{medic?.email}</Text>




                {
                medic?.state ==='online' ?(
                    <Text className='text-md font-bold text-teal-700 capitalize'>{medic?.state}</Text>

                    
                ):(
                    <Text className='text-md font-bold text-red-500 capitalize'>{medic?.state}</Text>

                    
                )
              }

              </View>
            </View>
          ))
        ) : (
          <Text className="text-center mt-4">No medics online</Text>
        )}
      </View>
      </ScrollView>
    </View>
  );
};

export default MedicsOnline;

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