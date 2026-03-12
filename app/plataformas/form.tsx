import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { formatName } from "@/src/utils/formaText";

import { api } from "@/src/api/axios";
import {
  createPlataforma,
  updatePlataforma,
} from "@/src/services/plataformas.service";
import { useQueryClient } from "@tanstack/react-query";
import {
  Book,
  Tv,
  Smartphone,
  ImageIcon,
  DollarSign,
} from "lucide-react-native";

const API_URL = "https://sdigital-diego-i6x5.vercel.app";

export default function PlataformaForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [logo, setLogo] = useState("");
  const [precioBase, setPrecioBase] = useState("");
  const [tipo, setTipo] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadPlataforma = async () => {
      const { data } = await api.get(`/plataformas/${id}`);

      setNombre(data.nombre);
      setDescripcion(data.descripcion);
      setLogo(data.logo);
      setPrecioBase(data.precioBase);
      setTipo(data.tipo);
    };

    loadPlataforma();
  }, [id]);

  const handleSave = async () => {
    setLoading(true);
    if (id) {
      await updatePlataforma(id as string, {
        nombre,
        descripcion,
        logo,
        precioBase,
        tipo,
      });
      Toast.show({ type: "success", text1: "Plataforma actualizada." });
      setLoading(false);
    } else {
      await createPlataforma({
        nombre,
        descripcion,
        logo,
        precioBase,
        tipo,
      });
      Toast.show({
        type: "success",
        text1: "Plataforma creada correctamente.",
      });
      setLoading(false);
    }
    //refres
    setLoading(false);
    queryClient.invalidateQueries({ queryKey: ["plataformas"] });
    router.back();
  };

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
              <Smartphone size={18} color="#2563eb" />
              <TextInput
                placeholder="Nombre completo"
                value={formatName(nombre)}
                onChangeText={setNombre}
                style={styles.input}
              />
            </View>
          </View>
          <Text style={{ marginBottom: 6 }}>Tipo</Text>

          <View style={styles.inputContainer}>
            <Tv size={18} color="#2563eb" />

            <Picker
              selectedValue={tipo}
              style={{ flex: 1 }}
              onValueChange={(itemValue) => setTipo(itemValue)}
            >
              <Picker.Item label="Tipo" value="Seleccione" />
              <Picker.Item label="Streaming" value="STREAMING" />
            </Picker>
          </View>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>Precio base</Text>

            <View style={styles.inputContainer}>
              <DollarSign size={18} color="#2563eb" />
              <TextInput
                placeholder="100000"
                value={precioBase}
                onChangeText={setPrecioBase}
                style={styles.input}
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <Text style={{ marginBottom: 6 }}>Logo</Text>

          <View style={styles.inputContainer}>
            <ImageIcon size={18} color="#2563eb" />

            <TextInput
              placeholder="/images/netflix.webp"
              value={logo}
              onChangeText={setLogo}
              style={styles.input}
            />
          </View>
          {logo && (
            <Image
              source={{ uri: `${API_URL}${logo}` }}
              style={{
                width: 60,
                height: 60,
                alignSelf: "center",
                marginTop: 10,
                resizeMode: "contain",
              }}
            />
          )}

          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>Descripción</Text>

            <View style={styles.inputContainer}>
              <Book size={18} color="#2563eb" />

              <TextInput
                placeholder="Descripción"
                value={descripcion}
                onChangeText={setDescripcion}
                style={styles.input}
                
              />
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveText}>
              {loading ? "Guardando..." : "GUARDAR"}
            </Text>
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
