import { View, Text } from "react-native";
export default function HomeScreen() {

  return (
    <View className="flex-1 bg-gray-100 p-4">

      <Text className="text-2xl font-bold mb-4">
        Dashboard
      </Text>

      <View className="bg-white p-4 rounded-xl mb-3">
        <Text className="text-gray-500">Clientes activos</Text>
        <Text className="text-2xl font-bold">128</Text>
      </View>

      <View className="bg-white p-4 rounded-xl mb-3">
        <Text className="text-gray-500">Cuentas activas</Text>
        <Text className="text-2xl font-bold">64</Text>
      </View>

      <View className="bg-white p-4 rounded-xl mb-3">
        <Text className="text-gray-500">Por vencer</Text>
        <Text className="text-2xl font-bold text-orange-500">12</Text>
      </View>

      <View className="bg-white p-4 rounded-xl">
        <Text className="text-gray-500">Ingresos del mes</Text>
        <Text className="text-2xl font-bold text-green-600">$1.200.000</Text>
      </View>

    </View>
  );
}

