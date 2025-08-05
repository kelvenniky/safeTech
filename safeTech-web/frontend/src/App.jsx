import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common'
import Context from './context'
import {useDispatch} from 'react-redux'
import { setUserDetails } from '../store/userslice'

const App = () => {

  const dispatch = useDispatch()

  const fetchUserDetails =async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method:SummaryApi.current_user.method,
      credentials:'include'
    })
    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }
   
    useEffect(()=>{
      fetchUserDetails()
    },[])
  
  
    return (
      <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
      <ToastContainer/>
      <main >
        <Outlet/>
      </main>
      </Context.Provider>
      </>
      
    )
  }
  
  export default App