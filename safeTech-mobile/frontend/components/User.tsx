import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_BASE_URL from "@/common/ApiUrl";
import { MaterialIcons } from "@expo/vector-icons";

interface UserProps {
  item: {
    _id: string;
    name: string;
    email: string;
  };
}

interface LastMessage{
  message: string
}



const User: React.FC<UserProps> = ({ item }) => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState<LastMessage | null>(null);
  const navigation = useNavigation();

  const fetchMessages = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        console.log("no userId");
        return;
      }

      const senderId = userId;
      const receiverId = item._id;

      const response = await fetch(
        `${API_BASE_URL}/fetch-messages/${senderId}/${receiverId}`
      );
      const data = await response.json();

      if (response.ok) {
        setMessages(data);

      } else {
        console.log("Error showing messages");
      }
    } catch (error) {
      console.log("Error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      setLastMessage(messages[messages.length - 1]);
    }
  });



  return (
    <Link
      href={{
        pathname: "/Chatroom",
        params: { name: item?.name, receiverId: item?._id },
      }}
      asChild
    >
    <TouchableOpacity className="border  border-[#DEDEDE] flex justify-center items-center rounded-xl gap-2 p-4 ">
            <MaterialIcons name="wechat" size={38} color="#EF3649" />
            <Text className="text-lg font-semibold ">Chat</Text>
          </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 10,
    borderBottomColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    marginHorizontal: 15,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  cont: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 17,
    fontWeight: "500",
  },
  userEmails: {
    fontSize: 12,
    color: "gray",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
    flexWrap: "wrap",
    width: 330,
    paddingBottom: 5,
  },
  gif: {
    width: 40,
    height: 40,
  },
});

export default User;
