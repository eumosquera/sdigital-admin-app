import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useQueryClient } from "@tanstack/react-query";

import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { Picker } from "@react-native-picker/picker";

import { useCreatePerfil } from "@/hooks/useCreatePerfil";
import { useUpdatePerfil } from "@/hooks/useUpdatePerfil";
import { api } from "@/src/api/axios";
import { useDeletePerfil } from "@/hooks/useDeletePerfil";
import { useCuentas } from "@/hooks/useCuentas";

export default function PerfilForm() {
  const { cuentaId, perfilId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const updatePerfil = useUpdatePerfil();
  const createPerfil = useCreatePerfil();
  const queryClient = useQueryClient();
  const deletePerfil = useDeletePerfil();
  const getCuentas = useCuentas();
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
            cuentaId: Number(cuentaId),
          },
        });
      }
      queryClient.invalidateQueries({ queryKey: ["cuenta", cuentaId] });
      getCuentas.refetch();
      router.back();
    } catch (error) {
      console.error("Error al guardar el perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePerfil = () => {
    if (!perfilId) return;

    Alert.alert("Eliminar perfil", "¿Deseas eliminar este perfil?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => {
          deletePerfil.mutate(
            {
              cuentaId: cuentaId as string,
              perfilId: perfilId as string,
            },
            {
              onSuccess: () => {
                getCuentas.refetch();
                router.back();
              },
            },
          );
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
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
        <View style={{ marginBottom: 20 }}>
          <Text style={{ marginBottom: 6 }}>Perfil</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
          </View>
        </View>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ marginBottom: 6 }}>Pin</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
        </View>
        {perfilId && (
          <View>
            <Text style={{ marginBottom: 6 }}>Estado</Text>

            <View style={styles.inputContainer}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={estado}
                onValueChange={setEstado}
              >
                <Picker.Item label="Libre" value="libre" />
                <Picker.Item label="Renovado" value="renovado" />
                <Picker.Item label="Vendido" value="vendido" />
                <Picker.Item label="Vencido" value="vencido" />
                <Picker.Item label="Soporte" value="en_soporte" />
              </Picker>
            </View>
          </View>
        )}
        <View style={{ marginBottom: 16 }}>
          <TouchableOpacity
            onPress={handleSave}
            style={{
              backgroundColor: "#2563eb",
              padding: 14,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={[styles.saveText, loading && { opacity: 0.6 }]}>
              {loading ? "Guardando..." : "Guardar"}
            </Text>
          </TouchableOpacity>
        </View>

        {perfilId && (
          <View>
            <TouchableOpacity
              disabled={deletePerfil.isPending}
              style={[styles.button, { backgroundColor: "#ef4444" }]}
              onPress={handleDeletePerfil}
            >
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  } as const,

  input: {
    flex: 1,
    paddingVertical: 12,
  } as const,
  saveText: {
    color: "#fff",
    fontWeight: "700",
  } as const,
};
