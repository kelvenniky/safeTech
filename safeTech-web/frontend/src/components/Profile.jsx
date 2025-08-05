import React from 'react'
import female from "../assets/female.jpeg";
import { IoMdPhonePortrait } from 'react-icons/io';
import { CiMail } from 'react-icons/ci';
import { SlCalender } from "react-icons/sl";
import { BsGenderAmbiguous } from 'react-icons/bs';



const Profile = ({activeUser}) => {
  return (
    <div className='w-1/2 px-6 '>
         {
                    activeUser ? (
                        <div className='mt-10 grid '>
                            <div className=' grid justify-center items-center'>
                            <img
                                      src={female}
                                      alt="logo"
                                      className="h-28 w-28 rounded-full"
                                    />
                                    <div className=' mt-5 grid  justify-center'>
                                        <p className='text-md font-bold capitalize'>{activeUser.name}</p>
                                        <p className='text-xs text-center text-gray-400'>{activeUser.userType}</p>
                                    </div>
                            </div>
                                    <div className=' mt-10 grid  '>
                                        <p className='text-sm font-bold'>Mobile</p>
                                      <div className='flex justify-between'>
                                      <p className='text-md font-medium text-gray-400 '>{activeUser.contact || "none"}</p>
                                      <IoMdPhonePortrait className='text-gray-400'/>
                                      </div>
                                    </div>
                                    <div className=' mt-7 grid  '>
                                        <p className='text-sm font-bold'>Email</p>
                                      <div className='flex justify-between'>
                                      <p className='text-md font-medium text-gray-400 '>{activeUser.email || "none"}</p>
                                      <CiMail className='text-gray-400'/>
                                      </div>
                                    </div><div className=' mt-7 grid  '>
                                        <p className='text-sm font-bold'>Date of Birth</p>
                                      <div className='flex justify-between'>
                                      <p className='text-md font-medium text-gray-400 '>{activeUser.dob || "none"}</p>
                                      <SlCalender className='text-gray-400'/>
                                      </div>
                                    </div><div className=' mt-7 grid  '>
                                        <p className='text-sm font-bold'>Gender</p>
                                      <div className='flex justify-between'>
                                      <p className='text-md font-medium text-gray-400 '>{activeUser.gender || "none"}</p>
                                      <BsGenderAmbiguous className='text-gray-400'/>
                                      </div>
                                    </div>
                 </div>
                    ):(
                        <div className=' mt-4 flex items-center gap-2 border-b pb-3 pl-3'>
                        <img
                          src={female}
                          alt="logo"
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <p className='text-md font-bold'>Kelvin</p>
                            <p className='text-xs'>Online</p>
                        </div>
        </div>
                    )
                }
    </div>
  )
}

export default Profile