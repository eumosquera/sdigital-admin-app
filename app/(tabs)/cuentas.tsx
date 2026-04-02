import {
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Plus } from "lucide-react-native";

import CuentaCard from "@/components/CuentaCard";
import { useCuentas } from "@/hooks/useCuentas";
import { getCuentaStatus } from "@/src/utils/cuentaStatus";

type CuentaFilter =
  | "TOTAL"
  | "DISPONIBLE"
  | "VENCIDA"
  | "AGOTADA"
  | "POR VENCER"
  | "EN SOPORTE";

export default function CuentasScreen() {
  const router = useRouter();

  const { data, isLoading } = useCuentas();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<CuentaFilter>("TOTAL");

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#2563eb" />

        <Text style={{ marginTop: 10 }}>Cargando cuentas...</Text>
      </SafeAreaView>
    );
  }

  // FILTRO BUSCADOR

  const filteredSearch = data.filter((cuenta: any) =>
    cuenta.correo?.toLowerCase().includes(search.toLowerCase()),
  );

  // FILTRO POR ESTADO

  const filtered = filteredSearch.filter((cuenta: any) => {
    if (filter === "TOTAL") return true;

    const status = getCuentaStatus(cuenta);

    return status.label === filter;
  });

  // CONTADORES

  const counts: Record<CuentaFilter, number> = {
    TOTAL: data.length,
    DISPONIBLE: data.filter(
      (c: any) => getCuentaStatus(c).label === "DISPONIBLE",
    ).length,

    VENCIDA: data.filter((c: any) => getCuentaStatus(c).label === "VENCIDA")
      .length,

    AGOTADA: data.filter((c: any) => getCuentaStatus(c).label === "AGOTADA")
      .length,

    "POR VENCER": data.filter(
      (c: any) => getCuentaStatus(c).label === "POR VENCER",
    ).length,
    "EN SOPORTE": data.filter(
      (c: any) => getCuentaStatus(c).label === "EN SOPORTE",
    ).length,
  };

  const filters: { key: CuentaFilter; label: string }[] = [
    { key: "TOTAL", label: "Total" },
    { key: "DISPONIBLE", label: "Disponibles" },
    { key: "VENCIDA", label: "Vencidas" },
    { key: "AGOTADA", label: "Agotadas" },
    { key: "POR VENCER", label: "Por vencer" },
    { key: "EN SOPORTE", label: "En soporte" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, backgroundColor: "#f3f4f6" }}>
      {/* HEADER FILTROS */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 14 }}
      >
        {filters.map((f) => {
          const active = filter === f.key;

          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={{
                backgroundColor: active ? "#2563eb" : "#fff",
                padding: 12,
                borderRadius: 10,
                marginRight: 10,
                minWidth: 90,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: active ? "#fff" : "#444",
                  fontSize: 12,
                }}
              >
                {f.label}
              </Text>

              <Text
                style={{
                  color: active ? "#fff" : "#000",
                  fontWeight: "700",
                }}
              >
                {counts[f.key]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* BUSCADOR */}

      <TextInput
        placeholder="Buscar cuenta..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 14,
        }}
      />

      {/* LISTA */}

      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }: any) => (
          <CuentaCard
            cuenta={item}
            onPress={() => router.push(`/cuentas/detalle?id=${item.id}`)}
          />
        )}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 40,
              color: "#666",
              fontSize: 16,
            }}
          >
            📭 No hay cuentas
          </Text>
        }
      />
      <Plus color="white" size={28} />
    </SafeAreaView>
  );
}
