import { ThemedText } from "@/components/themed-text";
import { Label } from "@react-navigation/elements";
import { useState } from "react";
import { Button, TextInput, View } from "react-native";
import { api } from "../../src/api/axios";
import { useAuthStore } from "../../src/store/authStore";

export default function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginStore = useAuthStore((state: any) => state.login);

  const handleLogin = async () => {
    try {
      const res = await api.post("/mobile/login", {
        usernameOrEmail: usernameOrEmail,
        password: password,
      });
      console.log("Login successful:", res.data);

      await loginStore(res.data.token, res.data.user);
    } catch (error: any) {
      console.log("ERROR STATUS:", error.response?.status);
      console.log("ERROR DATA:", error.response?.data);
      console.log("ERROR FULL:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Label style={{ fontSize: 24, marginBottom: 20 }}>Admin Login</Label>

      <ThemedText type="subtitle">Username or Email</ThemedText>
      <TextInput
        placeholder="Email"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />

      <ThemedText type="subtitle">Password</ThemedText>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
