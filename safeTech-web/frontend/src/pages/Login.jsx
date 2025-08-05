import React, { useContext, useState } from 'react'
import loginIcon from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';




const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState([])
    const [data, setData] = useState({
        email:"",
        password:"",
    })

const navigate = useNavigate()
const {fetchUserDetails} = useContext(Context)

    const handleOnchange=(e)=>{
        
        const {name,value} = e.target
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials:"include",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })

          const mydata = await dataResponse.json()
          setUserData(mydata?.data || [])
          console.log("product data",mydata)


          if(mydata.success){
            localStorage.setItem("token", mydata.data);
            toast.success(mydata.message)
            navigate('/')
            fetchUserDetails()
          }

          if(mydata.error){
            toast.error(mydata.message)
          }
    
    

    }


  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
            <div className='bg-white  p-5 w-full max-w-sm  mx-auto '>
                <div className='w-20 h-20 mx-auto'>
                    <img src={loginIcon} alt="login icon" />
                </div>
                <form onSubmit={handleSubmit} className='pt-6  flex flex-col gap-2' >
                    <div className='grid'>
                        <label>Email : </label>
                        <div className='bg-slate-100 p-2'>
                        <input 
                        type="email"
                         placeholder='enter email'
                         name='email'
                         value={data.email}
                          onChange={handleOnchange}
                           className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>
                    <div>
                        <label>Password : </label>
                        <div className='bg-slate-100 p-2 flex'>
                        <input 
                        type={showPassword? "text":"password"}
                         placeholder='enter password'
                         name='password'
                         value={data.password}
                          onChange={handleOnchange}
                          className='w-full h-full outline-none bg-transparent' />
                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((preve)=>!preve)}>
                            <span>
                                {showPassword
                                ?
                                (
                                    <FaEyeSlash />
                                ):(
                                    <FaEye />
                                )
                            }
                               
                               

                             </span>
                        </div>
                        </div>
                        <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-teal-600' >
                            Forgot password ?
                        </Link>
                    </div>
                    <button className='bg-teal-600 text-white hover:bg-teal-700 w-full px-6 py-2 rounded-full hover:scale-110 transition-all mx-auto block mt-6 max-w-[150px]'>Login</button>
                </form>

                <p className='my-2'>Dont have acount ? <Link to={'/signUp'} className='text-teal-700 hover:underline hover:text-teal-700'>Sign Up</Link></p>
            </div>
        </div>
    </section>
)
}

export default Login