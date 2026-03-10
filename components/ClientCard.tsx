import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Phone, Pencil, Trash } from "lucide-react-native";

type Props = {
  id: string;
  nombre: string;
  telefono?: string;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function ClientCard({
  nombre,
  telefono,
  onPress,
  onEdit,
  onDelete,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      
      <View style={styles.header}>
        <Text style={styles.nombre}>{nombre}</Text>
      </View>

      {telefono && (
        <View style={styles.phoneContainer}>
          <Phone size={16} color="#666" />
          <Text style={styles.telefono}>{telefono}</Text>
        </View>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={onEdit}>
          <Pencil size={18} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={onDelete}>
          <Trash size={18} color="#dc2626" />
        </TouchableOpacity>
      </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2
  },

  header: {
    marginBottom: 6
  },

  nombre: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111"
  },

  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4
  },

  telefono: {
    color: "#555",
    fontSize: 14
  },

  actions: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "flex-end",
    gap: 16
  },

  actionBtn: {
    padding: 4
  }

});