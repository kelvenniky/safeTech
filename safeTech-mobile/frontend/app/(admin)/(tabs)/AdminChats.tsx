import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, router, useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import User from "@/components/User";
import API_BASE_URL from "@/common/ApiUrl";


interface User {
  _id: string; 
  name: string;
  email: string; 
}

interface UserData {
  name: string;
  email: string;
  _id: string;
}

interface UserDataResponse {
  data: UserData;
}

interface UsersResponse extends Array<User> {}

const AdminChats = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState<string | null>(null); 
  const [users, setUsers] = useState<User[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View className="flex-row gap-32 items-center">
          <View>
          <Image
            source={require("../../../assets/images/person.png")}    
            style={styles.gif}
            resizeMode="contain" 
            className="relative"
          />
          <View className="bg-red-400 rounded-full h-2 w-2 absolute left-11"></View>
          </View>
          <Text className="text-xl font-semibold">Messages</Text>,
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerIcons}>
        <Entypo className="mr-3" name="new-message" size={24} color="black" />        </View>
      ),
    });
  }, [navigation]);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
      const trimmedToken = token ? token.trim() : null;

      if (!trimmedToken) {
        console.error("Token is missing");
        setError("Please log in."); 
        return;
      }

      const response = await axios.post<UserDataResponse>(
        `${API_BASE_URL}/userdata`,
        { token: trimmedToken }
      );
      setUserData(response.data.data);
      setUserId(response.data.data._id);
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data.");
    } finally {
    }
  }

  const fetchUsers = async () => {
    try {
      if (!userId) {
        console.log('errroooeeeerrrr')
        return;
      }
      const response = await axios.get<UsersResponse>(
        `${API_BASE_URL}/get-users/${userId}`
      );
      setUsers(response.data);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      setError("Failed to load users.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUsers();
    }
  }, [userId]);



  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!userId) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.infoText}>Please log in to see your chats.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView  className="bg-white h-full">
         <View className="flex-row  bg-white justify-between pb-5 h-20 border-b-2 border-gray-200  items-end">
            <View className="flex-row gap-20 items-center">
                <View>
               <TouchableOpacity   >
               <Image
                
                source={require("../../../assets/images/adminn.png")}    
                style={styles.gif}
                resizeMode="contain" 
                className="relative"
              />
               </TouchableOpacity>
                <View className="bg-red-400 rounded-full h-2 w-2 absolute left-11"></View>
                </View>
                <Text className="text-xl font-semibold">Your Mesaages</Text>,
              </View>
              <TouchableOpacity  onPress={()=>router.replace('/(root)/(tabs)/Chats')}  style={styles.headerIcons}>
              <Entypo className="mr-3" name="new-message" size={24} color="black" />        </TouchableOpacity>
            
            </View>
      <View className="mt-9">
      <FlatList
        data={users}
        renderItem={({ item }) => <User item={item} />}
        keyExtractor={(item) => item._id}
      />

       <Link className="mt-5"
           href={'/(root)/Health'}
            asChild
          >
            <TouchableOpacity style={styles.userItem}>
              <Image
                             source={require("../../../assets/images/juin1.png")}
                             style={styles.gife}
                             resizeMode="contain"
                           />
              <View style={styles.textContainer}>
                <View style={styles.cont}>
                  <Text style={styles.userName}>Juine</Text>
                  <Text style={styles.userEmails}>    {new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}</Text> Current time aligned to the right
                </View>
                <Text style={styles.userEmail}>
                  I dont know what you are up to, but you have to stay healthy. Lets see how you can do that
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  
  headerTitle: {
    fontWeight: "500",
    fontSize: 18,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 16,
  },
  infoText: {
    textAlign: "center",
  },
  gif: {
    width: 30, 
    height: 30, 
    marginLeft:15
    
  },
  gife: {
    width: 45, 
    height: 45 ,
    
  },
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
    marginBottom:4
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
    flexWrap: 'wrap',
    width: 330,
    paddingBottom: 5,
  },
});



export default AdminChats;
