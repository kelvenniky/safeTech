import { createContext, useEffect, useState } from "react";
import axios from "axios"; // Make sure to import axios
import SummaryApi from "../common";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [token, setToken] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const [userId, setUserId] = useState('');



    const url = "http://localhost:8080";


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
          setUserId(response?.data._id)
    
  }
}
   
     useEffect(() => {
        fetchUserDetails();
    }, []); // Fetch data on component mount

    useEffect(() => {
        console.log('Updated userData:', userDetails);
        console.log('userId:', userId);

    }, [userDetails]);




    const contextValue = {
        url,
        token,
        setToken,
        userDetails,
        userId
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;





