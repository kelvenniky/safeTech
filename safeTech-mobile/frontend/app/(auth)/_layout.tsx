import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ProfileContextProvider } from '@/components/ProfileContext'

const Layout = () => {
  return (
    <ProfileContextProvider>
      <Stack>
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
        <Stack.Screen name="PersonnelSignUp" options={{ headerShown: false }} />
        <Stack.Screen name="AddImage" options={{ headerShown: false }} />



    </Stack>
    </ProfileContextProvider>
  )
}

export default Layout