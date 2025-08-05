import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const connectSocket = async () => {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const newSocket = io('http://172.20.10.4:3000', {
          query: { userId },
        });

        setSocket(newSocket);
        console.log("Socket established:"); // Log the new socket instance

        // Clean up on unmount
        return () => {
          newSocket.close();
        };
      } else {
        if (socket) {
          socket.close();
          setSocket(null);
        }
      }
    };

    connectSocket();
  }, []); // Ensure dependencies are correctly set

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};