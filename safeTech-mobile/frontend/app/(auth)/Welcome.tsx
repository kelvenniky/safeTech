import { StyleSheet, Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { router } from 'expo-router'
import Swiper from "react-native-swiper"
import { onboarding, } from '@/constants'
import CustomButton from '@/components/CustomButton'

const Welcome = () => {
    const swiperRef = useRef<Swiper>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const isLastSlide = activeIndex === onboarding.length-1;
  return (
    <SafeAreaView className='flex h-full items-center justify-between  bg-white'>
        <TouchableOpacity onPress={()=>{
            router.replace('/(auth)/Login')
        }} className='w-full flex justify-end items-end p-5'>
            <Text className='text-black text-lg font-bold'>Skip</Text>
        </TouchableOpacity>
        <Swiper ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full"/>}
        activeDot={<View className="w-[32px] h-[4px] mx-1 bg-red-600 rounded-full"/>}
        onIndexChanged={(index)=>setActiveIndex(index)}
        >
            
               {onboarding.map((item) => (
               <View key={item.id} className='flex items-center justify-center p-5 mt-24 '>
                    <Image
                    source={item.image}
                    className="w-full h-[250px]"
                    resizeMode='contain'
                    />
                    <View className='flex flex-row items-center justify-center w-full m-10'>
                        <Text className='text-black text-3xl font-bold mx-10 text-center'>{item.title}</Text>
                    </View>
                    <Text className='text-xl text-center font-semibold text-[#858585] mx-10 '>{item.description}</Text>
               </View>
               ))} 
            
        </Swiper>
        <CustomButton title={isLastSlide? 'Get Started':'Next'} containerStyle="w-11/12 mt-100 p-4  "
        onPress={()=>isLastSlide ? router.replace('/(auth)/Login')
            :swiperRef.current ?.scrollBy(1)
        }/>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({})