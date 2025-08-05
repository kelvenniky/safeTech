import React from 'react'
import Logo from './Logo'
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../../store/userslice';




const Header = ({ currentPage }) => {

  const navigate = useNavigate()

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()

  const handleLogout= async()=>{
    const  fetchData = await fetch(SummaryApi.logout_user.url,{
      method:SummaryApi.logout_user.method,
      credentials:"include"
    })
    const data = await fetchData.json()
    if(data.success){
      navigate('/login')
      toast.success(data.message)
      dispatch(setUserDetails(null))
    }
    if(data.error){
      toast.error(data.message)
    }

  }
  return (
    <header className='h-16 '>
      <div className='container h-full border-b border-slate-500 flex items-center mx-auto px-4 justify-between'>
      <h1 className='text-xl font-bold'>{currentPage}</h1>

      

       
        <div className='flex items-center gap-7'>
     

          <div>
            {
              user?._id ?(
                <button className='px-3 bg-teal-600 py-1 text-white hover:bg-teal-700 rounded-full' onClick={handleLogout}>Logout</button>

              ):
              (
                <Link to={"/login"}className='px-3 bg-teal-600 py-1 text-white hover:bg-teal-700 rounded-full'>Login</Link>

              )

            }
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header