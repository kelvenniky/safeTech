import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import SummaryApi from "../common";
import { StoreContext } from "./StoreContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const [token, setToken] = useState('');
    const [userDetails, setUserDetails] = useState([]);


     const fetchUserDetails =async()=>{
     const tokenFromStorage = localStorage.getItem('token');
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
          const dataResponse = await fetch(SummaryApi.current_user.url,{
            method:SummaryApi.current_user.method,
            credentials:'include'

          })
          const response = await dataResponse.json()
          setUserDetails(response?.data || [] )
    
  }
}
   
     useEffect(() => {
        fetchUserDetails();
    }, []); // Fetch data on component mount

   



    useEffect(() => {
        // Check authentication when userDetails changes
        if (userDetails) {
            setAuthUser(userDetails);
            console.log("User details found:", userDetails.data);
            connectSocket(userDetails.data);
        } else {
            console.log("No user details found.");
        }
    }, [userDetails]);

    const connectSocket = (userDetails) => {
        if (!userDetails || socket?.connected) return;

        console.log("Connecting to socket for user ID:", userDetails._id);
        const newSocket = io(SummaryApi, {
            query: {
                userId: userDetails._id,
            },
        });

        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket connected successfully:", newSocket.id);
        });

        newSocket.on("getOnlineUsers", (userIds) => {
            console.log("Received online users:", userIds);
            setOnlineUsers(userIds);
        });

        newSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        // Clean up on unmount
        return () => {
            newSocket.disconnect();
            console.log("Socket disconnected.");
        };
    };

    // Clean up the socket when the component unmounts or userDetails changes
    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
                console.log("Socket cleaned up on component unmount.");
            }
        };
    }, [socket]);

    const value = {
        authUser,
        onlineUsers,
        socket,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};