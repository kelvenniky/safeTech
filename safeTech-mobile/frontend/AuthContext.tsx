import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<any>(null);

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [authUser, setAuthUser] = useState<any>(null); // Initialize to null
  const [loading, setLoading] = useState(true); // Add a loading state

  async function getData() {
    setLoading(true); // Start loading
    try {
      const token = await AsyncStorage.getItem('token');
      const trimmedToken = token ? token.trim() : null;

      if (!trimmedToken) {
        console.warn('Token is undefined or null');
        setLoading(false);
        return;
      }

      const response = await axios.post('http://172.20.10.4:5001/userdata', { token: trimmedToken });

      console.log("User data response:", response.data); // Log the entire response

      setAuthUser(response.data.data); // Make sure this matches the API response
      setUserId(response.data.data._id); // Make sure this matches the API response
   

    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const contextValue = {
    token,
    userId,
    setToken,
    setUserId,
    authUser,
    setAuthUser,
    loading, // Expose the loading state
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };