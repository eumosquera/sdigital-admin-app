import { View, Text, FlatList, Button } from "react-native";
import { usePlataformas } from "@/hooks/usePlataformas";
import { useAuthStore } from "../../src/store/authStore";
export default function Plataformas() {
  const { data, isLoading } = usePlataformas();
  const logout = useAuthStore((state: any) => state.logout);
  if (isLoading) {
    return <Text>Cargando plataformas...</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">{item.nombre}</Text>
            <Text className="text-lg font-bold">{item.tipo}</Text>
          </View>
        )}
      />
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
}
