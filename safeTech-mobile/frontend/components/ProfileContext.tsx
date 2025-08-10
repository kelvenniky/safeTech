import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import API_BASE_URL from "@/common/ApiUrl";

interface ProfileContextProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<any>(null);

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

export const ProfileContextProvider: React.FC<ProfileContextProviderProps> = ({
  children,
}) => {
  const [profile, setProfile] = useState<any>(null);

  async function getData() {
    const token = await AsyncStorage.getItem("token");
    const trimmedToken = token ? token.trim() : null;

    if (!trimmedToken) {
      console.error("Token is undefined or null");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/userdata`, { token: trimmedToken });
      const data = res.data.data;

      setProfile(data);
      console.log('meee', profile)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []); // Added the empty dependency array here

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};


