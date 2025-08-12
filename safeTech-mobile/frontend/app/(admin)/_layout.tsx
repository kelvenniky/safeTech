import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="AllUsers" options={{ headerShown: false }} />
        <Stack.Screen name="AllConversations" options={{ headerShown: false}} />
        <Stack.Screen name="Emergencies" options={{ headerShown: false}} />
        <Stack.Screen name="Journey" options={{ headerShown: false}} />
        <Stack.Screen name="FirstAid" options={{ headerShown: false}} />
        <Stack.Screen name="Summary" options={{ headerShown: false}} />
        <Stack.Screen name="MedicsOnline" options={{ headerShown: false}} />
        <Stack.Screen name="AllEmergencies" options={{ headerShown: false}} />\
        <Stack.Screen name="MedicProfile" options={{ headerShown: false }} />










    


    </Stack>
  )
}

export default Layout