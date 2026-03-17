import { View, Text, Image, Pressable } from "react-native";
import { getCuentaStatus } from "@/src/utils/cuentaStatus";
import { formatDate, getExpirationText } from "@/src/utils/formatDate";
const API_URL = "https://sdigital-diego-i6x5.vercel.app";

export default function CuentaCard({ cuenta, onPress }: any) {
  const status = getCuentaStatus(cuenta);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: "#fff",
          borderRadius: 14,
          padding: 16,
          marginBottom: 14,

          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowRadius: 6,

          elevation: 2,
        },

        pressed && { transform: [{ scale: 0.97 }] },
      ]}
    >
      {/* LOGO */}

      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <Image
          source={{ uri: `${API_URL}${cuenta.plataforma.logo}` }}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
          }}
        />
      </View>

      {/* EMAIL */}

      <Text
        style={{
          textAlign: "center",
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        {cuenta.correo}
      </Text>

      {/* STATUS */}

      <View
        style={{
          alignSelf: "center",
          marginTop: 8,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 10,
          backgroundColor: status.color + "20",
        }}
      >
        <Text
          style={{
            color: status.color,
            fontWeight: "600",
            fontSize: 12,
          }}
        >
          {status.label}
        </Text>
      </View>

      {/* FECHA */}

      <Text style={{ textAlign: "center", marginTop: 8, color: "#666" }}>
        Vence: {formatDate(cuenta.fechaVencimiento)} •{" "}
        {getExpirationText(cuenta.fechaVencimiento)}
      </Text>

      {/* STOCK */}

      <Text
        style={{
          textAlign: "center",
          marginTop: 4,
          fontSize: 13,
          color: "#333",
        }}
      >
        Stock: {cuenta.stock} perfiles
      </Text>

      {/* PRECIO */}

      <Text
        style={{
          textAlign: "center",
          marginTop: 8,
          fontWeight: "700",
          fontSize: 16,
          color: "#dc2626",
        }}
      >
        ${cuenta.precioVenta} COP
      </Text>
    </Pressable>
  );
}
