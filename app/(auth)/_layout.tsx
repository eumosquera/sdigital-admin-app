import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../src/store/authStore";

export default function AuthLayout() {

  const token = useAuthStore((state: any) => state.token);
  const loading = useAuthStore((state: any) => state.loading);

  if (loading) return null;

  if (token) {
    return <Redirect href="/(tabs)" />;
  }
console.log("No token found, rendering auth stack");
  return <Stack screenOptions={{ headerShown:false }} />;
}