import React, { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaAngleUp, FaHeart } from "react-icons/fa";
import { IoIosAddCircle, IoMdCall } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import Calendar from "react-calendar"; // Import the Calendar component
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import SummaryApi from "../common";
import { HiStatusOnline } from "react-icons/hi";
import { TbCloudOff } from "react-icons/tb";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import MyBarChart from "../components/Charts";
import moment from "moment";
import MyComponent from "../components/Charts";
import { StoreContext } from "../context/StoreContext";
import { MdOutlineNetworkWifi3Bar } from "react-icons/md";


const Overview = () => {
  const [date, setDate] = useState(new Date());
  const [medics, setMedics] = useState([]);
  const [allEmergencies, setAllEmergencies] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { userDetails } = useContext(StoreContext);

  const navigate = useNavigate();

  const handleNavigateToAllUsers = () => {
    navigate("/users");
  };

  const handleNavigateToEmergency = () => {
    navigate("/actions");
  };

  const fetchAllMedics = async () => {
    const response = await fetch(SummaryApi.AllMedics.url);
    const dataResponse = await response.json();
    setMedics(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllMedics();
  }, []);

  const TotalMedics = medics.length;

  const fetchAllEmergencies = async () => {
    const response = await fetch(SummaryApi.AllEmergencies.url);
    const dataResponse = await response.json();
    setAllEmergencies(dataResponse?.data || []);
    console.log(allEmergencies);
  };

  useEffect(() => {
    fetchAllEmergencies();
  }, []);

  const TotalEmerg = allEmergencies.length;
  const liveEmergencies = allEmergencies.filter(
    (emerg) => emerg.status == "pending"
  );

  const fetchAllUsers = async () => {
    const response = await fetch(SummaryApi.AllUsers.url);
    const dataResponse = await response.json();
    setAllUsers(dataResponse?.data || []);
    setFilteredUsers(dataResponse?.data || []); // Initialize filtered users
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const users = allUsers.filter((user) => user.userType === "user");
  const TotalUsers = users.length;

  return (
    <div className="mx-4">
      <div className="mt-4  flex gap-4">
        <div
          className="bg-white w-1/4 min-h-32  shadow-lg shadow-slate-400 rounded-lg border-b-4 border-teal-600 cursor-pointer hover:transition-all hover:scale-105  "
          onClick={handleNavigateToEmergency}
        >
          <p className="pl-4 pt-4 text-md text-gray-500">+Emergency</p>
          <div className="mt-4 pl-4 flex  ">
            <FaAngleUp
              className="text-teal-600 text-lg"
              style={{ fontSize: 30 }}
            />
            <p className="text-lg font-bold">{TotalEmerg}</p>
          </div>
        </div>
        <div className="bg-white w-1/4 min-h-32 shadow-lg shadow-slate-400 rounded-lg border-b-4 border-teal-600 cursor-pointer hover:transition-all hover:scale-105 ">
          <p className="pl-4 pt-4 text-md text-gray-500">+Call Logs</p>
          <div className="mt-4 pl-4 flex  ">
            <FaAngleUp
              className="text-teal-600 text-lg"
              style={{ fontSize: 30 }}
            />
            <p className="text-lg font-bold">19</p>
          </div>
        </div>
        <div
          className="bg-white w-1/4 min-h-32 shadow-lg shadow-slate-400 rounded-lg border-b-4 border-teal-600 cursor-pointer hover:transition-all hover:scale-105 "
          onClick={handleNavigateToAllUsers}
        >
          <p className="pl-4 pt-4 text-md text-gray-500">+All Users</p>
          <div className="mt-4 pl-4 flex  ">
            <FaAngleUp
              className="text-teal-600 text-lg"
              style={{ fontSize: 30 }}
            />
            <p className="text-lg font-bold">{TotalUsers}</p>
          </div>
        </div>
        <div className="bg-white w-1/4 min-h-32 shadow-lg shadow-slate-400 rounded-lg border-b-4 border-teal-600 cursor-pointer hover:transition-all hover:scale-105 ">
          <p className="pl-4 pt-4 text-md text-gray-500">+All Conversations</p>
          <div className="mt-4 pl-4 flex  ">
            <FaAngleUp
              className="text-teal-600 text-lg"
              style={{ fontSize: 30 }}
            />
            <p className="text-lg font-bold">19</p>
          </div>
        </div>
      </div>
      <div className="  w-full flex items-center  mt-10 gap-10 ">
        <div className="flex items-center gap-4">
          <p>Current User</p>
          <div className="flex items-center gap-2 border shadow-slate-400 shadow-lg  px-4  bg-green-50 py-3 rounded-3xl border-green-400">
            <p className="capitalize">{userDetails.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          <div>
            <p>Paramedic Statuses</p>
          </div>
          {medics.map((medic) => {
            return (
              <div
                key={medic.id}
                className="flex items-center gap-2 border shadow-slate-400 shadow-lg px-4 bg-green-50 py-3 rounded-3xl border-green-400"
              >
                {medic.state === "online" ? (
                  <HiStatusOnline className="text-red-600" />
                ) : medic.state === "busy" ? (
                  <MdOutlineNetworkWifi3Bar className="text-yellow-600" /> // Replace with the appropriate busy icon
                ) : (
                  <TbCloudOff className="text-teal-600" />
                )}

                <p>{medic.name}</p>
                <p
                  className={`${
                    medic.state === "online"
                      ? "text-red-600 font-bold"
                      : medic.state === "busy"
                      ? "text-yellow-600 font-bold"
                      : "text-teal-600 font-bold"
                  }`}
                >
                  {medic.state}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-5 w-full flex justify-between gap-2 ">
        <div className="w-1/3 bg-white p-4 gap-2 grid shadow-lg rounded-lg  shadow-slate-400">
          <p>Recent Emergencies</p>
          {allEmergencies
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 3)
            .map((emerg) => {
              return (
                <div
                  key={emerg.id}
                  className=" gap-2 border    px-4   py-2 rounded-lg border-green-400"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm">{emerg.userName}</p>
                    <p className="line-clamp-1 text-ellipsis text-xs animate-pulse  capitalize text-red-500">
                      {emerg.status}
                    </p>
                    <p className="font-bold text-teal-600 text-xs">
                      {moment(emerg?.createdAt).fromNow()}
                    </p>
                  </div>

                  <p className="line-clamp-1 text-ellipsis text-xs">
                    {emerg.address}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="w-1/3 bg-white p-4 gap-2 shadow-lg rounded-lg  shadow-slate-400">
          <p>Live Emergencies</p>
          {liveEmergencies.length > 0 ? (
            liveEmergencies.slice(0, 3).map((emerg) => (
              <div
                key={emerg.id}
                className="gap-2 border mt-2 px-4 py-2 rounded-lg border-green-400"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm">{emerg.userName}</p>
                  <p className="font-bold text-teal-600 text-xs">
                    {moment(emerg?.createdAt).fromNow()}
                  </p>
                </div>
                <p className="line-clamp-1 text-ellipsis text-xs">
                  {emerg.address}
                </p>
              </div>
            ))
          ) : (
            <p className="p-4 text-teal-500 text-center">
              No live emergencies yet
            </p>
          )}
        </div>
        <div className="w-1/3 bg-white p-4 gap-2 grid   rounded-lg shadow-slate-400 shadow-lg ">
          <p>All Medics</p>
          <div className="grid gap-2 ">
            {medics.map((medic) => {
              return (
                <div
                  key={medic.id}
                  className=" gap-2 border  flex items-center  justify-between px-4   py-3 rounded-lg border-green-400"
                >
                  <div className="flex items-center ">
                    <p>{medic.name} - </p>
                    <p className="text-sm"> {medic.contact || "none"} / </p>
                    <p className="text-sm"> {medic.email}</p>
                  </div>
                  <IoChatbubbleEllipsesSharp
                    className="text-teal-600"
                    size={25}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-5 w-full flex justify-between  ">
        <div className="bg-white p-2  rounded-lg shadow-slate-400 shadow-lg ">
          <p className="text-sm text-center">All Emergency Distribution</p>
          <MyComponent />
        </div>
        <Calendar className="shadow-lg rounded-lg bg-white border-none shadow-slate-400 react-calendar__tile react-calendar  " />
        <div className="p-4 w-1/3 bg-white shadow-lg rounded-lg border-none shadow-slate-400">
          <p>Statistics</p>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p>All Emergencies</p>
              <p className="text-sm text-gray-500">
                Total number of emergencies recieved all time
              </p>
            </div>
            <p className=" border-2 border-red-500 rounded-full  px-4 py-2">
              {TotalEmerg}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p>All Users</p>
              <p className="text-sm text-gray-500">
                Total number of users excluding medics{" "}
              </p>
            </div>
            <p className=" border-2 border-yellow-500 rounded-full px-4 py-2">
              {TotalUsers}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p>All Paramedics</p>
              <p className="text-sm text-gray-500">
                Total number of Paramedics{" "}
              </p>
            </div>
            <p className=" border-2 border-green-500 rounded-full px-4 py-2">
              {TotalMedics}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div>
              <p>All Calls</p>
              <p className="text-sm text-gray-500">
                All of the calls you have recieved{" "}
              </p>
            </div>
            <p className=" border-2 border-blue-500 rounded-full px-4 py-2">
              70
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

//AIzaSyBnrPY55paK-NdlnZyVqIHrRcqNxH3Ap2o
