import {
  FlatList,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import ClientCard from "@/components/ClientCard";
import { useClientes } from "@/hooks/useClientes";
import { useDeleteCliente } from "@/hooks/useDeleteCliente";
import { Plus } from "lucide-react-native";
import { formatName } from "@/src/utils/formaText";

export default function ClientesScreen() {
  const router = useRouter();

  const { data, isLoading } = useClientes();
  const deleteCliente = useDeleteCliente();

  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#2563eb" />

        <Text style={{ marginTop: 10 }}>Cargando clientes...</Text>
      </SafeAreaView>
    );
  }

  const filtered = data.filter(
    (cliente: any) =>
      cliente.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      cliente.telefono?.includes(search),
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
            nombre={formatName(item.nombre)}
            telefono={item.telefono}
            onPress={() => router.push(`/clientes/form?id=${item.id}`)}
            onEdit={() => router.push(`/clientes/form?id=${item.id}`)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <SafeAreaView
            style={{
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Text style={{ fontSize: 40 }}>🔍</Text>

            <Text
              style={{
                marginTop: 10,
                fontSize: 16,
                color: "#666",
              }}
            >
              No se encontraron clientes
            </Text>
          </SafeAreaView>
        }
      />

      <TouchableOpacity
        onPress={() => router.push({ pathname: "/clientes/form" })}
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
        <Plus color="white" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
