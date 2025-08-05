import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Pressable,
  Linking,
  Vibration,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useEmergencyStore, useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, router } from "expo-router";
import FlashMessage, { showMessage } from "react-native-flash-message";
import AdminRideLayout from "@/components/AdminRideLayout";
import API_BASE_URL from "@/common/ApiUrl";
import { Audio } from "expo-av";

const Journey = () => {
  const {
    setUserLocation,
    userLatitude,
    userLongitude,
    setDestinationLocation,
    destinationLocation,
    emergencyId,
  } = useLocationStore();

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showLow, setShowLow] = useState(false);
  const [showMedLow, setShowMedLow] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [phone, setPhone] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [sound, setSound] = useState(); // State for sound
  const { setEmergencyStatus, emergencyStatus } = useEmergencyStore();
  const [closestHospital, setClosestHospital] = useState(null);
  const [showHospital, setShowHospital] = useState(false);
  const [hospitalName, setHospitalName] = useState('');
  const [started, setStarted] =useState('')
  const [emergencyData, setEmergencyData] =useState([])


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (destinationLocation && destinationLocation.userId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `http://172.20.10.4:5001/users/${destinationLocation.userId}`
          );
          setUserDetails(response.data);
          setPhone(response.data.contact);
        } catch (error) {
          console.error("Error fetching user details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [destinationLocation]);

  const handleCall = () => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  const showAll = () => {
    setShowLow((prev) => !prev);
  };

  const showMedAll = () => {
    setShowMedLow((prev) => !prev);
  };

  const updateEmergencyStatus = async (emergencyId: number | null) => {
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.post(
        `http://172.20.10.4:5001/emergency/${emergencyId}/status`,
        {
          status: "dispatched", 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
    } catch (error) {
      console.error("Error updating emergency status:", error.response.data);
    }
  };


  

  const destLat = destinationLocation?.latitude;
  const destLong = destinationLocation?.longitude;

  function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
  }

  function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371;

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  const averageSpeed = 35;

  const startLatitude = userLatitude;
  const startLongitude = userLongitude;
  const destinationLatitude = destLat;
  const destinationLongitude = destLong;

  const dist = haversineDistance(
    startLatitude,
    startLongitude,
    destinationLatitude,
    destinationLongitude
  );
  const distance = dist.toFixed(2);

  const timeInHours = distance / averageSpeed;
  const timeInMinutes = timeInHours * 60; 

  let fullTime; 

  if (timeInHours >= 1) {
    fullTime = timeInHours.toFixed(2) + " hours"; 
  } else {
    const timeInMinutes = timeInHours * 60;
    fullTime = timeInMinutes.toFixed(2) + " minutes"; 
  }

  const startJourney = () => {
    const timeInHours = distance / averageSpeed;
    const fullTimeInMinutes = timeInHours * 60; 
    const initialSeconds = Math.round(fullTimeInMinutes * 60);
    setSeconds(initialSeconds);
    setDispatched(true);
    updateEmergencyStatus(emergencyId);
    Vibration.vibrate();
    showMessage({
      message: "Ride Started!",
      description: "Your ride has now begun.",
      type: "success",
      duration:1000, 
    });


  };


  const updateUserState = async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");
    const newState = 'online'
  

    try {
      await axios.post(
        `http://172.20.10.4:5001/userState/${userId}/state`,
        { state: newState },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Alert.alert("Success", `You are ${newState} now!`);
      router.replace('/(admin)/(tabs)/AdminHome')
      console.log(newState)
    } catch (error) {
      console.error("Error updating user state:", error);
      Alert.alert("Error", "Failed to update user state.");
    }
  };


  useEffect(() => {
    fetchEmergencyRequestDetails(emergencyId);
  });

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  const arrived = () => {
    handleArrived(emergencyId);
    Vibration.vibrate();
    playSound()
    showMessage({
      message: "You have arrived!",
      description: "You have arrived at your destination.",
      type: "success",
      duration: 1000, 
    });
  };

  const handleArrived = async (emergencyId: number | null) => {
    const token = await AsyncStorage.getItem("token");

    try {
      await axios.post(
        `http://172.20.10.4:5001/emergency/${emergencyId}/status`,
        {
          status: "arrived", 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
    } catch (error) {
      console.error("Error updating emergency status:", error.response.data);
    }
  };

  const handleHospital = async (emergencyId: number | null) => {
    const token = await AsyncStorage.getItem("token");
  
    try {
      await axios.post(
        `http://172.20.10.4:5001/emergency/${emergencyId}/status`,
        {
          status: "hospital",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Vibration.vibrate();

    } catch (error) {
      console.error("Error updating emergency status:", error.response.data);
    }
  };

  const HospitalRoute =()=>{
    handleHospital(emergencyId)
    fetchClosestHospital()
  }




  const fetchEmergencyRequestDetails = async (emergencyId: any) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-emergency/${emergencyId}`
      );

      const data = response.data
      setEmergencyData(data)
      setEmergencyStatus(response.data.status);

      
    } catch (error) {
      console.error("Error fetching emergency request details:", error);
    }
  };

      const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/bell.mp3') 
        );
        setSound(sound);
        await sound.playAsync();
        return () => {
          sound && sound.unloadAsync(); 
        };
      };
  
      

      const fetchClosestHospital = async () => {
        const apiKey = "AIzaSyBDaZ67TyUKT7oIH99zjJ80UXC7n5wLMvE"; 
        const location = `${userLatitude},${userLongitude}`;
        const radius = 5000; // 5 km
    
        try {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=hospital&key=${apiKey}`
          );
          if (response.data.results.length > 0) {
            setClosestHospital(response.data.results[0]);
            setShowHospital(true);




    
          } else {
            showMessage({
              message: "No hospitals found nearby.",
              type: "info",
            });
          }
        } catch (error) {
          console.error("Error fetching hospitals:", error);
          showMessage({
            message: "Error fetching hospitals.",
            type: "danger",
          });
        }
      };


      const handleRoute = () => {
        if (closestHospital) {
          const hospitalLocation = {
            latitude: closestHospital.geometry.location.lat,
            longitude: closestHospital.geometry.location.lng,
            address: closestHospital.name, 
            userId: destinationLocation.userId,
            eId: emergencyId,
            route:'hospital'
          };
          
          setDestinationLocation(hospitalLocation);
          updateHospitalStatus(emergencyId);
          addHospitalLocation(emergencyId, closestHospital.name, {
            latitude: hospitalLocation.latitude,
            longitude: hospitalLocation.longitude,
          }); 
        }
      };



      const addHospitalLocation = async (emergencyId: any, hospitalAddress: any, hospitalLocation: any) => {
        try {
          const response = await axios.post(
            `http://172.20.10.4:5001/add-hospLocation/${emergencyId}/location`,
            {
              hospitalAddress,
              hospitalLocation: {
                latitude: hospitalLocation.latitude,
                longitude: hospitalLocation.longitude,
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error adding location:", error);
        }
      };





      const updateHospitalStatus = async (emergencyId: number | null) => {
        const token = await AsyncStorage.getItem("token");
    
        try {
          await axios.post(
            `http://172.20.10.4:5001/emergency/${emergencyId}/status`,
            {
              status: "enroute", 
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        } catch (error) {
          console.error("Error updating emergency status:", error.response.data);
        }
      };


      const handleCompleted =()=>{
        Completed(emergencyId)
        fetchEmergencyRequestDetails(emergencyId)
      }


      const Completed = async (emergencyId: number | null) => {
        const token = await AsyncStorage.getItem("token");
    
        try {
          await axios.post(
            `http://172.20.10.4:5001/emergency/${emergencyId}/status`,
            {
              status: "completed", 
            },
            {
              headers: {
                Authorization: `Bearer ${token}`, 
              },
            }
          );
        } catch (error) {
          console.error("Error updating emergency status:", error.response.data);
        }
      };
    
    
  return (
    <AdminRideLayout title="Ride">
      <View className="">
      {     
        emergencyStatus === 'completed'?(
          <View>
          <View className="flex-row gap-2 mx-2">
             <Entypo name="location-pin" size={24} color="grey" />
             <Text className="font-semibold mb-3">
               Pickup : {emergencyData?.address}
             </Text>
             
           </View>
           <View className="flex-row gap-2 mx-2">
             <Entypo name="location" size={24} color="grey" />
             <Text className="font-semibold mb-3">
               hospital: {emergencyData?.hospitalAddress}
             </Text>
             
           </View>
         
          </View>
        ):
        (
          <View>
          <View className="flex-row gap-2">
             <Entypo name="location-pin" size={24} color="grey" />
             <Text className="font-semibold mb-3">
               {destinationLocation.address}
             </Text>
           </View>
           <View className="flex-row gap-3">
             <MaterialIcons name="access-time" size={20} color="grey" />
             <Text className="font-semibold mb-3">Duration: {fullTime}</Text>
           </View>
           <View className="flex-row gap-3">
             <Entypo name="map" size={20} color="grey" />
             <Text className="font-semibold mb-3">Distance: {distance}km</Text>
           </View>
          </View>
        )
        
         
      }

        {emergencyStatus === "accepted" && (
          <TouchableOpacity
            className="w-full mt-5 mx-auto bg-blue-500 rounded-lg flex items-center shadow py-3"
            onPress={startJourney}
          >
            <Text className="text-white text-lg font-semibold">Start Ride</Text>
          </TouchableOpacity>
        )}

        {emergencyStatus === "dispatched" && (
          <View>
            <View className="w-full mt-5 mx-auto bg-gray-100 rounded-lg flex items-center py-3">
              <Text className="text-lg font-gray font-semibold">
                Time Remaining : {formatTime(seconds)}
              </Text>
            </View>
            <TouchableOpacity
              className="w-full mt-5 mx-auto bg-teal-600 rounded-lg flex items-center shadow py-3"
              onPress={arrived}
            >
              <Text className="text-white text-lg font-semibold">
                I have Arrived{" "}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {emergencyStatus === "arrived" && (
          <View>
            <View className="w-full mt-5 mx-auto bg-gray-100 rounded-lg flex items-center py-3">
              <Text className="text-lg font-gray font-semibold">
                You have arrived...
              </Text>
            </View>
            <TouchableOpacity
             onPress={HospitalRoute} 

              className="w-full mt-5 mx-auto bg-teal-600 rounded-lg flex items-center shadow py-3"
            >
              <Text className="text-white text-lg font-semibold">
                Show route to nearest hospital
              </Text>
            </TouchableOpacity>
          </View>
        )}


      {emergencyStatus === "hospital" && (
          <TouchableOpacity onPress={handleRoute}>
               {showHospital && closestHospital && (
          <View className="mt-5 p-4 border rounded bg-gray-100">
            <Text className="text-lg font-bold flex flex-wrap">
              Closest Hospital: {closestHospital.name}
            </Text>
            <View className="  gap-2 ">
            <Text className="">{closestHospital.vicinity}</Text>
            {closestHospital.opening_hours && (
              <Text className="">
                {closestHospital.opening_hours.open_now
                  ? "Open Now"
                  : "Closed"}
              </Text>
               )}
            </View>

           

          </View>



        )}


  

               
          </TouchableOpacity>
        )}

        {
          emergencyStatus ==='enroute' &&(
             <TouchableOpacity
             onPress={handleCompleted} 

              className="w-full mt-5 mx-auto bg-teal-600 rounded-lg flex items-center shadow py-3"
            >
              <Text className="text-white text-lg font-semibold">
               Completed
              </Text>
            </TouchableOpacity>
          )
          
        }

{
          emergencyStatus ==='completed' &&(
             <TouchableOpacity
             
              onPress={updateUserState}
              className="w-full mt-5 mx-auto bg-teal-600 rounded-lg flex items-center shadow py-3"
            >
              <Text className="text-white text-lg font-semibold">
               Done
              </Text>
            </TouchableOpacity>
          )
          
        }



        <View className="mt-10 border-t border-gray-200">
          {loading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : userDetails ? (
            <>
              <View className="flex py-5 px-5   w-full  rounded-md">
                <Pressable
                  className="flex-row items-center justify-between"
                  onPress={showAll}
                >
                  <Text className="text-gray-500 text-sm">
                    USER INFORMATION
                  </Text>
                  <Entypo name="chevron-small-down" size={24} color="black" />
                </Pressable>
                {showLow && (
                  <View className="flex-row gap-4 mt-7">
                    <View className=" grid gap-4 w-1/2">
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <Ionicons name="person" size={15} color="teal" />
                          <Text className="text-sm text-gray-500">
                            User Name:
                          </Text>
                        </View>
                        <Text className="text-sm font-bold ml-6">
                          {userDetails.name}
                        </Text>
                      </View>
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <FontAwesome name="phone" size={15} color="teal" />
                          <Text className="text-sm text-gray-500">Phone:</Text>
                        </View>
                        <Text className="text-sm font-bold ml-6">
                          {userDetails.contact}
                        </Text>
                      </View>

                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <MaterialCommunityIcons
                            name="human-male-child"
                            size={15}
                            color="teal"
                          />
                          <Text className="text-sm text-gray-500">
                            Next of Kin
                          </Text>
                        </View>
                        <Text className="text-sm font-bold ml-6">
                          {userDetails.NOK}
                        </Text>
                      </View>

                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <Entypo name="address" size={15} color="teal" />
                          <Text className="text-sm text-gray-500">Address</Text>
                        </View>
                        <Text className="text-sm font-bold capitalize ml-6">
                          {userDetails.HNO}
                        </Text>
                      </View>
                    </View>
                    <View className="w-1/2 grid gap-4 ">
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <MaterialIcons name="email" size={15} color="teal" />
                          <Text className="text-sm text-gray-500">
                            User Email:
                          </Text>
                        </View>
                        <Text className="text-sm font-bold ml-6">
                          {userDetails.email}
                        </Text>
                      </View>
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <FontAwesome6
                            name="genderless"
                            size={15}
                            color="teal"
                          />
                          <Text className="text-sm text-gray-500">Gender:</Text>
                        </View>
                        <Text className="text-sm font-bold capitalize ml-6">
                          {userDetails.gender}
                        </Text>
                      </View>
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <MaterialIcons
                            name="contact-emergency"
                            size={15}
                            color="teal"
                          />
                          <Text className="text-sm text-gray-500">
                            Em-contact:
                          </Text>
                        </View>
                        <Text className="text-sm font-bold capitalize ml-6">
                          {userDetails.econtact}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              <View className="flex py-5 px-5  mt-5 border-t border-gray-200  w-full  rounded-md">
                <Pressable
                  className="flex-row items-center justify-between"
                  onPress={showMedAll}
                >
                  <Text className="text-gray-500 text-sm">
                    MEDICAL INFORMATION
                  </Text>
                  <Entypo name="chevron-small-down" size={24} color="black" />
                </Pressable>
                {showMedLow && (
                  <View className="flex-row gap-4 mt-7">
                    <View className=" grid gap-4 w-1/2">
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <Fontisto name="blood" size={15} color="teal" />
                          <Text className="text-sm text-gray-500">
                            Blood type:
                          </Text>
                        </View>
                        <Text className="text-sm font-bold ml-6">
                          {userDetails.blood}
                        </Text>
                      </View>

                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <FontAwesome5
                            name="allergies"
                            size={15}
                            color="teal"
                          />
                          <Text className="text-sm text-gray-500">
                            Allergies
                          </Text>
                        </View>
                        {userDetails.allergies.map((allergy, index) => (
                          <Text key={index} className="text-sm font-bold ml-6">
                            {allergy}
                          </Text>
                        ))}
                      </View>
                    </View>
                    <View className="w-1/2 grid gap-4 ">
                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <FontAwesome5 name="virus" size={15} color="teal" />
                          <Text className="text-sm text-gray-500">
                            Sicle Cell Status:
                          </Text>
                        </View>
                        <Text className="text-sm font-bold ml-6">
                          {userDetails.sickling}
                        </Text>
                      </View>

                      <View className="border-gray-300 border  py-3 px-2 rounded-md">
                        <View className="flex-row gap-2 items-center">
                          <MaterialIcons
                            name="health-and-safety"
                            size={15}
                            color="teal"
                          />
                          <Text className="text-sm text-gray-500">
                            Health Conditions:
                          </Text>
                        </View>
                        {userDetails.conditions.map((condition, index) => (
                          <Text key={index} className="text-sm font-bold ml-6">
                            {condition}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </>
          ) : (
            <Text className="text-lg font-semibold">
              No user details available
            </Text>
          )}

          <View className="flex flex-row mx-4 border-t border-gray-200 mt-7 py-6 justify-between">
            <Link
              href={{
                pathname: "/(root)/Chatroom",
                params: {
                  name: userDetails?.name,
                  receiverId: destinationLocation?.userId,
                },
              }}
              asChild
              className="bg-slate-100 rounded-full p-6"
            >
              <Ionicons name="chatbubble-ellipses" size={30} color="teal" />
            </Link>
            <Pressable
              className="bg-slate-100 rounded-full p-6 "
              onPress={handleCall}
            >
              <MaterialIcons name="call" size={30} color="teal" />
            </Pressable>
          </View>
        </View>
      </View>
    </AdminRideLayout>
  );
};

export default Journey;

const styles = StyleSheet.create({});
