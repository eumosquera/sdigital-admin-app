import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { formatName } from "@/src/utils/formaText";
import { PLATFORM_LOGOS, getPlatformSuggestions } from "@/src/utils/logos";

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
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
    try {
      setLoading(true);
      if (id) {
        await updatePlataforma(id as string, {
          nombre: formatName(nombre),
          descripcion,
          logo,
          precioBase,
          tipo,
        });
        Toast.show({ type: "success", text1: "Plataforma actualizada." });
      } else {
        await createPlataforma({
          nombre: formatName(nombre),
          descripcion,
          logo,
          precioBase,
          tipo,
        });
        Toast.show({
          type: "success",
          text1: "Plataforma creada correctamente.",
        });
      }
      //refres
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["plataformas"] });
      router.back();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error guardando plataforma",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNombreChange = (value: string) => {
    setNombre(value);

    const matches = getPlatformSuggestions(value);

    setSuggestions(matches);

    if (matches.length > 0) {
      const firstMatch = matches[0];
      setLogo(PLATFORM_LOGOS[firstMatch]);
    }
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
                placeholder="Nombre"
                value={nombre}
                onChangeText={handleNombreChange}
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
              <Picker.Item label="<Tipo>" value="Seleccione" />
              <Picker.Item label="Streaming" value="STREAMING" />
              <Picker.Item label="Música" value="MUSICA" />
              <Picker.Item label="Gaming" value="GAMING" />
              <Picker.Item label="TV" value="TV" />
              <Picker.Item label="Otro" value="OTRO" />
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
                keyboardType="numeric"
              />
            </View>
          </View>

          <Text style={{ marginBottom: 6 }}>Logo</Text>

          <View style={styles.inputContainer}>
            <ImageIcon size={18} color="#2563eb" />

            <TextInput
              placeholder="url logo"
              value={logo}
              onChangeText={setLogo}
              style={styles.input}
            />
            {suggestions.length > 0 && (
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  marginTop: 6,
                }}
              >
                {suggestions.slice(0, 5).map((item) => (
                  <TouchableOpacity
                    key={item}
                    onPress={() => {
                      setNombre(item);
                      setLogo(PLATFORM_LOGOS[item]);
                      setSuggestions([]);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                  >
                    <Image
                      source={{ uri: `${API_URL}${PLATFORM_LOGOS[item]}` }}
                      style={{
                        width: 24,
                        height: 24,
                        marginRight: 10,
                        resizeMode: "contain",
                        borderRadius: 50,
                      }}
                    />

                    <Text>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
                borderRadius: 50,
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
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveButton}
            disabled={loading}
          >
            <Text style={[styles.saveText, loading && { opacity: 0.6 }]}>
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
