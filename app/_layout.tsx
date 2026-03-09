import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../src/store/authStore";

const queryClient = new QueryClient();


export default function RootLayout() {
  const colorScheme = useColorScheme();

  const loadSession = useAuthStore((state : any) => state.loadSession);

useEffect(() => {
  loadSession();
}, []);

  return (
    <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>

        <StatusBar style="dark" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
