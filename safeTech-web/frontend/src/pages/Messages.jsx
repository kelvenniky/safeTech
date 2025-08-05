import React, { useState } from 'react'
import UserList from '../components/UserList'
import Chatroom from '../components/Chatroom'
import Profile from '../components/Profile';

const Messages = () => {
  const [activeUser, setActiveUser] = useState(null); // State to hold the selected user

  return (
    <div className='flex '>
    <UserList setActiveUser={setActiveUser} />
    <Chatroom activeUser={activeUser} />
    {
      activeUser ? (
        <Profile activeUser={activeUser}/>
      ): (
        ""
      )
    }
   
    </div>
  )
}

export default Messages