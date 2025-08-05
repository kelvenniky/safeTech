import React, { useEffect, useState } from "react";
import axios from "axios";
import SummaryApi from "../common";
import female from "../assets/female.jpeg";

const UserList = ({setActiveUser}) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(SummaryApi.getMessUsers.url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse JSON
        setUsers(data);
      } catch (err) {
        setError("Error fetching users: " + err.message);
        console.error(err);
      }
    };

    fetchUsers();
  }, []);
  

    const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on the search query
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="w-1/2 h-screen overflow-scroll  pt-4  border-r ">
      <div className="border-b border-gray-300 pb-3 px-6">
        <div>
          <input
            type="text"
            placeholder="Search Conversations"
            className="bg-slate-200 py-2  outline-teal-500 w-full rounded-full px-4 "
            value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)} // Update search query
          />
        </div>
      </div>
      <div className="">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => {
              return (
                <div key={user._id} className="flex border-b px-6 hover:bg-teal-50 justify-between py-4 cursor-pointer " onClick={()=>setActiveUser(user)}>
                 <div className="flex items-center gap-3">
                 <div className="border border-teal-500 p-4 rounded-full">
                      <p className="text-md font-bold capitalize">
                  {user?.name.charAt(0).toUpperCase()}
                  {user?.name.charAt(user.name.length - 1).toUpperCase()}

                </p>
                  </div>
                  <div>
                
                <p className="text-md font-bold capitalize ">{user.name}</p>
                <p className="text-sm ">{user.userType}</p>
              </div>
                 </div>
            
                  <div>
                    <p className="text-xs text-gray-400">12:23pm</p>
                   
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-5">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
