import {
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientCard from "@/components/ClientCard";
import { useClientes } from "@/hooks/useClientes";
import { useDeleteCliente } from "@/hooks/useDeleteCliente";
import { Plus } from "lucide-react-native";
export default function ClientesScreen() {
  const router = useRouter();

  const { data, isLoading } = useClientes();
  const deleteCliente = useDeleteCliente();

  const [search, setSearch] = useState("");

  if (isLoading) return null;

  const filtered = data.filter((cliente: any) =>
    cliente.nombre?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id: string) => {
    Alert.alert(
      "Eliminar cliente",
      "¿Seguro que deseas eliminar este cliente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteCliente.mutate(id),
        },
      ],
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f3f4f6" }}>
      <TextInput
        placeholder="Buscar cliente..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
        }}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
          <ClientCard
            id={item.id}
            nombre={item.nombre}
            telefono={item.telefono}
            onPress={() => router.push(`/clientes/form?id=${item.id}`)}
            onEdit={() => router.push(`/clientes/form?id=${item.id}`)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => router.push({pathname: "/clientes/form"})}
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          backgroundColor: "#2563eb",
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 28, fontWeight: "bold" }}>
          <Plus color="white" size={28} />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
