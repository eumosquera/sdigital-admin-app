import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets  } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { api } from "@/src/api/axios";
import { createCliente, updateCliente } from "@/src/services/clientes.service";
import { useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, User } from "lucide-react-native";

export default function ClienteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [autorizaWhatsapp, setAutorizaWhatsapp] = useState(true);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return;

    const loadCliente = async () => {
      const { data } = await api.get(`/clientes/${id}`);

      setNombre(data.nombre);
      setTelefono(data.telefono);
      setCorreo(data.correo);
      setAutorizaWhatsapp(data.autorizaWhatsapp);
    };

    loadCliente();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    if (id) {
      await updateCliente(id as string, {
        nombre,
        telefono,
        correo,
        autorizaWhatsapp,
      });
      Toast.show({ type: "success", text1: "Cliente actualizado." });
      setLoading(false)
    } else {
      await createCliente({
        nombre,
        telefono,
        correo,
        autorizaWhatsapp,
      });
      Toast.show({ type: "success", text1: "Cliente creado correctamente." });
      setLoading(false)
    }
    //refres
    setLoading(false)
    queryClient.invalidateQueries({ queryKey: ["clientes"] });
    router.back();
  };
  const insets = useSafeAreaInsets();


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView
        style={{ flex: 1, padding: 16, backgroundColor: "#f3f4f6" }}
      >
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 120,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 6 }}>Nombre</Text>

            <View style={styles.inputContainer}>
              <User size={18} color="#2563eb" />
              <TextInput
                placeholder="Nombre completo"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
              />
            </View>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>Correo</Text>

            <View style={styles.inputContainer}>
              <Mail size={18} color="#2563eb" />

              <TextInput
                placeholder="correo@gmail.com"
                value={correo}
                onChangeText={setCorreo}
                style={styles.input}
              />
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>Teléfono</Text>

            <View style={styles.inputContainer}>
              <Phone size={18} color="#2563eb" />
              <TextInput
                placeholder="3000000000"
                value={telefono}
                onChangeText={setTelefono}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>Autoriza envío de mensajes</Text>

            <View style={styles.switchContainer}>
              <Text style={{ color: "#444" }}>
                {autorizaWhatsapp ? "Sí" : "No"}
              </Text>
              <Switch
                value={autorizaWhatsapp}
                onValueChange={setAutorizaWhatsapp}
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>{ loading ? "Guardando...":"GUARDAR" }</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
  
}

const styles = {
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

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
  } as const,

  footer: {
    position: "absolute" as const,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
  } as const,

  saveButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  } as const,

  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  } as const,
};
