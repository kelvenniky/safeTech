import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { RadioButton } from "react-native-paper";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import API_BASE_URL from "@/common/ApiUrl";
  import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
  
  const MedicProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [HNO, setHNO] = useState("");
    const [NOK, setNOK] = useState("");
    const [econtact, setEcontact] = useState("");
    const [dob, setDob] = useState("");
    const [blood, setBlood] = useState("A+");
    const [sickling, setSickling] = useState("AA");
    const [gender, setGender] = useState("male");
    const [showLow, setShowLow] = useState(false);
    const [showMedLow, setShowMedLow] = useState(false);
    const [allergy, setAllergy] = useState<string>('');
    const [condition, setCondition] = useState<string>('');
    const [allergies, setAllergies] = useState<string[]>([]);
    const [conditions, setConditions] = useState<string[]>([]);
  
    interface UserData {
      name: string;
      email: string;
      contact?: string;
      HNO?: string;
      NOK?: string;
      econtact?: string;
      dob?: string;
      blood?: string;
      sickling?: string;
      gender?: string;
      allergies?: string[];
      conditions?: string[];
    }
  
    const [userData, setUserData] = useState<UserData | null>(null);
  
    async function getData() {
      const token = await AsyncStorage.getItem("token");
      const trimmedToken = token ? token.trim() : null;
  
      if (!trimmedToken) {
        console.error("Token is undefined or null");
        return;
      }
  
      try {
        const res = await axios.post(`${API_BASE_URL}/userdata`, { token: trimmedToken });
        const data = res.data.data;
  
        setName(data.name);
        setEmail(data.email);
        setContact(data.contact || "");
        setHNO(data.HNO || "");
        setNOK(data.NOK || "");
        setEcontact(data.econtact || "");
        setDob(data.dob || "");
        setBlood(data.blood || "A+");
        setSickling(data.sickling || "AA");
        setGender(data.gender || "male");
        setAllergies(data.allergies || []);
        setConditions(data.conditions || []);
        
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
    useEffect(() => {
      getData();
    }, []);
  
    const handleSave = async () => {
      const token = await AsyncStorage.getItem("token");
      const trimmedToken = token ? token.trim() : null;
  
      if (!trimmedToken) {
        Alert.alert("Error", "Token is not available. Please log in again.");
        return;
      }
  
      try {
        const response = await axios.post("http://172.20.10.4:5001/medprofile", {
          token: trimmedToken,
          contact,
          HNO,
          NOK,
          econtact,
          dob,
          gender,
          conditions,
          allergies,
          blood,
          sickling
        });
  
        console.log(response.data);
  
        if (response.data.success) {
          Alert.alert("Success", "Medical profile saved successfully!");
        } else {
          Alert.alert("Error", response.data.message || "Failed to save request. Please try again.");
        }
      } catch (error) {
        console.error("Error saving medical profile:", error);
        Alert.alert("Error", "An error occurred while saving the profile. Please try again.");
      }
    };
  
    const toggleShowLow = () => setShowLow((prev) => !prev);
    const toggleShowMedLow = () => setShowMedLow((prev) => !prev);
  
    const addAllergy = () => {
      if (allergy.trim()) {
        setAllergies([...allergies, allergy]);
        setAllergy('');
      }
    };
  
    const addCondition = () => {
      if (condition.trim()) {
        setConditions([...conditions, condition]);
        setCondition('');
      }
    };
  
    const renderItem = ({ item }: { item: string }) => (
      <View className="p-2 flex-row ">
        <Text className="text-md border-gray-300 border-b">{item}</Text>
      </View>
    );
  
    return (
      <SafeAreaView className="bg-white h-full">
          <View className="flex  justify-center bg-white  h-20  ">
          <View className="mt-5  mx-4 flex-row  items-center justify-between  ">
         <Pressable onPress={()=>router.push('/(admin)/(tabs)/Profile')}> <Entypo name="chevron-left" size={30} color="black" /></Pressable >
          <Text className="text-xl  font-semibold">Medic Profile</Text>
                 <View></View>    
          </View>
                    </View>
        <ScrollView className="h-full">
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Pressable
              className="flex-row items-center mx-4 mt-10 border-t border-gray-300 mb-4 justify-between py-2"
              onPress={toggleShowLow}
            >
              <Text className="text-md font-semibold">PERSONAL INFORMATION</Text>
              <Entypo name="chevron-small-down" size={24} color="black" />
            </Pressable>
            {showLow && (
              <View className="mx-4">
                <View className="flex-row items-center gap-2">
                  <View className="w-1/2 gap-4">
                    <View className="gap-2">
                      <Text className="text-sm text-teal-800 font-semibold">CONTACT</Text>
                      <TextInput
                        placeholder="Enter your contact"
                        placeholderTextColor="grey"
                        keyboardType="numeric"
                        value={contact}
                        onChangeText={setContact}
                        className="py-4 border px-2 border-gray-300 rounded-md"
                      />
                    </View>
                  
                  </View>
                 
                </View>
                <View className="gap-2 mt-4">
                  <Text className="text-sm text-teal-800 font-semibold">House Number</Text>
                  <TextInput
                    placeholder="Enter your digital Address"
                    placeholderTextColor="grey"
                    value={HNO}
                    onChangeText={setHNO}
                    className="py-4 border px-2 border-gray-300 rounded-md"
                  />
                </View>
                <View className="w-1/3 py-4 mt-4 border px-1 border-gray-300 rounded-md">
                  <Text className="text-sm mx-auto border-b text-teal-800 font-semibold">GENDER</Text>
                  <RadioButton.Group onValueChange={setGender} value={gender}>
                    <View className="flex-row gap-2 items-center">
                      <RadioButton value="male" />
                      <Text>Male</Text>
                    </View>
                    <View className="flex-row gap-2 items-center">
                      <RadioButton value="female" />
                      <Text>Female</Text>
                    </View>
                  </RadioButton.Group>
                </View>
              </View>
            )}
           
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={styles.container1}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default MedicProfile;
  
  const styles = StyleSheet.create({
    button: {
      width: 370,
      backgroundColor: "#0d9488",
      borderRadius: 15,
      padding: 15,
      alignItems: "center",
    },
    container1: {
      justifyContent: "center",
      alignSelf: "center",
      marginTop: 35,
    },
  });