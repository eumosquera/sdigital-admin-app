import { Tabs, Redirect } from "expo-router";
import React from "react";
import { useAuthStore } from "../../src/store/authStore";

import { HapticTab } from "@/components/haptic-tab";
import { Home, Users, CreditCard, DollarSign, Layers } from "lucide-react-native";

export default function TabLayout() {
  const token = useAuthStore((state: any) => state.token);
  const loading = useAuthStore((state: any) => state.loading);

  if (loading) return null;

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563eb", headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Home size={28}  color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="clientes"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color }) => (
            <Users size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cuentas"
        options={{
          title: "Cuentas",
          tabBarIcon: ({ color, size }) => (
            <CreditCard color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ventas"
        options={{
          title: "Ventas",
          tabBarIcon: ({ color, size }) => (
            <DollarSign color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="plataformas"
        options={{
          title: "Plataformas",
          tabBarIcon: ({ color, size }) => (
            <Layers color={color} size={size} />
          ),
        }}
      />
                  
    </Tabs>
  );
}
