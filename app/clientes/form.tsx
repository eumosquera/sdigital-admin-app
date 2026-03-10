import { TextInput, Button, Switch, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message"

import { createCliente, updateCliente } from "@/src/services/clientes.service";
import { api } from "@/src/api/axios";
import { useQueryClient } from "@tanstack/react-query";

export default function ClienteForm() {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [autorizaWhatsapp, setAutorizaWhatsapp] = useState(true);

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
    if (id) {
      await updateCliente(id as string, {
        nombre,
        telefono,
        correo,
        autorizaWhatsapp,
      });
      Toast.show({type: "success",
        text1: "Cliente actualizado."
      })
    } else {
      await createCliente({
        nombre,
        telefono,
        correo,
        autorizaWhatsapp,
      });
      Toast.show({type: "success",
        text1: "Cliente creado correctamente."
      })
    }
    //refres
    queryClient.invalidateQueries({ queryKey: ["clientes"] });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ color: "#444", padding: 8 }}>Nombre</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
        }}
      />
      <Text style={{ color: "#444", padding: 8 }}>Correo</Text>
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
        }}
      />
      <Text style={{ color: "#444", padding: 8 }}>Telefono</Text>
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={{
          borderWidth: 1,
          borderColor: "#ddd",
          padding: 12,
          borderRadius: 10,
          marginBottom: 12,
        }}
      />
      <View style={{ marginBottom: 14 }}>
        <Text style={{ marginBottom: 6 }}>Autoriza envío de mensajes</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#fff",
            borderWidth: 1,
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor: "#ddd",
          }}
        >
          <Text style={{ color: "#444" }}>
            {autorizaWhatsapp ? "Sí" : "No"}
          </Text>
          <Switch
            value={autorizaWhatsapp}
            onValueChange={setAutorizaWhatsapp}
          />
        </View>
      </View>

      <Button title="Guardar" onPress={handleSave} />
    </SafeAreaView>
  );
}
