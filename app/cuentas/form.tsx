import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { api } from "@/src/api/axios";
import { useQueryClient } from "@tanstack/react-query";
import { formatName } from "@/src/utils/formaText";
import { formatDateToSave, formatDate } from "@/src/utils/formatDate";

import { createCuenta, updateCuenta } from "@/src/services/cuentas.service";

type Plataforma = {
  id: number;
  nombre: string;
};

export default function CuentaForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [estado, setEstado] = useState("");
  const [fechaCompra, setFechaCompra] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [plataformaId, setPlataformaId] = useState("");
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [showFechaCompra, setShowFechaCompra] = useState(false);
  const [showFechaVencimiento, setShowFechaVencimiento] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const loadCuenta = async () => {
      const { data } = await api.get(`/cuentas/${id}`);
      setCorreo(data.correo);
      setContrasena(data.contrasena);
      setProveedor(data.proveedor);
      setEstado(data.estado);
      setFechaCompra(data.fechaCompra.split("T")[0]);
      setFechaVencimiento(data.fechaVencimiento.split("T")[0]);
      setPrecioCompra(data.precioCompra.toString());
      setPrecioVenta(data.precioVenta.toString());
      setPlataformaId(data.plataformaId.toString());
    };

    loadCuenta();
  }, [id]);

  useEffect(() => {
    const fetchPlataformas = async () => {
      const { data } = await api.get("/plataformas");
      setPlataformas(data);
    };
    fetchPlataformas();
  }, []);

  const handleSave = async () => {
    try {
      setLoading(true);
      if (id) {
        await updateCuenta(id as string, {
          correo,
          contrasena,
          proveedor,
          estado,
          fechaCompra,
          fechaVencimiento,
          precioCompra: parseFloat(precioCompra),
          precioVenta: parseFloat(precioVenta),
          plataformaId: parseInt(plataformaId),
        });
        Toast.show({ type: "success", text1: "Cuenta actualizada." });
        router.back();
      } else {
        const cuenta = await createCuenta({
          correo,
          contrasena,
          proveedor,
          estado,
          fechaCompra,
          fechaVencimiento,
          precioCompra: parseFloat(precioCompra),
          precioVenta: parseFloat(precioVenta),
          plataformaId: parseInt(plataformaId),
        });
        Toast.show({
          type: "success",
          text1:
            "Cuenta creada correctamente. \n Redirigiendo a la vista de detalles.",
        });

        router.push(`/cuentas/detalle?id=${cuenta.id}`);
      }
    } catch (error) {
      console.error("Error al guardar cuenta:", error);
      Toast.show({ type: "error", text1: "Error al guardar la cuenta." });
    } finally {
      //refres
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["cuentas"] });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 16 }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 10,
            color: "#2563eb",
          }}
        >
          {id ? "Editar cuenta" : "Nueva cuenta"}
        </Text>

        <ScrollView className="flex-1 bg-white px-4 pt-4">
          {/* PLATAFORMA */}
          <View style={{ marginBottom: 10 }}>
            <Text style={{ marginBottom: 6 }}>Plataforma</Text>
            <View style={styles.inputContainer}>
              <Picker
                style={{ flex: 1 }}
                selectedValue={Number(plataformaId)}
                onValueChange={(value) => setPlataformaId(value.toString())}
              >
                <Picker.Item label="Selecciona una plataforma" value={0} />

                {plataformas.map((p) => (
                  <Picker.Item
                    key={p.id}
                    label={formatName(p.nombre)}
                    value={p.id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {/* Correo */}
          <View style={{ marginBottom: 16 }}>
            <Text style={{ marginBottom: 6 }}>Correo</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Correo"
                value={correo}
                onChangeText={setCorreo}
              />
            </View>
          </View>
          {/* Contraseña y proveedor */}
          <View style={{ marginBottom: 16 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 6 }}>Contraseña</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Contraseña"
                    value={contrasena}
                    onChangeText={setContrasena}
                  />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 6 }}>Proveedor</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Proveedor"
                    value={proveedor}
                    onChangeText={setProveedor}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* FECHAS */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 6 }}>Fecha compra</Text>

                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={() => setShowFechaCompra(true)}
                >
                  <Text>{formatDate(fechaCompra) || "Seleccione fecha 🗓️"}</Text>
                </TouchableOpacity>

                {showFechaCompra && (
                  <DateTimePicker
                    value={fechaCompra ? new Date(fechaCompra) : new Date()}
                    mode="date"
                    display="compact"
                    onChange={(event, selectedDate) => {
                      setShowFechaCompra(false);

                      if (selectedDate) {
                        setFechaCompra(formatDateToSave(selectedDate));
                      }
                    }}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 6 }}>Fecha vencimiento</Text>

                <TouchableOpacity
                  style={styles.inputContainer}
                  onPress={() => setShowFechaVencimiento(true)}
                >
                  <Text>{formatDate(fechaVencimiento) || "Seleccione fecha 🗓️"}</Text>
                </TouchableOpacity>

                {showFechaVencimiento && (
                  <DateTimePicker
                    value={
                      fechaVencimiento ? new Date(fechaVencimiento) : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowFechaVencimiento(false);
                      if (selectedDate) {
                        setFechaVencimiento(formatDateToSave(selectedDate));
                      }
                    }}
                  />
                )}
              </View>
            </View>
          </View>
          {/* Precios */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 6 }}>Precio compra</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="$.000.00"
                    keyboardType="numeric"
                    value={precioCompra}
                    onChangeText={setPrecioCompra}
                  />
                </View>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: 6 }}>Precio venta</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="$.000.00"
                    keyboardType="numeric"
                    value={precioVenta}
                    onChangeText={setPrecioVenta}
                  />
                </View>
              </View>
            </View>
          </View>

          {id && (
            <View>
              <Text style={{ marginBottom: 10 }}>Estado</Text>

              <View style={styles.inputContainer}>
                <Picker
                  style={{ flex: 1 }}
                  selectedValue={estado}
                  onValueChange={setEstado}
                >
                  <Picker.Item label="Disponible" value="disponible" />
                  <Picker.Item label="Vencida" value="vencida" />
                  <Picker.Item label="Agotada" value="agotada" />
                  <Picker.Item label="En soporte" value="en_soporte" />
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
        </ScrollView>
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
