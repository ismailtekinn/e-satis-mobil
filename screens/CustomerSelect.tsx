// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
// } from "react-native";
// import { AddProduct, MinimalProduct, Product } from "../types/productType";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";

// import { getProductList } from "../api/product";
// import { useSelectedProduct } from "../contex/selectedProductContext";
// import { RootStackParamList } from "../types";

// const CustomerSelect = () => {
//   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Ara"
//         />
//       </View>

//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => navigation.navigate("AddNew")}
//       >
//         <Text style={styles.addButtonText}>+ Müşteri Ekle</Text>
//       </TouchableOpacity>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   searchContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   searchInput: {
//     flex: 1,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     marginRight: 8,
//     fontSize: 16,
//   },
//   clearText: {
//     fontSize: 18,
//     color: "#555",
//   },
//   addButton: {
//     backgroundColor: "#007bff",
//     padding: 12,
//     borderRadius: 8,
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   productList: {
//     marginTop: 8,
//   },
//   productContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 12,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   productInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   productIcon: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: "#f8f9fa",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   productName: {
//     fontSize: 16,
//   },
//   quantityBox: {
//     padding: 6,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
// });

// export default CustomerSelect;
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type CustomerSelectProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedOption: string;
  setSelectedOption: (option: string) => void;
};

const searchOptions = [
  { id: "1", title: "Müşteri Adına Göre", icon: "user" },
  { id: "2", title: "Müşteri Soyadına Göre", icon: "contacts" },
  { id: "3", title: "T.C. Numarasına Göre", icon: "idcard" },
  { id: "4", title: "Kart Numarasına Göre Ara", icon: "creditcard" },
  { id: "5", title: "GSM'e Göre Ara", icon: "mobile1" },
  { id: "6", title: "Vergi Dairesine Göre Ara", icon: "bank" },
  { id: "7", title: "Vergi Numarasına Göre Ara", icon: "filetext1" },
];

const CustomerSelect: React.FC<CustomerSelectProps> = ({
  modalVisible,
  setModalVisible,
  selectedOption,
  setSelectedOption,
}) => {
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setModalVisible(false);
  };

  const renderOption = ({ item, index }: { item: any; index: number }) => {
    const isSelected = selectedOption === item.title;
    const isLast = index === searchOptions.length - 1;

    return (
      <TouchableOpacity
        style={[
          styles.optionItem,
          isSelected && styles.selectedItem,
          isLast && styles.lastItem,
        ]}
        onPress={() => handleSelectOption(item.title)}
        activeOpacity={0.7}
      >
        <View style={styles.optionContent}>
          <View
            style={[
              styles.iconContainer,
              isSelected && styles.selectedIconContainer,
            ]}
          >
            <AntDesign
              name={item.icon as any}
              size={18}
              color={isSelected ? "#fff" : "#3498db"}
            />
          </View>
          <Text style={[styles.optionText, isSelected && styles.selectedText]}>
            {item.title}
          </Text>
          {isSelected && (
            <AntDesign name="checkcircle" size={18} color="#27ae60" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPressOut={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Arama Seçenekleri</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <AntDesign name="close" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.modalContent}>
            <Text style={styles.subtitle}>
              Hangi kritere göre arama yapmak istiyorsunuz?
            </Text>

            <FlatList
              data={searchOptions}
              keyExtractor={(item) => item.id}
              renderItem={renderOption}
              showsVerticalScrollIndicator={false}
              style={styles.optionsList}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(44, 62, 80, 0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  closeButton: {
    backgroundColor: "#ff4d4d",
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 16,
    lineHeight: 20,
  },
  optionsList: {
    // maxHeight: 320,
  },
  optionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
    paddingVertical: 0,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  selectedItem: {
    backgroundColor: "#f8f9fa",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#ebf3fd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  selectedIconContainer: {
    backgroundColor: "#3498db",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },
  selectedText: {
    color: "#2c3e50",
    fontWeight: "600",
  },
  modalFooter: {
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
    padding: 16,
    backgroundColor: "#ff4d4d",
  },
  cancelButton: {
    alignSelf: "center",

    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});

export default CustomerSelect;
