import RideLayout from '@/components/RideLayout';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Vibration, Pressable, TouchableOpacity, Image, Linking } from 'react-native';
import axios from 'axios';
import API_BASE_URL from '@/common/ApiUrl';
import { useLocationStore, useDriverStore, useEmergencyStore } from '@/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import { Link, router } from 'expo-router';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { Audio } from 'expo-av'; 
import * as Progress from 'react-native-progress';
import { ProgressBar, MD3Colors } from 'react-native-paper';



const UserMap = () => {
  const [medics, setMedics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setDestinationLocation,setHospitalLocation, userLatitude, userLongitude, userAddress } = useLocationStore();
  const { setSelectedDriver } = useDriverStore();
  const { setEmergencyStatus, emergencyStatus } = useEmergencyStore();
  const [closestMedicInfo, setClosestMedicInfo] = useState(null);
  const [emergencyRequestId, setEmergencyRequestId] = useState(null);
  const [emergencyRequestDetails, setEmergencyRequestDetails] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(); 
  const [started, setStarted] = useState(false)
  const [phone, setPhone] = useState('')


   const handleCall = () => {
     const phoneNumber = `tel:${phone}`;
     Linking.openURL(phoneNumber);
   };

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 1) {
          return Math.min(prev + 0.5 ); // Increase progress faster
        }
        return 0; // Reset progress when full
      });
    }, 900); // Update every 50 milliseconds (faster)

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const loadEmergencyRequestDetails = async () => {
      const storedRequestId = await AsyncStorage.getItem('emergencyRequestId');
      if (storedRequestId) {
        setEmergencyRequestId(storedRequestId);
        fetchEmergencyRequestDetails(storedRequestId);
      }
    };
    loadEmergencyRequestDetails();
  }, []);

  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/medics`);
        setMedics(response.data);
      } catch (err) {
        console.error('Error fetching medics:', err);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    const intervalId = setInterval(() => {
      fetchMedics();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);




  useEffect(() => {
    if (medics.length > 0 && userLatitude && userLongitude) {
      const closestMedic = medics.reduce((closest, medic) => {
        const distance = haversineDistance(
          userLatitude,
          userLongitude,
          medic.location.latitude,
          medic.location.longitude
        );

        if (!closest || distance < closest.distance) {
          return { medic, distance };
        }
        return closest;
      }, null);

      if (closestMedic) {
        const estimatedMinutes = calculateEstimatedTime(closestMedic.distance);
        setEstimatedTime(estimatedMinutes);

        setDestinationLocation({
          latitude: closestMedic.medic.location.latitude,
          longitude: closestMedic.medic.location.longitude,
          address: closestMedic.medic.address,
          userId: closestMedic.medic._id,
          eId: closestMedic.medic._id,
          route:'user'
        });

        setSelectedDriver(closestMedic.medic._id);
        setClosestMedicInfo(closestMedic.medic);
      }
    }
  }, [medics, userLatitude, userLongitude]);

  const calculateEstimatedTime = (distance) => {
    const averageSpeed = 30; 
    const timeInHours = distance / averageSpeed;
    return Math.ceil(timeInHours * 60); 
  };

  const handleEmergencyRequest = async (closestMedicId) => {
    const token = await AsyncStorage.getItem("token");
    const location = {
      latitude: userLatitude,
      longitude: userLongitude,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/emergency`, {
        token,
        location,
        address: userAddress,
        closestMedicId,
      });

      if (response.data.status === 'ok') {
        console.log('Emergency request sent successfully:', response.data.data);
        setEmergencyRequestId(response.data.data._id);
        setEmergencyStatus(response.data.data.status);
        console.log("close", response.data.data.closestMedicId)
        await AsyncStorage.setItem('emergencyRequestId', response.data.data._id);
      } else {
        console.error('Error sending emergency request:', response.data.data);
      }
    } catch (error) {
      console.error('Error in emergency request:', error);
    }
  };

  const fetchEmergencyRequestDetails = async (requestId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-emergency/${requestId}`);
      setEmergencyRequestDetails(response.data);
      setEmergencyStatus(response.data.status); 
    } catch (error) {
      console.error('Error fetching emergency request details:', error);
    }
  };

  useEffect(() => {
    if (emergencyRequestId) {
      fetchEmergencyRequestDetails(emergencyRequestId);
      const intervalId = setInterval(() => {
        fetchEmergencyRequestDetails(emergencyRequestId);
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [emergencyRequestId]);

  useEffect(() => {
    if (emergencyStatus === "dispatched") {
      Vibration.vibrate();
      showMessage({
        message: "Ride Started!",
        description: "Your ride has now begun.",
        type: "success",
        duration: 3000,
      });
    }
  }, [emergencyStatus]);

  useEffect(() => {
    if (emergencyStatus === "enroute") {
      // Check if hospital location details are available
      if (emergencyRequestDetails?.hospitalAddress) {
        const { latitude, longitude } = emergencyRequestDetails.hospitalLocation;
  
        // Create hospital location object
        const hospitalLocation = {
          latitude,
          longitude,
          address: emergencyRequestDetails.hospitalAddress || "Unknown address", // Fallback if address is not available
          userId: emergencyRequestDetails.userId, // Assuming you have userId in emergencyRequestDetails
          eId: emergencyRequestId, // Assuming emergencyRequestId is the ID you want to use
          route:'hospital',
        };
  
        // Update destination location
        setHospitalLocation(hospitalLocation);
      } else {
        console.error("Hospital location details are missing.");
      }
    }
  }, [emergencyStatus, emergencyRequestDetails, emergencyRequestId]);


  


  const handleCompleted = async () => {
    try {
      setEmergencyStatus('')
      const exit = AsyncStorage.setItem('emergencyRequestId', '');
      console.log('id',exit )
  
      // Navigate to Home
      router.push('/(root)/(tabs)/Home');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  useEffect(() => {
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/bell.mp3') 
      );
      setSound(sound);
      await sound.playAsync();
    };

    if (emergencyStatus === "arrived") {
      playSound();
    }

    return () => {
      sound && sound.unloadAsync(); 
    };
  }, [emergencyStatus]);

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const removeAsync = () => {
    if (emergencyStatus) {
      AsyncStorage.setItem('emergencyRequestId', '');
      router.push('/(root)/(tabs)/Home');
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }



  return (
    <RideLayout title='Ride' medics={medics} emergencyStatus={emergencyStatus}>
      <View>
        {!emergencyRequestDetails && (
          <View className='ml-4'>
              <View className='flex items-center'>
              <Image source={require("../../assets/images/looo.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           />
              </View>
            <Text className='text-2xl text-center font-semibold'>Confirm to send Request....</Text>
            <TouchableOpacity className="w-full mt-5 mx-auto bg-red-500 rounded-full flex items-center shadow py-4" onPress={() => handleEmergencyRequest(closestMedicInfo?._id)} >
              <Text className="text-white text-lg font-semibold">Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity
                        onPress={handleCompleted}
                        className="w-full mt-3 mx-auto bg-gray-400 rounded-full flex items-center shadow py-4"
                      >
                        <Text className="text-white text-lg font-semibold">
                         Cancel
                        </Text>
            </TouchableOpacity>
          </View>
        )}

        {emergencyRequestDetails && emergencyStatus === "pending" && (
          <View className='gap-2'>
            <View className='flex items-center'>
              <Image source={require("../../assets/images/looo.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           /></View>
            <Text className='text-2xl text-center font-semibold'>Connecting to a Security Personnel...</Text>
            <TouchableOpacity
                        onPress={handleCompleted}
                        className="w-full mt-3 mx-auto bg-gray-400 rounded-full flex items-center shadow py-4"
                      >
                        <Text className="text-white text-lg font-semibold">
                         Cancel
                        </Text>
                        
            </TouchableOpacity>

            
            {/* <View>
              {
                medics.map((medic)=>{
                  return(
                    <View key={medic._id} className='bg-red '>
                        <Text>helloo</Text>
                    </View>
                  )
                })
              }
            </View> */}
          </View>
        )}

        {emergencyRequestDetails && emergencyStatus === "accepted" && (
          <View>
            <View className='flex items-center'>
              <Image source={require("../../assets/images/looo.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           />
              </View>
            <Text style={{fontSize:20}} className='text-gray-800 text-center mt-4 font-semibold'>Connecting to Security Personnel...</Text>
            <View className='flex-row mt-6 gap-28 mx-auto items-center '>
              <View className='grid items-center gap-2'>
                <Pressable className="bg-slate-100 rounded-full ">
                <Image source={require("../../assets/icons/sec.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           />
           
                </Pressable>
                <Text className='font-semibold'>{closestMedicInfo?.name}</Text>
              </View>
            
            </View>
            <View className='border-t border-gray-200 pt-4 mt-6 flex flex-row items-center gap-2 '>
            <Ionicons name="location-sharp" size={24} color="red" />
            <Text className='text-lg text-gray-500'>{userAddress}</Text>
            </View>
          </View>
        )}

        {emergencyRequestDetails && emergencyStatus === "dispatched" && (
          <View className='mx-4'>
            <View className='flex items-center'>
              <Image source={require("../../assets/images/looo.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           />
              </View>
            <View className='border-gray-200 pb-6 border-b'>
              <View className='flex flex-row items-center '>
              <Text className='font-bold text-center text-2xl '>Personnel is arriving in ~{estimatedTime} min</Text>
             
              </View>
             
            </View>
            <View className='flex-row mt-2 items-center justify-between'>
              <View className='grid items-center gap-2'>
              <Pressable className="bg-slate-100 rounded-full ">
                <Image source={require("../../assets/icons/sec.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           />
           
                </Pressable>
                <Text className='text-gray-600 font-semibold'>{closestMedicInfo?.name}</Text>
              </View>
              <View className='grid items-center gap-2'>
                <Link href={{
                  pathname: "/(root)/Chatroom",
                  params: { name: closestMedicInfo?.name, receiverId: closestMedicInfo?._id },
                }} asChild className="bg-slate-100 rounded-full p-4">
                  <Ionicons name="chatbubble-ellipses" size={35} color="red" />
                </Link>
                <Text className='text-gray-600 font-semibold'>Chat</Text>
              </View>
              <View className='grid items-center gap-2'>
                <Pressable className="bg-slate-100 rounded-full p-4">
                  <MaterialIcons name="call" size={35} color="red" />
                </Pressable>
                <Text className='text-gray-600 font-semibold'>Call</Text>
              </View>
            </View>
            <View className='border-t border-gray-200 pt-4 mt-8 flex flex-row items-center gap-2 '>
            <Ionicons name="location-sharp" size={24} color="red" />
            <Text className='text-lg text-gray-500 font-semibold'>{userAddress}</Text>
            </View>
          </View>
        )}

        {emergencyRequestDetails && emergencyStatus === "arrived" && (
          <View className='mx-4'>
             <View className='flex items-center'>
              <Image source={require("../../assets/images/looo.png")  }
              resizeMode="contain" 
              className="relative w-20 h-20 rounded-full "

           />
              </View>
          <View className='border-gray-200 pb-2 border-b'>
            <Text className='font-bold text-center text-2xl animate-pulse'>Security is Here.. </Text>
            
           
          </View>
          <View className='flex-row mt-6 items-center justify-between'>
            <View className='grid items-center gap-2'>
            <Pressable className="bg-slate-100 rounded-full ">
              <Image source={require("../../assets/icons/sec.png")  }
            resizeMode="contain" 
            className="relative w-14 h-14 rounded-full "

         />
         
              </Pressable>
              <Text className='text-gray-600 font-semibold'>{closestMedicInfo?.name}</Text>
            </View>
            <View className='grid items-center gap-2'>
              <Link href={{
                pathname: "/(root)/Chatroom",
                params: { name: closestMedicInfo?.name, receiverId: closestMedicInfo?._id },
              }} asChild className="bg-slate-100 rounded-full p-4">
                <Ionicons name="chatbubble-ellipses" size={25} color="red" />
              </Link>
              <Text className='text-gray-600 font-semibold'>Chat</Text>
            </View>
            <View className='grid items-center gap-2'>
              <Pressable className="bg-slate-100 rounded-full p-4">
                <MaterialIcons name="call" size={25} color="red" />
              </Pressable>
              <Text className='text-gray-600 font-semibold'>Call</Text>
            </View>
          </View>
          <View className='border-t border-gray-200 pt-4 mt-8 flex flex-row items-center gap-2 '>
          <Ionicons name="location-sharp" size={24} color="red" />
          <Text className='text-lg text-gray-500'>{userAddress}</Text>
          </View>
          <TouchableOpacity
                        onPress={handleCompleted}
                        className="w-full mt-3 mx-auto bg-red-600 rounded-full flex items-center shadow py-4"
                      >
                        <Text className="text-white text-lg font-semibold">
                         Done
                        </Text>
            </TouchableOpacity>
        </View>
        )}

     



  
        
      </View>
    </RideLayout>
  );
}

export default UserMap;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  requestDetail: {
    color: 'red',
  },
});