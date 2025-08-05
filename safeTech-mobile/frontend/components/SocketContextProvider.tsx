import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<any>(null);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [userI, setUserI] = useState("");

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const token = AsyncStorage.getItem("token");

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("userId");
    console.log(user);

    const trimmedToken = token ? token.trim() : null;

    setLoggedIn(!!trimmedToken);

    if (!trimmedToken) {
      console.error("Token is undefined or null");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://172.20.10.4:5001/userdata", {
        token: trimmedToken,
      });
      const newUserId = res.data.data._id;

      setUserData(res.data.data);
      setUserI(newUserId);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchDataAndConnectSocket = async () => {
      await getData(); 
      const token = AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("userId");

      if (await token) {
        console.log("Attempting to connect socket with userId:", user);
        const socket = io("http://172.20.10.4:3000", {
          query: { userId: user },
        });

        if (socket) {
          setSocket(socket);
          console.log("Socket ID:", socket.id);
        } else {
          console.log("not available");
        }

        socket.on("connect", () => {
          console.log("Socket connected:", socket.id);
        });

        return () => {
          socket.close();
          console.log("Socket closed");
        };
      }
    };

    fetchDataAndConnectSocket();
  }, []); 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
