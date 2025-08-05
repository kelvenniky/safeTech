import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaArrowLeft, FaHeart } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import female from "../assets/female.jpeg";
import {
  IoIosAddCircle,
  IoMdCheckmarkCircleOutline,
  IoMdInformation,
  IoMdPhonePortrait,
} from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { IoInformation, IoMail } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { MdMedication, MdOutlineHistory } from "react-icons/md";
import { BsPersonHeart } from "react-icons/bs";
import { CiNoWaitingSign } from "react-icons/ci";

const GetUserDetails = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [emerg, setEmerg] = useState([]);
  const [userKey, setUserKey] = useState([]);


  const params = useParams();
  console.log("params", params);

  const fetchEachUserDetails = async () => {
    const response = await fetch(SummaryApi.getUserDetails.url, {
      method: SummaryApi.getUserDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: params?.id,
      }),
    });
    const dataResponse = await response.json();

    setData(dataResponse?.data);
    setUserKey(dataResponse?.data._id);
    console.log("userKeyii",dataResponse?.data._id)


  };

  console.log("data", data);

  useEffect(() => {
    fetchEachUserDetails();
    fetchUserEmergencies()

  }, []);

  const handleNavigation = () => {
    navigate("/users");
  };

  const fetchUserEmergencies = async () => {
    try {
      const userId = params?.id; // Ensure this is the correct user ID
      console.log("ggg", userId)
      const response = await fetch(`${SummaryApi.UserEmergency.url}/${userId}`, {
        method: 'GET', // This should be a GET request
        headers: {
          "Content-Type": "application/json",
        },
      });
  
    
  
      const dataResponse = await response.json();
      setEmerg(dataResponse?.data || []); // Set data or an empty array if no data
      console.log('emergencies', dataResponse?.data);
    } catch (error) {
      console.error("Error fetching user emergencies:", error);
    }
  };
 
  

  return (
    <div className=" rounded-md  bg-white  mx-6 my-4 p-4">
      <div className="flex items-center gap-4 mt-4 pb-4 ">
        <FaArrowLeft
          onClick={handleNavigation}
          className="text-teal-600"
          style={{ fontSize: 26 }}
        />
        <p className="text-2xl font-semibold text-teal-600">User Profile</p>
      </div>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col gap-4 w-1/3 min-h-[680px] ">
          <div className="border border-teal-200 pl-4 rounded-lg h-1/2 ">
            <div className=" flex justify-end  mr-5 mt-2">
              <BsThreeDots style={{ fontSize: 20 }} />
            </div>
            <div className="flex items-center gap-2">
              <img src={female} className="h-20 w-20 rounded-full" alt="" />
              <p className="text-md font-extrabold">Mrs. {data?.name} Afutu</p>
            </div>
            <div className="my-5 ">
              <p className="text-lg font-bold mb-3">Contact Details:</p>
              <div className="flex items-center gap-2 pb-2 ">
                <IoMdPhonePortrait className="text-teal-600" />
                <p className="text-gray-400 font-semibold">{data?.contact}</p>
              </div>
              <div className="flex items-center gap-2 pb-2 ">
                <FaPhoneAlt className="text-teal-600" />
                <p className="text-gray-400 font-semibold">{data?.econtact}</p>
              </div>
              <div className="flex items-center gap-2 pb-2 ">
                <IoMail className="text-teal-600" />
                <p className="text-gray-400 font-semibold">{data?.email}</p>
              </div>
              <div className="flex items-center gap-2 pb-2 ">
                <AiFillHome className="text-teal-600" />
                <p className="text-gray-400 font-semibold">{data?.HNO}</p>
              </div>
            </div>
          </div>
          <div className="border border-teal-200 rounded-lg h-1/2 p-4 ">
            <div className=" flex justify-end  mr-5 mt-2">
              <BsThreeDots style={{ fontSize: 20 }} />
            </div>
            <p className="text-lg font-bold mb-2 ">Emergency History logs</p>
            <div className="flex items-center gap-2 pb-2 ">
              <MdOutlineHistory className="text-teal-600" />
              <p className="text-gray-400 font-semibold">
                {" "}
                11:23pm - 08/09/2025
              </p>
            </div>
            <div className="flex items-center gap-2 pb-2 ">
              <MdOutlineHistory className="text-teal-600" />
              <p className="text-gray-400 font-semibold">
                {" "}
                02:43pm - 10/03/2024
              </p>
            </div>
            <div className="flex items-center gap-2 pb-2 ">
              <MdOutlineHistory className="text-teal-600" />
              <p className="text-gray-400 font-semibold">
                {" "}
                9:56am - 02/01/2024
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full min-h-[680px] ">
          <div className="border border-teal-200 rounded-lg h-1/3 pl-4 ">
            <div className=" flex justify-end  mr-5 mt-2">
              <BsThreeDots style={{ fontSize: 20 }} />
            </div>
            <p className="text-lg font-bold mb-3">Overview:</p>
            <div className="flex mt-4  gap-32">
              <div className="">
                <div className=" text-gray-400 text-sm font-semibold">
                  Gender:
                </div>
                <div className="text-lg font-bold ">{data?.gender}</div>
              </div>
              <div className="">
                <div className=" text-gray-400 text-sm font-semibold">
                  Date of Birth:
                </div>
                <div className="text-lg font-bold ">{data?.dob}</div>
              </div>
              <div className="">
                <div className=" text-gray-400 text-sm font-semibold">
                  Em-Conatct:
                </div>
                <div className="text-lg font-bold ">{data?.econtact}</div>
              </div>
              <div className="">
                <div className=" text-gray-400 text-sm font-semibold">
                  Em-Name:
                </div>
                <div className="text-lg font-bold ">{data?.NOK}</div>
              </div>
            </div>
          </div>
          <div className="border border-teal-200 rounded-lg  h-5/6  ">
            <div className=" flex justify-end  mr-5 mt-2">
              <BsThreeDots style={{ fontSize: 20 }} />
            </div>
            <p className="text-lg font-bold mb-3 ml-4">Medical Background:</p>
            <div className="flex mx-4 gap-2 ">
              <div className="border border-gray-100 w-1/3 p-1 rounded-lg min-h-[200px] ">
                <div className="flex gap-2 items-center">
                  <div className="bg-teal-200 rounded-full p-1 ">
                    <MdMedication
                      style={{ fontSize: 26 }}
                      className="text-teal-600"
                    />
                  </div>
                  <p className=" text-gray-400 text-md font-semibold">
                    Sickling
                  </p>
                </div>
                <div className="pl-8 mt-5">
                  <p className="font-semibold">{data?.sickling}</p>
                </div>
              </div>
              <div className="border border-gray-100 w-1/3  p-1 rounded-lg min-h-[200px]  ">
                <div className="flex gap-2 items-center">
                  <div className="bg-teal-200 rounded-full p-1 ">
                    <BsPersonHeart
                      style={{ fontSize: 20 }}
                      className="text-teal-600"
                    />
                  </div>
                  <p className=" text-gray-400 text-md font-semibold">
                    Allergies
                  </p>
                </div>
                <div className="pl-8 mt-5">
                  {data && data.allergies ? (
                    data.allergies.map((allergy, index) => (
                      <p key={index} className="font-semibold">
                        {index + 1}. {allergy.trim()}
                      </p>
                    ))
                  ) : (
                    <p className="font-semibold">No allergies listed.</p>
                  )}
                </div>
              </div>
              <div className="border border-gray-100 w-1/3  p-1 rounded-lg min-h-[200px]  ">
                <div className="flex gap-2 items-center">
                  <div className="bg-teal-200 rounded-full p-1 ">
                    <FaHeart
                      style={{ fontSize: 20 }}
                      className="text-teal-600"
                    />
                  </div>
                  <p className=" text-gray-400 text-md font-semibold">
                    Conditions
                  </p>
                </div>
                <div className="pl-8 mt-5">
                  {data && data.conditions ? (
                    data.conditions.map((condition, index) => (
                      <p key={index} className="font-semibold">
                        {index + 1}. {condition.trim()}
                      </p>
                    ))
                  ) : (
                    <p className="font-semibold">No conditions listed.</p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex mx-4 gap-2">
              <div className="border border-gray-100 w-3/4 p-1 mt-4 rounded-lg min-h-[160px] ">
                <div className="flex gap-2 items-center">
                  <div className="bg-teal-200 rounded-full p-1 ">
                    <IoIosAddCircle
                      style={{ fontSize: 20 }}
                      className="text-teal-600"
                    />
                  </div>
                  <p className=" text-gray-400 text-md font-semibold">
                    Additional Information
                  </p>
                </div>
                <div className="pl-8 mt-5">
                  <div className="font-semibold">
                    Allergies occur when your immune system mistakenly triggers
                    an allergic reaction to an allergen. Allergic reaction
                    symptoms include congestion, watery eyes, a runny nose,
                    vomiting and, in severe cases, anaphylaxis.
                  </div>
                </div>
              </div>
              <div className="border border-gray-100 w-1/4 p-1 mt-4 rounded-lg min-h-[160px] ">
                <div className="flex gap-2 items-center">
                  <div className="bg-teal-200 rounded-full p-1 ">
                    <CiNoWaitingSign
                      style={{ fontSize: 20 }}
                      className="text-teal-800"
                    />
                  </div>
                  <p className=" text-gray-400 text-md font-semibold">
                    Blood Group
                  </p>
                </div>
                <div className="pl-8 mt-5">
                  <p className="font-semibold text-sm">{data?.blood}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetUserDetails;
