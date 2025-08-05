import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";

const CreateDialog = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const createDialog = () => {};
  return (
    <KeyboardAvoidingView 
      className="h-full bg-white"
      style={{ flex: 1 }}
      
    >
      <View className="flex-row  bg-white justify-between pb-2  h-32 border-b-2 border-gray-200  items-end" >
        <View className="flex-row gap-32 items-center">
          <View>
            <Image
              source={require("../../assets/images/message.png")}
              style={styles.gif}
              resizeMode="contain" 
              className="relative"
            />
            <View className="bg-red-400 rounded-full h-2 w-2 absolute left-11"></View>
          </View>
          <Text className="text-xl font-semibold">Dialogs</Text>,
        </View>
        <View className="mb-3">
          <Entypo className="mr-3" name="new-message" size={24} color="black" />
        </View>
      </View>

      <ScrollView></ScrollView>
      <TouchableOpacity
        onPress={openModal}
        className="mt-9 my-10 mx-auto bg-teal-600 px-5 shadow-sm border-gray-400 animate-bounce  rounded-3xl py-2 flex-row items-center gap-2"
      >
        <Text className="text-lg font-semibold text-white">
          Create a Dialog
        </Text>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <Modal
      
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center   items-center bg-black opacity-85">
          <View className="bg-white h-2/4 w-4/5 rounded-xl  ">
          <View className="mt-4 rounded-md mx-3 ">
              <TextInput
                multiline={true}
                placeholder="Dialog title...."
                placeholderTextColor={"black"}
                className="bg-slate-100   rounded-lg border p-3  "
              />
            </View>

            <View className="mt-4 rounded-md mx-3 ">
              <TextInput
                multiline={true}
                numberOfLines={4}
                placeholder="Start your Dialog here..."
                placeholderTextColor={"black"}
                className="bg-slate-100 h-60  rounded-lg border p-3  "
              />
            </View>

            <View className="flex-row justify-around mt-4">
              <TouchableOpacity
                onPress={createDialog}
                style={styles.confirmButton}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                style={styles.cancelButton}
              >
                <Text style={{ color: "black", fontWeight: "bold" }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default CreateDialog;

const styles = StyleSheet.create({
  gif: {
    width: 45, 
    height: 45, 
    marginLeft: 15,
  },
  confirmButton: {
    backgroundColor: "#0d9488",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 100,
  },
  cancelButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 100,
  },
});
