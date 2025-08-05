import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import firstAid from "../../common/firstaid";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

interface FirstAidItemProps {
  id: number;
  title: string;
  logo: string;
}

const FirstAid: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<FirstAidItemProps[]>(
    firstAid()
  );

  useEffect(() => {
    const filtered = firstAid().filter((item: FirstAidItemProps) =>
      item.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [userInput]);

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex mx-4 pb-2">
        <View className=" flex flex-row justify-between items-center  gap-6 mb-5">
          <View className="flex flex-1">
            <TextInput
              placeholder="  Search here ..."
              placeholderTextColor={"gray"}
              onChangeText={(text) => setUserInput(text)}
              className=" border border-red-500 py-4 rounded-lg pl-10 relative  "
              style={{ fontSize: 17 }}
            />
            <FontAwesome
              name="search"
              size={22}
              color="#b91c1c"
              className="absolute top-3 left-3"
            />
          </View>
        </View>
        
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/DetailScreen/[id]",
              params: { id: item.id.toString() },
            }}
            asChild
          >
            <TouchableOpacity
              className="flex gap-2 mx-3 rounded-xl"
              style={styles.itemContainer}
            >
              <Image
                source={
                  typeof item.logo === "string" ? { uri: item.logo } : item.logo
                }
                className="w-12 h-12 border-2 border-gray-100 shadow-sm rounded-full p-1 "
              />
              <Text className="font-bold text-md text-gray-600">
                {item.title}
              </Text>
            </TouchableOpacity>
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 1,
    gap: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 11,
    width: "45%",
    marginVertical: 8,
    shadowColor: "#000",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default FirstAid;
