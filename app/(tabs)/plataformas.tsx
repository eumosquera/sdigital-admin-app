import {
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";

import { usePlataformas } from "@/hooks/usePlataformas";
import { SafeAreaView } from "react-native-safe-area-context";
import PlatformCard from "@/components/PlatformCard";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useDeletePlataforma } from "@/hooks/useDeletePlataformas";

export default function Plataformas() {

  const { data = [], isLoading } = usePlataformas();
  const [search, setSearch] = useState("");
  const deletePlataforma = useDeletePlataforma();
  const router = useRouter();

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

        <Text style={{ marginTop: 10 }}>
          Cargando plataformas...
        </Text>
      </SafeAreaView>
    );
  }

  const filtered = data.filter((plataforma: any) =>
    plataforma.nombre?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {

    Alert.alert(
      "Eliminar Plataforma",
      "¿Seguro que deseas eliminar esta plataforma?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deletePlataforma.mutate(id),
        },
      ]
    );

  };

  return (

    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#f3f4f6"
      }}
    >

      {/* BUSCADOR */}

      <TextInput
        placeholder="Buscar plataforma..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 14
        }}
      />

      {/* LISTA */}

      <FlatList
        data={filtered}

        numColumns={2}

        keyExtractor={(item: any) =>
          item.id.toString()
        }

        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10
        }}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={{
          paddingBottom: 80
        }}

        renderItem={({ item }: any) => (

          <PlatformCard
            plataforma={item}

            onPress={() =>
              router.push(`/plataformas/form?id=${item.id}`)
            }

            onLongPress={() =>
              handleDelete(item.id)
            }

          />

        )}

        ListEmptyComponent={

          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: "#666",
              fontSize: 16
            }}
          >
            🔍 No se encontraron plataformas
          </Text>

        }

      />

    </SafeAreaView>

  );
}