import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Vibration,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSocketContext } from "@/SocketContext";
import API_BASE_URL from "@/common/ApiUrl";
import EmojiSelector from "react-native-emoji-selector";

const Chatroom: React.FC = () => {
  const navigation = useNavigation();
  const { name, receiverId } = useLocalSearchParams<Record<string, any>>();
  const [userD, setUserD] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const { socket } = useSocketContext();
  const [showEmojiSeclector, setShowEmojiSelector] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null); 


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleContentSizeChange = () => {
      scrollToBottom();
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="flex items-center gap-5">
            <Ionicons name="arrow-back" size={24} color="black" />
            <View>
              <Text key={name}>{name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ),
    });
  }, [navigation, name]);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    const trimmedToken = token ? token.trim() : null;

    if (!trimmedToken) {
      console.error("Token is undefined or null");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/userdata`, {
        token: trimmedToken,
      });
      setUserD(res.data.data);
      setUserId(res.data.data._id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const listenMessages = () => {
    const { socket } = useSocketContext();

    useEffect(() => {
      socket?.on("newMessage", (newMessage: { shouldShake: boolean }) => {
        newMessage.shouldShake = true;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => socket?.off("newMessage");
    }, [socket]);
  };

  listenMessages();

  const sendMessage = async (senderId: string | null, receiverId: string) => {
    Vibration.vibrate()
    if (!socket) {
      console.error("Socket is not available");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/sendMessage`, {
        senderId,
        receiverId,
        message,
      });
      socket.emit("sendMessage", { senderId, receiverId, message });
      setMessage("");
      setTimeout(() => {
        fetchMessages();
      }, 100);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const senderId = userId;
      const response = await axios.get(`${API_BASE_URL}/messages`, {
        params: { senderId, receiverId },
      });

      setMessages(response.data);
    } catch (error) {
      console.log("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [userId, receiverId]);

  const profileInitial = name.charAt(0).toUpperCase();

  const getRandomColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash += name.charCodeAt(i);
    }
    const r = (hash % 256);
    const g = ((hash * 2) % 256);
    const b = ((hash * 3) % 256);
    return `rgb(${r + 128}, ${g + 128}, ${b + 128})`; 
  };

  const backgroundColor = getRandomColor(name); 




  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -25 : 0}
    >
      <View className="flex justify-end h-32 bg-white border-b-2 border-gray-200">
        <View className="flex gap-7 ml-2 items-center flex-row mb-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome5 name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
           
          <View className="flex-row items-center gap-2">
          <View className="shadow-sm" style={[styles.profileImage, { backgroundColor }]}>
                  <Text className=" font-bold ">{profileInitial}</Text>
                  </View>
            <Text className="text-lg capitalize  font-bold">{name}</Text>
          </View>
        </View>
      </View>
      <ScrollView  ref={scrollViewRef} contentContainerStyle={{flexGrow:1}} onContentSizeChange={handleContentSizeChange}>
      {messages?.map((item, index) => (
        <Pressable
            key={index}
            className='flex '
            style={[
                item?.senderId?._id === userId
                    ? {
                        alignSelf: "flex-end",
                        backgroundColor: "#DCF8C6",
                        padding: 8,
                        maxWidth: "60%",
                        borderRadius: 7,
                        margin: 10,
                    }
                    : {
                        alignSelf: "flex-start",
                        backgroundColor: "white",
                        padding: 8,
                        margin: 10,
                        borderRadius: 7,
                        maxWidth: "60%",
                        
                    },
            ]}
        >
            <Text style={{ fontSize: 13, fontWeight:'500',  textAlign: "left" }}>{item?.message}</Text>
            <Text style={{    textAlign: "right",
                    fontSize: 9,
                    color: "gray",
                    marginTop: 5,}} className=''  >
                {new Date(item?.timeStamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </Pressable>
    ))}
      </ScrollView>
      <View className="flex-row items-center px-[10px] py-[10px] border-t border-t-gray-300 mb-[25px]">
        <Entypo name="camera" size={24} color="gray" className="mr-[7px]" />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message here..."
          placeholderTextColor="#9ca3af"
          
        />
        <View className="flex flex-row items-center gap-[7px] mx-2">
          <Feather name="mic" size={24} color="gray" className="" />
        </View>

        <TouchableOpacity
          className=" bg-gray-600 py-2 px-3 rounded-2xl "
          onPress={() => sendMessage(userId, receiverId)}
        >
          <Text className="text-white font-bold">Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chatroom;

const styles = StyleSheet.create({
    profileImage:{
        width: 40,
        height: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        borderColor:"gray",
      
      },
})

