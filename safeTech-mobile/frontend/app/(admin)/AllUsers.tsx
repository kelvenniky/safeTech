import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Link } from "expo-router";

interface UserProps {
  item: {
    _id: string;
    name: string;
    email: string;
  };
}

const AllUsers: React.FC<UserProps> = ({ item }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const profileInitial = item.name.charAt(0).toUpperCase();

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

  const backgroundColor = getRandomColor(item.name); 



  return (
    <Link className="mt-5 "
      href={{
        pathname: "/Chatroom",
        params: { name: item?.name, receiverId: item?._id },
      }}
      asChild
    >
      <TouchableOpacity style={styles.userItem}>
        <View className="shadow-sm" style={[styles.profileImage, { backgroundColor }]}>
        <Text className=" capitalize font-bold">{profileInitial}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.cont}>
            <Text className="capitalize" style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmails}>{currentTime}</Text> 
          </View> 
          <Text style={styles.userEmail}>
           hey there, text me
          </Text>
        </View>
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
  profileImage:{
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  
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
  gif: {
    width: 40,
    height: 40,
  },
});

export default AllUsers;