import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface CustomButtonProps{
    title:string,
    onPress:any,
    containerStyle:any
}

const CustomButton = ({title, onPress, containerStyle}:CustomButtonProps) => {
  return (
    <TouchableOpacity className={`bg-teal-600 py-4 items-center flex  rounded-2xl  shadow-sm ${containerStyle}`} onPress={onPress}>
        <Text className='font-bold text-white text-xl'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({})