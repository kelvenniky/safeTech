import React from "react";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SocketContextProvider } from "@/SocketContext";
import SocketStatus from "@/components/SocketStatus";
import { ProfileContextProvider } from "@/components/ProfileContext";

export default function RootLayout() {
  return (
    <ProfileContextProvider>
    <SocketContextProvider>
      <SocketStatus />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} />
        <Stack.Screen name="(root)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
    </SocketContextProvider>
    </ProfileContextProvider>
  );
}
