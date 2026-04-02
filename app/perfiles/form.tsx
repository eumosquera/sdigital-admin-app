import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { Picker } from "@react-native-picker/picker";

import { useCreatePerfil } from "@/hooks/useCreatePerfil";
import { useUpdatePerfil } from "@/hooks/useUpdatePerfil";
import { api } from "@/src/api/axios";

export default function PerfilForm() {
  const { cuentaId, perfilId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updatePerfil = useUpdatePerfil();
  const createPerfil = useCreatePerfil();

  const [nombre, setNombre] = useState("");
  const [pin, setPin] = useState("");
  const [estado, setEstado] = useState("libre");

  useEffect(() => {
    if (!cuentaId || !perfilId) return;

    const loadPerfil = async () => {
      const { data } = await api.get(
        `/cuentas/${cuentaId}/detalles/${perfilId}`,
      );

      setNombre(data.perfil);
      setPin(data.pin);
      setEstado(data.estado);
    };

    loadPerfil();
  }, [cuentaId, perfilId]);
  const handleSave = () => {
    try {
      setLoading(true);
      if (perfilId) {
        updatePerfil.mutate({
          cuentaId: cuentaId as string,
          perfilId: perfilId as string,
          perfil: {
            perfil: nombre,
            pin,
            estado,
          },
        });
      } else {
        createPerfil.mutate({
          cuentaId: cuentaId as string,
          perfil: {
            perfil: nombre,
            pin,
            estado,
          },
        });
      }
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: "#f3f4f6",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          textAlign: "center",
          marginBottom: 20,
          color: "#2563eb",
        }}
      >
        {perfilId ? "Editar perfil" : "Nuevo perfil"}
      </Text>

      <Text>Nombre perfil</Text>

      <TextInput
        value={nombre}
        onChangeText={setNombre}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 14,
        }}
      />

      <Text>PIN</Text>

      <TextInput
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 14,
        }}
      />

      <Text>Estado</Text>

      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Picker selectedValue={estado} onValueChange={setEstado}>
          <Picker.Item label="Libre" value="libre" />
          <Picker.Item label="Renovado" value="renovado" />
          <Picker.Item label="Vendido" value="Vendido" />
          <Picker.Item label="Vencido" value="Vencido" />
          <Picker.Item label="Soporte" value="en_soporte" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleSave}
        style={{
          backgroundColor: "#2563eb",
          padding: 14,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}
        >
          { loading ? "Guardando...":"Guardar" }
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
