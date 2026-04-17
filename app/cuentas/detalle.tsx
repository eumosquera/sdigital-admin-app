import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCuenta } from "@/hooks/useCuenta";
import { useRenovarCuenta } from "@/hooks/useRenovarCuenta";
import { useDeleteCuenta } from "@/hooks/useDeleteCuenta";
import { getCuentaStatus } from "@/src/utils/cuentaStatus";
import { formatDate, getExpirationText } from "@/src/utils/formatDate";
import { getPerfilStatus } from "@/src/utils/perfilStatus";
import { Pencil } from "lucide-react-native";

const API_URL = "https://sdigital-diego-i6x5.vercel.app";

export default function CuentaDetalle() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const renovarCuenta = useRenovarCuenta();
  const deleteCuenta = useDeleteCuenta();

  const { data: cuenta, isLoading } = useCuenta(id);

  if (isLoading || !cuenta) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  const status = getCuentaStatus(cuenta);

  const handleRenovar = (cuenta: any) => {
    Alert.alert(
      "Renovar cuenta",
      "Se registrará una nueva compra para esta cuenta y comenzará un nuevo periodo. ¿Desea continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Renovar",
          onPress: () => {
            renovarCuenta.mutate({
              cuentaId: cuenta.id.toString(),
              dias: 30,
              precioCompra: cuenta.precioCompra,
            });
          },
        },
      ],
    );
  };

  const handleDeleteCuenta = (cuentaId: string) => {
    Alert.alert("Eliminar cuenta", "¿Deseas eliminar esta cuenta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          deleteCuenta.mutate(cuentaId);
          router.back();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* LOGO */}

        <View style={{ alignItems: "center", marginBottom: 12 }}>
          <Image
            source={{ uri: `${API_URL}${cuenta.plataforma.logo}` }}
            style={{ width: 60, height: 60, borderRadius: 50 }}
          />
        </View>

        {/* NOMBRE / EMAIL */}

        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontWeight: "700",
          }}
        >
          {cuenta.plataforma.nombre}
        </Text>

        <Text
          style={{
            textAlign: "center",
            color: "#555",
            marginTop: 4,
          }}
        >
          {cuenta.correo}
        </Text>

        {/* STATUS */}

        <View
          style={{
            alignSelf: "center",
            marginTop: 10,
            backgroundColor: status.color + "20",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: status.color,
              fontWeight: "700",
            }}
          >
            {status.label}
          </Text>
        </View>

        {/* FECHA */}

        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            color: "#666",
          }}
        >
          {formatDate(cuenta.fechaVencimiento)} •{" "}
          {getExpirationText(cuenta.fechaVencimiento)}
        </Text>

        {/* ---------------- PERFILES ---------------- */}

        <Text
          style={{
            marginTop: 20,
            fontWeight: "700",
            fontSize: 16,
            color: "#0f0e72",
            textAlign: "center",
          }}
        >
          {cuenta.detalles.length} Perfiles
        </Text>

        <View style={{ marginTop: 10 }}>
          {cuenta.detalles.map((p: any, index: number) => {
            const status = getPerfilStatus(p.estado);

            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  router.push({
                    pathname: "/perfiles/form",
                    params: {
                      cuentaId: cuenta.id,
                      perfilId: p.id,
                    },
                  })
                }
                style={{
                  backgroundColor: "#fff",
                  padding: 12,
                  borderRadius: 10,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontWeight: "500",
                    color: "#333",
                  }}
                >
                  {p.perfil} {" - "} {p.pin}
                </Text>

                <View
                  style={{
                    backgroundColor: status.color + "20",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      color: status.color,
                      fontWeight: "700",
                      fontSize: 12,
                    }}
                  >
                    {status.label}
                  </Text>
                </View>
                <View style={styles.actions}>
                  <TouchableOpacity>
                    <Pencil size={18} color="#2563eb" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ---------------- ACCIONES ---------------- */}

        <View style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push(`/cuentas/form?id=${cuenta.id}`)}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#f59e0b" }]}
            onPress={() => handleRenovar(cuenta)}
          >
            <Text style={styles.buttonText}>Renovar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#ef4444" }]}
            onPress={() => handleDeleteCuenta(cuenta.id.toString())}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#10b981" }]}
            onPress={() => router.push(`/perfiles/form?cuentaId=${cuenta.id}`)}
          >
            <Text style={styles.buttonText}>Nuevo Perfil</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  } as const,
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  } as const,
  actions: {
    justifyContent: "flex-end",
    marginLeft: 10,
  } as const,
};
