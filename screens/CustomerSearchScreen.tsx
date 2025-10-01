import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  ListRenderItem,
  Keyboard,
  Alert,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomerSelect from "./CustomerSelect";
import { SearchCustomerFields, SelectedCustomer } from "../types/customerType";
import {
  CustomerItem,
  SQLDataResponse,
} from "../types/apiresponse/searchCustomers";
import { searchCustomers } from "../api/customer";
import { useSelectedCustomer } from "../contex/selectedCustomerContex";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import { MüşteriAramaTipi } from "../types/enums/tria";
import AlertModal from "../component/AlertModal";
import CustomerSelectModal from "../component/CustomerAddModal";
import { use } from "i18next";
import { fetchSqlData } from "../api/generic";
import { SqlData } from "../types/apiresponse/genericResponseType";
import CustomerAddModal from "../component/CustomerAddModal";
import { BussinessProvider } from "../contex/addCustomerModal/bussinessContext";

const { width } = Dimensions.get("window");

const CustomerSearchScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [search, setSearch] = useState<string>("");
  const [filtered, setFiltered] = useState<CustomerItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Müşteri Adına Göre");
  const { selectedCustomer, setSelectedCustomer } = useSelectedCustomer();
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [addCustomerModalVisible, setAddCustomerModalVisible] = useState(false);

  const [searchData, setSearchData] = useState<SearchCustomerFields>({
    WebErisimKullanici: "TRIA_TEST",
    WebErisimSifre: "SFR57220",
    Aranan: "A%%",
    AramaTipi: 0,
    Baslangic: 0,
    Adet: 100,
  });

  //   const handleSearch = (text: string) => {
  //     setSearch(text);
  //     if (text === "") setFiltered([]);
  //     else {
  //       setFiltered((prev) =>
  //         prev.filter(
  //           (item) =>
  //             item.MUSTERI_ADI_SOYADI.toLowerCase().includes(
  //               text.toLowerCase()
  //             ) || item.TC_KIMLIK_NO.includes(text)
  //         )
  //       );
  //     }
  //   };

  const handleSelectCustomer = (customer: CustomerItem) => {
    Keyboard.dismiss();

    setSelectedCustomer({
      id: customer.ID,
      firstName: customer.MUSTERI_ADI,
      lastName: customer.MUSTERI_SOYADI,
      phone: customer.TELEFON_1,
    });
    navigation.goBack();
  };
  const handleSelectOption = () => {
    if (selectedOption === "Müşteri Adına Göre") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 0 }));
    } else if (selectedOption === "Müşteri Soyadına Göre") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 1 }));
    } else if (selectedOption === "Kart Numarasına Göre Ara") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 2 }));
    } else if (selectedOption === "T.C. Numarasına Göre Ara") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 3 }));
    } else if (selectedOption === "GSM'e Göre Ara") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 4 }));
    } else if (selectedOption === "Vergi Numarasına Göre Ara") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 5 }));
    } else if (selectedOption === "Vergi Dairesine Göre Ara") {
      setSearchData((prev) => ({ ...prev, AramaTipi: 6 }));
    } else {
      setSearchData((prev) => ({ ...prev, AramaTipi: 0 })); // default
    }
  };
  useEffect(() => {
    handleSelectOption();
  }, [selectedOption]);
  // const handleCustomerSearch = async () => {
  //   try {
  //     if (!search || search.trim() === "") {
  //       setAlertMessage("Lütfen arma parametresi giriniz");
  //       setAlertModalVisible(true);
  //       return; // Fonksiyondan çık
  //     }
  //     console.log(
  //       "arama verisi aranan tipi konsole yazdırılıyor: ",
  //       searchData
  //     );
  //     const response: SQLDataResponse = await searchCustomers(searchData);
  //     setFiltered(response.DATA ?? []);
  //   } catch (error: any) {
  //     console.error(error);
  //   }
  // };
  const handleCustomerSearch = async () => {
    try {
      if (!search || search.trim() === "") {
        setAlertMessage("Lütfen arama parametresi giriniz");
        setAlertModalVisible(true);
        return;
      }

      console.log(
        "Arama verisi aranan tipi konsole yazdırılıyor: ",
        searchData
      );

      const url = "http://94.54.83.21:8082/TriaRestEczane/MusteriSorgula";

      // Generic fetch ile müşteri verisini alıyoruz

      const response: SqlData<CustomerItem> = await fetchSqlData<CustomerItem>(
        url,
        searchData as unknown as Record<string, unknown>
      );

      // Filtered state'e direkt DATA'yı atıyoruz
      setFiltered(response.DATA ?? []);
    } catch (error: any) {
      console.error("Müşteri arama hatası:", error);
    }
  };

  const renderItem: ListRenderItem<CustomerItem> = ({ item }) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled" // Burayı ekle
      keyboardDismissMode="on-drag"
    >
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.7}
        onPress={() => {
          console.log("seçilen müşteriyi console yazdırıyorum", item);
          handleSelectCustomer(item);
        }}
      >
        <View style={[styles.cell, { width: 120 }]}>
          <Text style={styles.cellLabel}>M.Kodu</Text>
          <Text style={styles.cellValue}>{item.MUSTERI_KODU}</Text>
        </View>
        <View style={[styles.cell, { width: 160 }]}>
          <Text style={styles.cellLabel}>Müşteri Adı</Text>
          <Text style={[styles.cellValue, styles.nameText]}>
            {item.MUSTERI_ADI_SOYADI}
          </Text>
        </View>
        <View style={[styles.cell, { width: 140 }]}>
          <Text style={styles.cellLabel}>T.C. No</Text>
          <Text style={styles.cellValue}>{item.TC_KIMLIK_NO || "-"}</Text>
        </View>
        <View style={[styles.cell, { width: 120 }]}>
          <Text style={styles.cellLabel}>K.Limit</Text>
          <Text style={[styles.cellValue, styles.limitText]}>
            {item.KREDI_LIMITI}
          </Text>
        </View>
        <View style={[styles.cell, { width: 120 }]}>
          <Text style={styles.cellLabel}>Kart No</Text>
          <Text style={styles.cellValue}>{item.KART_NO}</Text>
        </View>
        <View style={[styles.cell, { width: 120 }]}>
          <Text style={styles.cellLabel}>V.Dairesi</Text>
          <Text style={styles.cellValue}>{item.VERGI_DAIRESI}</Text>
        </View>
        <View style={[styles.cell, { width: 120 }]}>
          <Text style={styles.cellLabel}>V.Numarası</Text>
          <Text style={styles.cellValue}>{item.VERGI_NUMARASI}</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Müşteri Arama Listesi</Text>
        <View style={styles.headerLine} />
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <AntDesign
            name="search1"
            size={18}
            color="#666"
            style={styles.searchIcon}
          />
          <TextInput
            value={search}
            onChangeText={(text) => {
              setSearch(text);
              setSearchData((prev) => ({
                ...prev,
                Aranan: text ? `${text}%` : "%%",
              }));
              if (!text) {
                setFiltered([]);
              }
            }}
            placeholder="Müşteri adı veya T.C. ara..."
            style={styles.input}
            placeholderTextColor="#999"
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={styles.clearButton}
            >
              <AntDesign name="closecircle" size={16} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.findButton]}
            onPress={handleCustomerSearch}
          >
            <AntDesign name="search1" size={16} color="#fff" />
            <Text style={styles.buttonText}>Bul</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.tcButton]}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <AntDesign name="idcard" size={16} color="#fff" />
            <Text
              style={[styles.buttonText, { fontSize: 11 }]}
              numberOfLines={2}
            >
              {selectedOption}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.formButton]}
            onPress={() => {
              setAddCustomerModalVisible(true);
            }}
          >
            <Ionicons name="person-add" size={20} color="#fff" />
          </TouchableOpacity>

          {/* <TouchableOpacity style={[styles.iconButton, styles.checkButton]}>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>

      {/* Results Info */}
      <View style={styles.resultsInfo}>
        <Text style={styles.resultsText}>
          {filtered.length} müşteri bulundu
        </Text>
        <Text style={styles.swipeHint}>← Detay için sağa kaydırın →</Text>
      </View>

      {/* Table */}
      {search.length > 0 && (
        <View style={styles.tableContainer}>
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.ID}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      )}
      <View>
        <CustomerSelect
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </View>

      <AlertModal
        visible={alertModalVisible}
        message={alertMessage}
        onClose={() => setAlertModalVisible(false)}
      />
      <BussinessProvider>
        <CustomerAddModal
          visible={addCustomerModalVisible}
          onClose={() => setAddCustomerModalVisible(false)}
        />
      </BussinessProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50",
    textAlign: "center",
  },
  headerLine: {
    height: 3,
    backgroundColor: "#3498db",
    marginTop: 10,
    borderRadius: 2,
  },
  searchContainer: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f4",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 50,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#2c3e50" },
  clearButton: { padding: 5 },
  buttonRow: { flexDirection: "row", gap: 10 },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  findButton: { backgroundColor: "#3498db" },
  tcButton: { backgroundColor: "#27ae60" },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  formButton: { backgroundColor: "#e67e22" },
  checkButton: { backgroundColor: "#27ae60" },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  resultsInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsText: { fontSize: 14, color: "#7f8c8d", fontWeight: "500" },
  swipeHint: { fontSize: 12, color: "#95a5a6", fontStyle: "italic" },
  tableContainer: { flex: 1, paddingHorizontal: 15 },
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cell: { paddingHorizontal: 8 },
  cellLabel: {
    fontSize: 11,
    color: "#7f8c8d",
    fontWeight: "500",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  cellValue: { fontSize: 14, color: "#2c3e50", fontWeight: "600" },
  nameText: { color: "#2980b9", fontWeight: "700" },
  limitText: { color: "#e74c3c", fontWeight: "700" },
  separator: { height: 8 },
});

export default CustomerSearchScreen;
