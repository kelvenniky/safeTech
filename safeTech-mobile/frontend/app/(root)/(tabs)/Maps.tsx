import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MapSummary from '@/components/MapSummary';
import { FontAwesome6, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Maps = () => {
  const [show, setShow] = useState(false);
  const [nearestPost, setNearestPost] = useState(false); // Change to null for better handling

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

  const handlePost = () => {
    // Triggering the closest security post logic in MapSummary
    setNearestPost(true);
    console.log('Nearest post button pressed');
  };
    const hidePost = () => {
    // Triggering the closest security post logic in MapSummary
    setNearestPost(false) ;
    console.log('HIDEE');
  };

  return (
    <View className="flex-1">
      <View className="absolute top-16 left-6 z-10 bg-opacity-50">
        <View className='flex flex-row gap-4 flex-wrap'>
          <View className='flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center'>
            <Image source={require('../../../assets/icons/danger.png')} className='w-5 h-5' />
            <Text className='font-semibold'>Danger Zones</Text>
          </View>
          <View className='flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center'>
            <Image source={require('../../../assets/icons/sec.png')} className='w-6 h-6' />
            <Text className='font-semibold'>Security Posts</Text>
          </View>
          <TouchableOpacity onPress={toggleShow} className='flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center'>
            <MaterialCommunityIcons name="dots-grid" size={24} color="black" />
          </TouchableOpacity>
          {show && (
           <View className='absolute  grid gap-4 top-16 w-44 right-10 z-10 '>
             <TouchableOpacity onPress={handlePost} className=' flex items-center gap-2 flex-row  shadow-sm rounded-md   bg-white p-2 '>
              <FontAwesome6 name="location-crosshairs" size={24} color="black" />
              <Text className='text-sm font-semibold'>Nearest Post</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hidePost} className='flex items-center gap-2 flex-row shadow-sm rounded-md   bg-white p-2  '>
              <MaterialIcons name="location-disabled" size={24} color="black" />
              <Text className='text-sm font-semibold'>Hide Post</Text>
            </TouchableOpacity>
           </View>

          )}
          <View className='flex flex-row p-2 rounded-full shadow-sm bg-white gap-2 items-center'>
            <Image source={require('../../../assets/icons/safe.png')} className='w-8 h-8' />
            <Text className='font-semibold'>Safe Zones</Text>
          </View>
        </View>
      </View>
      <MapSummary nearestPost={nearestPost} />
    </View>
  );
};

export default Maps;