import { View, Text, FlatList, Button } from "react-native";
import { useClientes } from "@/hooks/useClientes";
import { useAuthStore } from "../../src/store/authStore";
export default function Clientes() {
  const { data, isLoading } = useClientes();
  const logout = useAuthStore((state: any) => state.logout);
  if (isLoading) {
    return <Text>Cargando clientes...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">{item.nombre}</Text>
            <Text className="text-lg font-bold">{item.telefono}</Text>
          </View>
        )}
      />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
