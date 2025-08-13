import {
  Alert,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import MapSummary from "@/components/MapSummary";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";
import axios from "axios";
import API_BASE_URL from "@/common/ApiUrl";

const Maps = () => {
  const [show, setShow] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);
  const[ latitude, setLatitude] = useState("") 
    const[ longitude, setLongitude] = useState("") 
        const[ type, setType] = useState("") 

      const [selectedValue, setSelectedValue] = useState('');



  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  const createPointer = () => {
    setShowDisplay(true);
  };

  const closeModal = () => {
    setShowDisplay(false);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const data = [
    {
      label: "Safe Zone", value:'safe'
    },
    {
      label: "Danger Zone", value:'danger'
    },
    {
      label: "Security Post", value:'security'
    },
  ];


  



  const handleSave = () => {
    if (!longitude || !latitude || !selectedValue) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    const userData = {
      latitude:latitude,
      longitude:longitude,
      type:selectedValue
    };

    axios.post(`${API_BASE_URL}/pointer`, userData)
      .then((res) => {
        Alert.alert("Pointer created successfully");
        setLatitude('');
        setLongitude('');
        setSelectedValue('');
        console.log('pointer created successfully ', res.data)
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Error", "pointer creation failed! Please try again.");
      });
  };

  return (
    <View className="flex-1">
      <View className="absolute top-16 left-6 z-10 bg-opacity-50">
        <View className="flex flex-row gap-4 flex-wrap">
          <View className="flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center">
            <Image
              source={require("../../../assets/icons/danger.png")}
              className="w-5 h-5"
            />
            <Text className="font-semibold">Danger Zones</Text>
          </View>
          <View className="flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center">
            <Image
              source={require("../../../assets/icons/sec.png")}
              className="w-6 h-6"
            />
            <Text className="font-semibold">Security Posts</Text>
          </View>
          <TouchableOpacity
            onPress={toggleShow}
            className="flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center"
          >
            <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
          </TouchableOpacity>
          {show && (
            <TouchableOpacity
              onPress={createPointer}
              className="absolute top-16 flex items-center gap-2 shadow-sm rounded-md flex-row w-44 right-10 bg-white p-2 z-10"
            >
              <FontAwesome6
                name="location-crosshairs"
                size={24}
                color="black"
              />
              <Text className="text-sm font-semibold">Add Pointers</Text>
            </TouchableOpacity>
          )}
          <View className="flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center">
            <Image
              source={require("../../../assets/icons/safe.png")}
              className="w-8 h-8"
            />
            <Text className="font-semibold">Safe Zones</Text>
          </View>
        </View>
      </View>
      <MapSummary />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showDisplay}
        onRequestClose={closeModal}
      >
        <View className="flex-1 shadow-2xl justify-center items-center mb-80 ">
          <View className="bg-white py-4 px-6 rounded-md w-3/4">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-lg ">Add Map Pointer</Text>
              <TouchableOpacity
                onPress={closeModal}
                className=" p-2  rounded-lg"
              >
                <MaterialCommunityIcons name="close" size={24} />
              </TouchableOpacity>
            </View>
            <View>
              <View className="grid gap-4 ">
                <View className="  gap-4">
                  <RadioButtonRN
                    data={data}
                    activeColor='red'
                    selectedBtn={(btn) => setSelectedValue(btn.value)}


                  />

                  <TextInput
                    placeholder="Enter Latitude"
                    placeholderTextColor={"gray"}
                    className="border border-gray-400 rounded-xl px-4 py-4"
                     onChangeText={setLatitude} // Use onChangeText
                    value={latitude}

                  />
                  <TextInput
                    placeholder="Enter Longitude"
                    placeholderTextColor={"gray"}
                    className="border border-gray-400 rounded-xl px-4 py-4"
                     onChangeText={setLongitude} // Use onChangeText
                    value={longitude}

                  />
                </View>
                <TouchableOpacity className="w-full  bg-red-500  shadow-sm   rounded-xl py-4" onPress={handleSave}>
                  <Text className="text-xl text-center font-semibold text-white">
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Maps;
