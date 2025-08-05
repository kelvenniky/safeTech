import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import firstAid from "../../../common/firstaid"; 
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const DetailScreen = () => {
  const { id } = useLocalSearchParams();
  const firstAidData = firstAid();
  const item = firstAidData.find((aid) => aid.id.toString() === id);

  console.log(id); 

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Item not found.</Text>
      </View>
    );
  }

  const steps = item.steps;

  return (
    <View style={styles.container}>
      <View style={styles.header} className="">
        <TouchableOpacity
          onPress={() => router.replace("/(root)/(tabs)/FirstAid")}
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => {
            router.replace("/(root)/Call");
          }}
        >
          <MaterialCommunityIcons
            name="phone-outline"
            size={18}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex flex-row items-center justify-between mt-4 ">
          <Text className="text-2xl font-semibold">Steps</Text>
          <Feather
            name="bookmark"
            size={20}
            color="gray"
            className="bg-slate-100 p-2 rounded-full"
          />
        </View>
        <View style={styles.stepsContainer}>
          {steps ? ( 
            Array.isArray(steps) ? (
              
              steps.map((step, index) => (
                <View
                  key={index}
                  className="flex flex-row items-center gap-2 mb-4 bg-[#fafafa] p-4 rounded-lg "
                >
                  <View>
                    <Text className="bg-teal-600 flex rounded-full items-center text-lg text-white font-bold px-3 py-2">
                      {index + 1}
                    </Text>
                  </View>
                  <Text className="text-xl">{step}</Text>
                </View>
              ))
            ) : (
              Object.keys(steps).map((key) => (
                <View key={key}>
                  <Text className="text-xl font-bold mb-4">{key}:</Text>
                  {Array.isArray(steps[key]) ? (
                    steps[key].map((step, index) => (
                      <View
                        key={index}
                        className="flex flex-row items-center gap-2 mb-4 bg-[#fafafa] py-4  px-2 rounded-lg"
                      >
                        <View>
                          <Text className="bg-teal-600 flex rounded-full items-center text-lg text-white font-bold px-3 py-2">
                            {index + 1}
                          </Text>
                        </View>
                        <Text className="text-xl">{step}</Text>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.stepText}>
                      {steps[key]} 
                    </Text>
                  )}
                </View>
              ))
            )
          ) : (
            <Text style={styles.errorText}>No steps available.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    height: 100,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth:1,
    borderBottomColor:"#fafafa"

  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  callButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 50,
  },
  stepsContainer: {
    paddingTop: 20,
  },
  stepText: {
    fontSize: 18,
    marginBottom: 10,
  },
  stepCategory: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});

export default DetailScreen;
