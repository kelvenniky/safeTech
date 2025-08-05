import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { HiDocumentReport, HiOutlineViewList } from 'react-icons/hi';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import { MdOutlineMessage, MdOutlinePendingActions } from 'react-icons/md';
import { VscAccount } from "react-icons/vsc";
import { GoPerson } from 'react-icons/go';
import { IoSettingsOutline } from 'react-icons/io5';
import { SiGooglemaps } from 'react-icons/si';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import admin from '../assets/admin.gif'
import amb from '../assets/ambulance.png'
import { StoreContext } from '../context/StoreContext';
import SummaryApi from '../common';


const Home = () => {

    const user = useSelector(state => state?.user?.user)
    const [chat, setChat] = useState(false)
    const {token} = useContext(StoreContext)

    const [activeIcon, setActiveIcon] = useState(null);
    const location = useLocation();

    const handleClick = (icon) => {
        setActiveIcon(icon);
    };

    useEffect(() => {
        // Set chat to true if on the messages page
        if (location.pathname === '/messages') {
            setChat(true);
        } else {
            setChat(false); // Reset chat when leaving messages page
        }
    }, [location.pathname]); // Run effect when pathname changes

    // Mapping of paths to page names
    const pageNames = {
        '/overview': 'Overview',
        '/actions': 'Actions',
        '/messages': 'Messages',
        '/users': 'All Users',
        '/maps': 'Maps',
        '/reports': 'Reports',
        '/settings': 'Settings',
    };

    // Get current page name based on the location
    const currentPageName = pageNames[location.pathname] || 'Home';

    if(currentPageName ==='messages'){
        setChat(true)
    }

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      setToken('')
    }
    if(data.error){
      toast.error(data.message)
    }
}



    return (
       <>
       {
        !chat ?(
            <div className='md:flex hidden'>
            <aside className='bg-white h-screen px-5   shadow-md shadow-slate-300 w-full flex flex-col justify-between max-w-80 '>
    <div className='my-5 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
            <img src={amb} className='w-14' alt="" />
            <p className='text-2xl font-semibold  text-red-500'>EmerGenZ</p>
        </div>
        <HiOutlineViewList style={{ fontSize: 25 }} className='text-gray-500' />
    </div>
    <div className='mt-10'>
        <Link to={'/overview'} className='flex items-center gap-5 mb-5' onClick={() => handleClick('overview')}>
            <TbLayoutDashboardFilled style={{ fontSize: 35, color: activeIcon === 'overview' ? 'teal' : 'gray' }} />
            <p className='text-lg font-bold'>Overview</p>
        </Link>
        <Link to={'/actions'} className='flex items-center gap-5 mb-7' onClick={() => handleClick('actions')}>
            <MdOutlinePendingActions style={{ fontSize: 35, color: activeIcon === 'actions' ? 'teal' : 'gray' }} />
            <p className='text-lg font-bold'>Actions</p>
        </Link>
        <Link to={'/messages'} className='flex items-center gap-5 mb-7' onClick={() =>{ handleClick('messages') , setChat(true)}}>
            <MdOutlineMessage style={{ fontSize: 35, color: activeIcon === 'messages' ? 'teal' : 'gray' }} />
            <p className='text-lg font-bold'>Messages</p>
        </Link>
        <Link to={'/users'} className='flex items-center gap-5 mb-7' onClick={() => handleClick('users')}>
            <GoPerson style={{ fontSize: 35, color: activeIcon === 'users' ? 'teal' : 'gray' }} />
            <p className='text-lg font-bold'>All Users</p>
        </Link>
        <Link to={'/maps'} className='flex items-center gap-5 mb-7' onClick={() => handleClick('maps')}>
            <SiGooglemaps style={{ fontSize: 35, color: activeIcon === 'maps' ? 'teal' : 'gray' }} />
            <p className='text-lg font-bold'>Maps</p>
        </Link>
        <Link to={'/reports'} className='flex items-center gap-5 mb-7' onClick={() => handleClick('reports')}>
            <HiDocumentReport style={{ fontSize: 35, color: activeIcon === 'reports' ? 'teal' : 'gray' }} />
            <p className='text-lg font-bold'>Reports</p>
        </Link>
        
        {/* New Link at the Bottom */}
        
    </div>
    <Link  className='flex justify-between items-center gap-2 mt-auto mb-5' onClick={() => handleClick('help')}>
            <img src={admin} alt="" className='h-10 w-10 p-2 rounded-full border border-teal-600 shadow-md shadow-slate-400' />
           <div>
           <p className='text-md '>{user?.email}</p>
           <p className='text-md capitalize '>{user?.name}</p>
           </div>
                <div>
                    {
                      user ?(
                        <button className='px-3 bg-teal-600 py-1 text-white hover:bg-teal-700 rounded-full' onClick={handleLogout}>Log out</button>
        
                      ):
                      (
                        <Link to={"/login"}className='px-3 bg-teal-600 py-1 text-white hover:bg-teal-700 rounded-full'>Login</Link>
        
                      )
        
                    }
                  </div>
        </Link>
</aside>
            <main className='w-full h-full'>
                <Outlet />
            </main>
        </div>
        ):(
            <div className='md:flex hidden'>
            <aside className=' h-screen px-5   shadow-md shadow-slate-300 w-full flex flex-col justify-between max-w-20'>
    <div className='my-5 flex items-center justify-between'>
        <div className='flex items-center'>
        </div>
        <HiOutlineViewList style={{ fontSize: 25 }} className='text-gray-500' />
    </div>
    <div className='mt-10'>
        <Link to={'/overview'} className='flex items-center gap-5 mb-5' onClick={() =>{ handleClick('overview'), setChat(false)}}>
            <TbLayoutDashboardFilled style={{ fontSize: 35, color: activeIcon === 'overview' ? 'white' : 'gray' }} />
        </Link>
        <Link to={'/actions'} className='flex items-center gap-5 mb-7' onClick={() => {handleClick('actions'), setChat(false)}}>
            <MdOutlinePendingActions style={{ fontSize: 35, color: activeIcon === 'actions' ? 'white' : 'gray' }} />
        </Link>
        <Link to={'/messages'} className='flex items-center gap-5 mb-7' onClick={() =>{ handleClick('messages') , setChat(true)}}>
            <MdOutlineMessage style={{ fontSize: 35, color: activeIcon === 'messages' ? 'teal' : 'gray' }} />
        </Link>
        <Link to={'/users'} className='flex items-center gap-5 mb-7' onClick={() => {handleClick('users'),  setChat(false)}}>
            <GoPerson style={{ fontSize: 35, color: activeIcon === 'users' ? 'white' : 'gray' }} />
        </Link>
        <Link to={'/maps'} className='flex items-center gap-5 mb-7' onClick={() =>{ handleClick('maps'), setChat(false)}}>
            <SiGooglemaps style={{ fontSize: 35, color: activeIcon === 'maps' ? 'white' : 'gray' }} />
        </Link>
        <Link to={'/reports'} className='flex items-center gap-5 mb-7' onClick={() =>{ handleClick('reports'), setChat(false)}}>
            <HiDocumentReport style={{ fontSize: 35, color: activeIcon === 'reports' ? 'white' : 'gray' }} />
        </Link>
        
        {/* New Link at the Bottom */}
        
    </div>
    <Link to={'/help'} className='flex items-center gap-2 mt-auto mb-5' onClick={() => handleClick('help')}>
            <img src={admin} alt="" className='h-10 w-10 p-2 rounded-full border border-teal-600 shadow-md  shadow-slate-400' />
           <div className='hidden'>
           <p className='text-md '>{user?.email}</p>
           <p className='text-md  '>{user?.name}</p>

           </div>
        </Link>
</aside>
            <main className='w-full h-full'>
                <Outlet />
            </main>
        </div>
        )
       }
       </>
    );
};

export default Home;