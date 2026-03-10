import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 16 }}>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Dashboard
      </Text>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 8 }}>
        <Text style={{ color: "#6b7280" }}>Clientes activos</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>128</Text>
      </View>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 8 }}>
        <Text style={{ color: "#6b7280" }}>Cuentas activas</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>64</Text>
      </View>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 8 }}>
        <Text style={{ color: "#6b7280" }}>Por vencer</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#f97316" }}>12</Text>
      </View>

      <View style={{ backgroundColor: "#fff", padding: 16, borderRadius: 12 }}>
        <Text style={{ color: "#6b7280" }}>Ingresos del mes</Text>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#10b981" }}>$1.200.000</Text>
      </View>

    </SafeAreaView>
  );
}

