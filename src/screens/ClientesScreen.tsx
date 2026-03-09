import { View, Text, FlatList } from "react-native";
import { useClientes } from "@/hooks/useClientes";

export default function ClientesScreen() {

  const { data, isLoading } = useClientes();

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <View className="flex-1 p-4 bg-white">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="p-4 border-b">
            <Text className="text-lg font-bold">{item.nombre}</Text>
          </View>
        )}
      />
    </View>
  );
}