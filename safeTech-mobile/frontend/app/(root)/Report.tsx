import {
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Entypo, Ionicons, Octicons } from "@expo/vector-icons";
import { dismiss } from "expo-router/build/global-state/routing";

const Report = () => {
  const [visible, setVisible] = useState(false);

  const openBottomSheet = () => {
    setVisible(true);
  };

  const closeBottomSheet = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView className="mx-6">
      <View className=" flex items-center flex-row mt-6 ">
        <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/Home")}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
        <Text className="ml-24 text-2xl font-semibold">Send Report</Text>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="grid mt-14 gap-6">
          <View className="grid gap-2">
            <Text className="font-semibold ml-4  ">Any Casualities</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={"gray"}
              className="border border-gray-400 rounded-lg px-4 py-4"
            />
          </View>
          <View className="grid gap-2">
            <Text className="font-semibold ml-4  ">Location</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={"gray"}
              className="border border-gray-400 rounded-lg px-4 py-4"
            />
          </View>
          <View className="grid gap-2">
            <Text className="font-semibold ml-4  ">Additional Information</Text>
            <TextInput
              placeholder=""
              placeholderTextColor={"gray"}
              className="border border-gray-400 rounded-lg px-4 py-2 h-32"
              numberOfLines={10}
              multiline={true}
            />
          </View>
          <View className="grid gap-2">
            <Text className="font-semibold ml-4  ">
              Upload Photo (Optional)
            </Text>
            <TouchableOpacity className="border border-gray-400 rounded-lg h-32 flex items-center justify-center">
              <Entypo name="upload" size={24} color="gray" />
              <Text className="font-semibold text-red-600 text-lg mt-2  ">
                Upload photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View className="mt-12 flex items-center justify-center">
        <TouchableOpacity className=" w-full   bg-red-500   rounded-lg py-4">
          <Text className="text-xl text-center font-semibold text-white">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({});
