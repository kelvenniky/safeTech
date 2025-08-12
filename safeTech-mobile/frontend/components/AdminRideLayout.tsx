import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";
  import { router } from "expo-router";
  import React, { useRef, useState } from "react";
  import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
  import { GestureHandlerRootView } from "react-native-gesture-handler";
  
  import MapComponent from "./MapComponent";
  import { AntDesign } from "@expo/vector-icons";
  import FlashMessage from "react-native-flash-message";
  import AdminMapComponent from '../components/AdminMapComponent'
  
  const AdminRideLayout = ({
    title,
    snapPoints,
    children,
    medics,
    started, // Add this line

  }: {
    title?: string;
    snapPoints?: string[];
    children: React.ReactNode;
    medics?: any[];
    started?: boolean; // Add this line

  }) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

  
    return (
      <GestureHandlerRootView >
       <FlashMessage position="top" /> 
        <View className="flex-1 bg-white">
          <View className="flex flex-col h-screen bg-blue-500">
            <View className="flex flex-row absolute z-10 top-16 items-center justify-start px-5 " style={styles.header}>
              <TouchableOpacity onPress={() => router.back()}>
                <View className="p-3 bg-red-600 rounded-full items-center justify-center">
                <AntDesign name="arrowleft" size={24} color="white" />
                </View>
              </TouchableOpacity>
              <Text className="text-xl font-semibold  ml-5">
              </Text>
            </View>
              <AdminMapComponent medics={medics}/>
            
            
          </View>
  
          <BottomSheet
              ref={bottomSheetRef}
          snapPoints={snapPoints || ["50%", "85%"]}
          index={0}
             handleIndicatorStyle={styles.indicator} // Optional: Customize the handle indicator
        style={styles.bottomSheet}
          >
            {title === "Choose a Rider" ? (
              <BottomSheetView
                style={{
                  flex: 1,
                  padding: 20,
                }}
              >
                {children}
              </BottomSheetView>
            ) : (
              <BottomSheetScrollView
                style={{
                  flex: 1,
                  padding: 20,
                }}
              >
                {children}
              </BottomSheetScrollView>
            )}
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    );
  };
  
  export default AdminRideLayout;
  const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 10,
    top: 64, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
   bottomSheet: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: 'hidden', // Important for rounded edges
  },
   indicator: {
    backgroundColor: 'red',
    width: 60,
    borderRadius: 10,
  },
  
  })
  