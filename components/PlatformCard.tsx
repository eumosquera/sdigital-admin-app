import { Text, Image, TouchableOpacity } from "react-native";
import { formatName } from "@/src/utils/formaText";

interface Plataforma {
  id: string;
  nombre: string;
  descripcion?: string;
  logo: string;
  precioBase?: string;
  tipo: string;
  onPress?: () => void;
  onLongPress?: () => void;
}

export default function PlatformCard({
  plataforma,
  onPress,
  onLongPress,
}: {
  plataforma: Plataforma;
  onPress?: () => void;
  onLongPress?: () => void;
}) {
  const API_URL = "https://sdigital-diego-i6x5.vercel.app";
  return (
    <TouchableOpacity
      style={{
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      }}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Image
        source={{ uri: `${API_URL}${plataforma.logo}` }}
        style={{
          width: 50,
          height: 50,
          marginBottom: 8,
          resizeMode: "contain",
          borderRadius: 50,
        }}
        
      />

      <Text
        style={{
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {formatName(plataforma.nombre)}
      </Text>
    </TouchableOpacity>
  );
}
