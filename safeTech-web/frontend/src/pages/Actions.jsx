import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment';
import user from '../assets/user.gif';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa6';

const Actions = () => {
  const [allEmergencies, setAllEmergencies] = useState([]);
  const [filteredEmergencies, setFilteredEmergencies] = useState([])

  const fetchAllEmergencies = async () => {
    const response = await fetch(SummaryApi.AllEmergencies.url);
    const dataResponse = await response.json();
    setAllEmergencies(dataResponse?.data || []);
    setFilteredEmergencies(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllEmergencies();
  }, []);

  const Total = allEmergencies.length;


  const handlePending = () => {
    const pending = allEmergencies.filter(user => user.status === 'pending');
    setFilteredEmergencies(pending);
  };

  const handleCompleted = () => {
    const completed = allEmergencies.filter(user => user.status === 'completed');
    setFilteredEmergencies(completed);
  };
  const handleCancelled = () => {
    const cancelled = allEmergencies.filter(user => user.status === 'cancelled');
    setFilteredEmergencies(cancelled);
  };


  const handleAll = () => {
    const allEmerg = allEmergencies;
    setFilteredEmergencies(allEmerg);
  };
  

  return (
    <div>
      <div className='h-16 w-full bg-white border-b border-slate-100 shadow-sm shadow-slate-300 flex items-center gap-10 px-4'>
        <p className='text-xl text-teal-500'>{Total}+</p>
        <div className='cursor-pointer' onClick={handleAll}>
        <p className='font-semibold '> All</p>
        </div>
       <div className='cursor-pointer' onClick={handlePending}> <p className='font-semibold '> Pending</p>
      </div>
        <div className='cursor-pointer' onClick={handleCompleted}><p className='font-semibold '> Completed</p></div>
       <div className='cursor-pointer' onClick={handleCancelled}> <p className='font-semibold '> Cancelled</p></div>
      </div>
      <div className='mt-7 mx-4 overflow-y-auto' style={{ maxHeight: '80vh' }}>
        {
          filteredEmergencies.slice().reverse().map((el, index) => {
            return (
              <div key={index} className='bg-white mb-7 py-3 px-3 rounded-md'>
                <div className='flex border py-3 px-2 rounded-md justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                    <FaRegUser className='text-2xl text-teal-500'/>

                    <div className='pt-1'>
                      <p className='text-md font-semibold'>{el.userName}</p>
                      <p className='text-xs'>{el.userEmail}</p>
                    </div>
                  </div>
                  <div className='flex flex-col items-end'>
                    <p style={{ fontSize: 12 }}>{moment(el?.createdAt).format('ll')}</p>
                    <p>{el.address}</p>
                    <p className='font-bold text-teal-600 text-xs'>{moment(el?.createdAt).fromNow()}</p>
                  </div>
                </div>
                <div className='flex mt-2 justify-between'>
                  <div className='flex gap-2'>
                    <Link to={`/user/${el.userId}`}  className='p-1 border bg-green-100 text-green-800 rounded-md text-sm'>View User</Link>
                    <button className='p-1 border bg-green-100 text-green-800 rounded-md text-sm'>User Location</button>
                  </div>
                  <div>
                    <div className='p-1 border rounded-md bg-slate-200 text-sm'>{el?.status}</div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default Actions;