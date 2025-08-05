import React, { useState, useEffect } from "react";
import * as GoogleGenerativeAI from "@google/generative-ai";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
} from "react-native";
import * as Speech from "expo-speech";
import { Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import FlashMessage, { showMessage } from "react-native-flash-message";

const GeminiChat = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showStopIcon, setShowStopIcon] = useState(false);

  const API_KEY = "AIzaSyDtOpz2kPCWVtUzikfucc03ucx3-K9rGOY"; 

  useEffect(() => {
    const startChat = async () => {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = "hello! ";
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
    
      setMessages([{ text, user: false }]);
    };
    startChat();
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return; 

    setLoading(true);
    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(userInput);
      const response = result.response;
      const text = response.text();

      if (text) {
        setMessages((prevMessages) => [...prevMessages, { text, user: false }]);
        
        setShowStopIcon(true);
      }
    } catch (error) {
      console.error("Error generating response:", error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else if (messages.length > 0) {
      Speech.speak(messages[messages.length - 1].text);
      setIsSpeaking(true);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setIsSpeaking(false);
    setShowStopIcon(false);
  };

  const renderMessage = ({ item, index }) => (
    <View
      className="bg-blue-200"
      style={styles.messageContainer}
      key={`${item.text}-${index}`}
    >
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <View className="mt-5" style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            {!item.user && (
              <View className="mx-3 flex-row items-center gap-2">
                <Image
                  source={require("../assets/images/juin1.png")}
                  style={styles.gife}
                  resizeMode="contain"
                />
                <Text>Assistant</Text>
                <View className=" border-gray-400 border  p-1 rounded-2xl ">
                  <Text
                    className="text-xs font-semibold "
                    style={{ color: "#43A6C6" }}
                  >
                    Juine
                  </Text>
                </View>
              </View>
            )}


            <View
              style={[
                styles.messageContainer,
                item.user ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.user ? styles.userText : styles.aiText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />
      <View
        className="border-t border-gray-200 bg-white mb-2  "
        style={styles.inputContainer}
      >
        <TouchableOpacity style={styles.micIcon} onPress={toggleSpeech}>
          {isSpeaking ? (
            <FontAwesome name="microphone-slash" size={24} color="white" />
          ) : (
            <Feather name="mic" size={24} color="gray" className="" />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type to Juine your assistant"
          onChangeText={setUserInput}
          value={userInput}
          style={{
            flex: 1,
            height: 45,
            borderWidth: 1,
            borderColor: "#dddddd",
            borderRadius: 20,
            paddingHorizontal: 10,
          }}
          placeholderTextColor="grey"
        />
        <Pressable
         style={{backgroundColor:"#43A6C6"}}
          className="  py-2 px-3  ml-5 rounded-full "
          onPress={sendMessage}
        >
          <Octicons name="arrow-right" size={24} color="white" />
        </Pressable>
    
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0F0F0" },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", padding: 10 },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    color: "white",
  },
  micIcon: {
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  stopIcon: {
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 3,
  },
  sendButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 8,
    marginVertical: 10,
    maxWidth: "90%",
    marginHorizontal: 12,
  },
  userMessage: {
    backgroundColor: "#43A6C6",
    alignSelf: "flex-end",
    borderRadius: 12,
    marginRight: 5,
  },
  aiMessage: {
    backgroundColor: "white", 
    alignSelf: "flex-start",
  },
  userText: {
    color: "white", 
    fontSize: 16,
  },
  aiText: {
    color: "black", 
    fontSize: 16,
  },

  gife: {
    width: 30, 
    height: 30, 
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GeminiChat;
