import React, { useContext, useEffect, useState } from "react";
import female from "../assets/female.jpeg";
import { FiSend } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import { StoreContext } from "../context/StoreContext";

const Chatroom = ({ activeUser }) => {
  const user = useSelector((state) => state?.user?.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(""); // State for the message input
  const [error, setError] = useState(null);
  const {token, userDetails, userId} = useContext(StoreContext)

  useEffect(() => {
    const fetchUserMessages = async () => {
      const senderId = user?._id;
      const receiverId = activeUser?._id;

      if (token && senderId && receiverId) {
        try {
          const response = await fetch(`${SummaryApi.UserMessages.url}?senderId=${senderId}&receiverId=${receiverId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch messages');
          }

          const dataResponse = await response.json();
          setMessages(dataResponse || []);
          console.log('mess', messages)
        } catch (error) {
          setError(error);
          console.error('Error fetching user messages:', error);
        }
      }
    };

    fetchUserMessages();
  }, [activeUser, user]);



  useEffect(() => {
    // Set a timeout to display emergencies after 2 seconds (2000 ms)
    const timer = setTimeout(() => {
        fetchUserMessages()
    }, 2000); // Adjust the time as needed

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []); 

  
const sendMessage = async (e) => {
  e.preventDefault(); // Prevent the default form submission

  const senderId = userDetails?._id; // Use userDetails from context
  const receiverId = activeUser?._id;

  if (message && token && senderId && receiverId) {
    console.log('yess')
    console.log('data', message, token, senderId, receiverId)
    try {
      // Send the message to the database
      const response = await fetch(`${SummaryApi.SendMessage.url}/${receiverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senderId, receiverId, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const dataResponse = await response.json();
      setMessages((prevMessages) => [...prevMessages, dataResponse.newMessage]); // Update message list
      setMessage(""); // Clear the input field
    } catch (error) {
      console.log("Error sending message:", error);
    }
  }
};  

  if (error) {
    return <div>Error loading messages: {error.message}</div>;
  }

  return (
    <div className="max-h-screen h-screen w-full border-r">
      {activeUser ? (
        <div className="flex flex-col h-full">
          <div className="mt-4 flex items-center gap-2 border-b pb-3 pl-3">
            <img src={female} alt="User Avatar" className="h-10 w-10 rounded-full" />
            <div>
              <p className="text-md font-bold capitalize">{activeUser.name}</p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex-1 overflow-scroll bg-gray-100 p-4">
            <ul className="flex flex-col">
            {messages.length > 0 ? (
                messages.map((msg) => (
                 <div
            style={{
              backgroundColor: msg?.receiverId === userId ? 'white' : '#DCF8C6',
              padding: '10px',
              margin: '10px',
              borderRadius: '7px',
              maxWidth: '60%',
              alignSelf: msg?.receiverId === userId ? 'flex-start' : 'flex-end',
            }}
          >
            <p style={{ fontSize: '15px', fontWeight: '500', textAlign: 'left' }}>
              {msg.message}
                      </p>
            <p
              style={{
                textAlign: 'right',
                fontSize: '9px',
                color: 'gray',
                marginTop: '5px',
              }}
            >
              {new Date(msg.timeStamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
                ))
              ) : (
                <li>No messages yet.</li>
              )}


            
            </ul>
          </div>
          <form className="px-3 relative py-5 border-t" onSubmit={sendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-4 border rounded-full  outline-none"
            />
            <button type="submit" className="absolute right-10 top-[40px] " >
              <FiSend className="text-teal-600 text-xl" />
            </button>
          </form>
        </div>
      ) : (
        <div>
          <div className="mt-4 flex items-center gap-2 border-b pb-3 pl-3">
          <img src={female} alt="User Avatar" className="h-10 w-10 rounded-full" />
          <div>
            <p className="text-md font-bold">Select a user to chat</p>
            <p className="text-xs text-gray-500">No user selected</p>
          </div>
        
          
        </div>
          <div className="flex flex-col gap-2 items-center mt-44 justify-center">
        <p className="text-5xl text-teal-500">EmergenZ</p>
        <p className="text-2xl text-gray-400">Click on a user to start a conversation...</p>
        <BsChatDots className='text-teal-500 text-5xl' />
      </div>
        </div>
      )}

      
    </div>
  );
};

export default Chatroom;