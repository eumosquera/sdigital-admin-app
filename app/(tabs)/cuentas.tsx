import { View, Text, FlatList, Button } from "react-native";
import { useCuentas } from "@/hooks/useCuentas";
import { useAuthStore } from "../../src/store/authStore";
export default function Cuentas() {
  const { data, isLoading } = useCuentas();
  const logout = useAuthStore((state: any) => state.logout);
  if (isLoading) {
    return <Text>Cargando Cuentas...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">{item.correo}</Text>
            <Text className="text-lg font-bold">{item.contrasena}</Text>
          </View>
        )}
      />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
