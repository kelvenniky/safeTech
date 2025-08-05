import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { TiFilter } from 'react-icons/ti';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import moment from 'moment';

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllUsers = async () => {
    const response = await fetch(SummaryApi.AllUsers.url);
    const dataResponse = await response.json();
    setAllUsers(dataResponse?.data || []);
    setFilteredUsers(dataResponse?.data || []); // Initialize filtered users
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    const results = allUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, allUsers]); // Run effect when search term or all users change

  const totalPatients = filteredUsers.length;

  // Handler to filter users by userType "Admin"
  const handleFilterByUserType = () => {
    const admins = allUsers.filter(user => user.userType === 'medic');
    setFilteredUsers(admins);
  };

  // Handler to show all users
  const handleShowAllUsers = () => {
    setFilteredUsers(allUsers);
    setSearchTerm(''); // Reset search term when showing all users
  };

  // Handler to filter regular users
  const handleShowRegularUsers = () => {
    const regularUsers = allUsers.filter(user => user.userType === 'user');
    setFilteredUsers(regularUsers);
    setSearchTerm(''); // Reset search term when showing regular users
  };

  return (
    <div className='mx-5 mt-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-28'>
          <div className='flex items-center gap-1'>
            <p className='text-5xl text-teal-600'>{totalPatients}</p>
            <p>users</p>
          </div>
          <input
            type="text"
            placeholder='Search users...'
            className='border border-teal-500 rounded-full px-4 py-2'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
         
        </div>
        <div className='flex gap-2 '>
        <div 
              onClick={handleShowAllUsers}
              className='px-3 py-2 border border-teal-500 cursor-pointer rounded-full'
            >
              <p>All Users</p>
            </div>
            <div 
              onClick={handleShowRegularUsers}
              className='px-3 py-2 border border-teal-500 cursor-pointer rounded-full'
            >
              <p>Regular Users</p>
            </div>
            <div 
          onClick={handleFilterByUserType} 
          className='px-3 py-2 border border-teal-500 cursor-pointer rounded-full'
        >
          Ambulance Personnels
        </div>
        </div>
        
      </div>

      <table className='w-full border-collapse border mt-10'>
        <thead className='border bg-white'>
          <tr className='text-center mb-2 border-4 bg-white'>
            <th className='p-3'>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Date Of Creation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='border '>
          {filteredUsers.map((user, index) => (
            <tr key={user._id} className='text-center mb-2 border-4 py-9 bg-white' style={{ marginBottom: 10 }}>
              <td className='p-3'>
                <p>{index + 1}</p>
              </td>
              <td>
                <p>{user?.name}</p>
              </td>
              <td>
                <p>{user?.email}</p>
              </td>
              <td>
                <p>{user?.userType}</p>
              </td>
              <td>
                <p>{moment(user?.createdAt).format('ll')}</p>
              </td>
              <td>
                <Link to={`/user/${user._id}`} className='px-2 py-1 bg-teal-500 rounded-md'>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;