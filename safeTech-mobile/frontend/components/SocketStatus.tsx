import { useSocketContext } from '@/SocketContext';
import React, { useEffect } from 'react';

const SocketStatus = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      console.log('Socket is available:');
    } else {
      console.log('Socket is not available');
    }
  }, [socket]);

  return null;
};

export default SocketStatus