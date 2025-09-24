// CustomerSelectModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Customer, SelectedCustomer } from "../types/customerType";

// type Customer = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   phone: string;
// };

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (customer: SelectedCustomer) => void;
};

// Varsayılan örnek veri
const customers: SelectedCustomer[] = [
  { id: "1", firstName: "Ahmet", lastName: "Yılmaz", phone: "0532 123 4567" },
  { id: "2", firstName: "Ayşe", lastName: "Demir", phone: "0533 987 6543" },
  { id: "3", firstName: "Mehmet", lastName: "Kaya", phone: "0534 456 7890" },
  { id: "4", firstName: "Fatma", lastName: "Özkan", phone: "0535 321 0987" },
  { id: "5", firstName: "Ali", lastName: "Şahin", phone: "0536 654 3210" },
  { id: "6", firstName: "Zeynep", lastName: "Aktaş", phone: "0537 789 0123" },
];

export default function CustomerSelectModal({
  visible,
  onClose,
  onSelect,
}: Props) {

  const renderItem = ({ item }: { item: SelectedCustomer }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        onSelect(item);
        onClose();
      }}
    >
      <View>
        <Text style={styles.itemName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.itemPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Müşteri Seç</Text>

          <FlatList
            data={customers}
            keyExtractor={(c) => c.id}
            renderItem={renderItem}
            style={{ maxHeight: 250 }}
          />

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  itemPhone: {
    fontSize: 14,
    color: "#666",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    marginTop: 12,
  },
  closeButtonText: { color: "#fff" },
});
