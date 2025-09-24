import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BarCodeScanResult from "./BarcodeScannerPage";
import { LinearGradient } from "expo-linear-gradient";
import SalesCard from "../component/SalesCard";
import { SaleItem, SaleItemDeneme, SaleProduct } from "../types/saleType";
import OnScreenKeyboard from "../component/OnScreenKeyboard";
import VirtualKeyboard from "react-native-virtual-keyboard";
import CustomKeyboard from "../component/PinKeyboard";
import SaleScreenModal from "../component/SaleScreenModal";
import CustomerSelectModal from "../component/CustomerSelectModal";
import { SelectedCustomer } from "../types/customerType";
import ActionModalExample from "../component/ActionModalExample";
import { ModalType } from "../types/modalType";
import BaseModalManager from "../component/BaseModalManager";

export const sampleSalesDeneme: SaleItemDeneme[] = [
  {
    Index: 1,
    ProductName: "KATILIM PAYI",
    Barcode: 2222,
    Stock: 1,
    Price: 0.01,
    VatRate: 10,
    Rayon: "Reyon 1",
    Currency: "TL",
  },
  {
    Index: 2,
    ProductName: "FİYAT FARKI",
    Barcode: 3333,
    Stock: 1,
    Price: 0.01,
    VatRate: 10,
    Rayon: "Reyon 2",
    Currency: "TL",
  },
  {
    Index: 3,
    ProductName: "İLAÇ %1",
    Barcode: 7777,
    Stock: 1,
    Price: 0.01,
    VatRate: 1,
    Rayon: "Reyon 3",
    Currency: "TL",
  },
];

export const sampleProductsDeneme: SaleItemDeneme[] = [
  {
    Index: 1,
    ProductName: "Parol 500mg 20 Tablet",
    Barcode: 1234567890123,
    Stock: 25,
    Price: 14900.99,
    VatRate: 18,
    Rayon: "Reyon 1",
    Currency: "TL",
  },
  {
    Index: 2,
    ProductName: "Augmentin 1000mg 14 Tablet",
    Barcode: 2345678901234,
    Stock: 12,
    Price: 790000.5,
    VatRate: 8,
    Rayon: "Reyon 2",
    Currency: "TL",
  },
  {
    Index: 3,
    ProductName: "Aspirin Protect 100mg 30 Tablet",
    Barcode: 3456789012345,
    Stock: 7,
    Price: 120.0,
    VatRate: 1,
    Rayon: "Reyon 3",
    Currency: "TL",
  },
  {
    Index: 4,
    ProductName: "Majezik 100mg 15 Tablet",
    Barcode: 4567890123456,
    Stock: 30,
    Price: 35.75,
    VatRate: 18,
    Rayon: "Reyon 1",
    Currency: "TL",
  },
  {
    Index: 5,
    ProductName: "Vermidon 500mg 20 Tablet",
    Barcode: 5678901234567,
    Stock: 0,
    Price: 15.0,
    VatRate: 8,
    Rayon: "Reyon 4",
    Currency: "TL",
  },
  {
    Index: 6,
    ProductName: "Vermidon 500mg 20 Tablet",
    Barcode: 5678901234567,
    Stock: 0,
    Price: 15.0,
    VatRate: 8,
    Rayon: "Reyon 4",
    Currency: "TL",
  },
  {
    Index: 7,
    ProductName: "Vermidon 500mg 20 Tablet",
    Barcode: 5678901234567,
    Stock: 0,
    Price: 15.0,
    VatRate: 8,
    Rayon: "Reyon 4",
    Currency: "TL",
  },
];

const screenHeight = Dimensions.get("window").height;

const SalesScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [searchProducts, setSearchProducts] = useState(sampleProductsDeneme);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);
  // const [selectedSale, setSelectedSales] = useState<SaleItemDeneme[]>([]);
  const [selectedSale, setSelectedSales] =
    useState<SaleItemDeneme[]>(sampleProductsDeneme);
  const [searchBoxY, setSearchBoxY] = useState(0);
  const [searchBoxHeight, setSearchBoxHeight] = useState(0);
  const [saleModalVisible, setSaleModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomer>();

  const KEYBOARD_HEIGHT = screenHeight * 0.3;
  const ITEM_HEIGHT = 500;
  const MAX_HEIGHT = 500;
  const dynamicHeight = Math.min(
    searchProducts.length * ITEM_HEIGHT,
    MAX_HEIGHT
  );
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const newSectionMaxHeight =
    screenHeight - searchBoxHeight - KEYBOARD_HEIGHT - screenHeight * 0.1;

  useEffect(() => {
    if (!searchText.trim()) {
      setSearchProducts([]);
      return;
    }

    const filtered = sampleProductsDeneme.filter((product) =>
      product.ProductName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchProducts(filtered);
    0;
  }, [searchText]);

  const handleSelectProduct = (item: SaleItemDeneme) => {
    setSelectedSales((prev) => {
      // listede aynı barkod var mı?
      const index = prev.findIndex((p) => p.Barcode === item.Barcode);

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          Stock: updated[index].Stock + 1,
        };
        return updated;
      }
      return [...prev, item];
    });

    setSearchText("");
  };
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* <LinearGradient
          colors={["#667eea", "#64b6ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.backgroundGradient}
        /> */}
        <LinearGradient
          colors={["#fefefe", "#fefefe"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.backgroundGradient}
        />

        {/*müşteri seçme butonunu olduğu kısım */}
        <View style={styles.customerHeader}>
          <Text style={styles.customerName}>
            {selectedCustomer
              ? `${selectedCustomer.firstName} ${selectedCustomer.lastName} ${selectedCustomer.phone}`
              : "Müşteri Seçilmedi"}

            {/* İsmail Tekin */}
          </Text>
          <TouchableOpacity
            style={styles.selectCustomerBtn}
            onPress={() => setCustomerModalVisible(true)}
            // onPress={() => setCustomerModalVisible(true)}
          >
            <Text style={styles.selectCustomerBtnText}>Müşteri Seç</Text>
          </TouchableOpacity>
        </View>
        {/* arama textboxının */}
        <View style={styles.searchRow}>
          <View
            style={styles.searchBox}
            onLayout={(event) => {
              const { y, height } = event.nativeEvent.layout;
              setSearchBoxY(y);
              setSearchBoxHeight(height);
            }}
          >
            <Ionicons
              name="search"
              size={20}
              color="#777"
              style={{ marginHorizontal: 6 }}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Ürün ara"
              value={searchText}
              onChangeText={setSearchText}
              // showSoftInputOnFocus={false} // RN 0.66+
              // editable={false}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons
                  name="close-circle"
                  size={20}
                  color="#999"
                  style={{ marginHorizontal: 6 }}
                />
              </TouchableOpacity>
            )}
          </View>
          {searchText.trim() && (
            <View
              style={[
                styles.newSection,
                {
                  top: searchBoxY + searchBoxHeight,
                  maxHeight: newSectionMaxHeight,
                },
              ]}
            >
              {searchProducts.length > 0 ? (
                <FlatList
                  data={searchProducts}
                  keyExtractor={(item) => item.Index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.customerItem}>
                      {/* Ürün adı */}
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons
                          name="cube-outline"
                          size={20}
                          color="#007AFF"
                        />
                        <Text style={styles.clientName}>
                          {item.ProductName}
                        </Text>
                      </View>

                      {/* Barkod */}
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons
                          style={{ marginLeft: 10 }}
                          name="barcode"
                          size={20}
                          color="#007AFF"
                        />
                        <Text style={styles.clientPhone}>
                          Barkod: {item.Barcode}
                        </Text>
                      </View>
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons
                          style={{ marginLeft: 10 }}
                          name="percent" // KDV ikonu
                          size={20}
                          color="#007AFF"
                        />
                        <Text style={styles.clientPhone}>
                          KDV: {item.VatRate}
                        </Text>
                      </View>

                      {/* Stok */}
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons
                          style={{ marginLeft: 10 }}
                          name="layers-outline"
                          size={20}
                          color="#007AFF"
                        />
                        <Text style={styles.clientPhone}>
                          Stok: {item.Stock}
                        </Text>
                      </View>

                      {/* Reyon */}
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons
                          style={{ marginLeft: 10 }}
                          name="storefront-outline"
                          size={20}
                          color="#007AFF"
                        />
                        <Text style={styles.clientPhone}>
                          Reyon: {item.Rayon}
                        </Text>
                      </View>
                      <View style={styles.infoRow}>
                        <MaterialCommunityIcons
                          style={{ marginLeft: 10 }}
                          name="currency-try" // Fiyat ikonu
                          size={20}
                          color="#007AFF"
                        />

                        <Text style={styles.clientPhone}>
                          Fiyat: {item.Price}
                        </Text>
                      </View>

                      {/* Seç butonu */}
                      <TouchableOpacity
                        style={styles.selectBtn}
                        onPress={() => handleSelectProduct(item)}
                      >
                        <Text style={styles.selectBtnText}>Seç</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  // style={{ maxHeight: 250 }}
                  style={{ maxHeight: dynamicHeight }}
                />
              ) : (
                <Text style={styles.noDataText}>Ürün bulunamadı</Text>
              )}
            </View>
          )}
          <TouchableOpacity
            style={styles.barcodeBtn}
            onPress={() => setIsScannerVisible(true)}
          >
            <Ionicons name="barcode-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {isScannerVisible && (
          <BarCodeScanResult
            onBarcodeScanned={(data) => {
              setIsScannerVisible(false);
              setSearchText(String(data));
            }}
            onClose={() => setIsScannerVisible(false)}
          />
        )}

        {/* seçilen ürünlerin listelendiği kısım */}
        <View
          style={{
            position: "absolute",
            top: 2 * (searchBoxY + searchBoxHeight) + 10, // Arama kutusunun hemen altından başlar
            left: 0,
            right: 0,
            borderRadius: 10,
            bottom: searchBoxY, // Klavyenin üstüne kadar biter
          }}
        >
          <FlatList
            data={selectedSale}
            keyExtractor={(item, index) => `${item.Barcode}-${index}`}
            renderItem={({ item, index }) => (
              <SalesCard product={item} orderNumber={index + 1} />
            )}
            contentContainerStyle={{ paddingRight: 63 }}
          />
        </View>

        {/* sağdaki menü butonların ayarlandığı kısım */}

        <View
          style={[
            styles.fabContainer,
            { top: 2.6 * (searchBoxY + searchBoxHeight) },
          ]}
        >
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#ff7f50" }]}
            onPress={() => setActiveModal("action")}
          >
            <Ionicons name="apps" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#20b2aa" }]}
            onPress={() => console.log("Button 2 pressed")}
          >
            <Ionicons name="document-text" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#4CAF50" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="pricetag" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#2196F3" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="person" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#FFB74D" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="document-text-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#9370db" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons
              name="ellipsis-horizontal-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#1E90FF" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="flash-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#FF3B30" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="stop-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* altta menü butonların ayarlandığı kısım */}
        {/* <View style={styles.leftFabContainer}>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#9370db" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ioniconss
              name="ellipsis-horizontal-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#1E90FF" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="flash-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: "#FF3B30" }]}
            onPress={() => setSaleModalVisible(true)}
          >
            <Ionicons name="stop-circle-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View> */}
        {/* Menü işlem modalı */}
        <Modal
          visible={isMenuModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setIsMenuModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Menü</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Menü 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Menü 2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Menü 3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setIsMenuModalVisible(false)}
              >
                <Text style={styles.closeBtnText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Klavye componentinin eklendiği kısım */}
        {/* <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <OnScreenKeyboard
            height={KEYBOARD_HEIGHT}
            onKey={(char) => setSearchText((prev) => prev + char)}
            onBackspace={() => setSearchText((prev) => prev.slice(0, -1))}
          />
        </View> */}

        <SaleScreenModal
          visible={saleModalVisible}
          onClose={() => setSaleModalVisible(false)}
        />
        <CustomerSelectModal
          visible={customerModalVisible}
          onClose={() => setCustomerModalVisible(false)}
          onSelect={(customer: SelectedCustomer) =>
            setSelectedCustomer(customer)
          }
        />
        <BaseModalManager
          type={activeModal}
          visible={activeModal !== null}
          onClose={() => setActiveModal(null)}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 8 },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 16,
  },

  customerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  customerName: {
    fontSize: 18,
    fontWeight: "600",
    // color: "#fff",
    color: "#333",
  },

  selectCustomerBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  selectCustomerBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  searchInput: {
    flex: 1,
    height: screenHeight * 0.06,
    fontSize: 16,
    color: "#333",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingRight: 6,
  },

  barcodeBtn: {
    marginLeft: 10,
    backgroundColor: "#2b6ef2",
    padding: 10,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  searchResultsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  productName: { fontSize: 16, fontWeight: "600", color: "#222" },
  productId: { fontSize: 12, color: "#888" },
  addBtn: { padding: 4 },

  separator: { height: 1, backgroundColor: "#eee", marginLeft: 38 },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 14,
  },

  fabContainer: {
    position: "absolute",
    right: 6,
    borderRadius: 10,
    flexDirection: "column",
    // gap: 12,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  leftFabContainer: {
    position: "absolute",
    right: 56 + 12,
    top: 70 + 4.8 * 68, // 70 + 340 = 410
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 16 },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: { fontSize: 16, color: "#333" },
  closeBtn: {
    marginTop: 16,
    backgroundColor: "#2b6ef2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  closeBtnText: { color: "#fff", fontWeight: "700" },
  backgroundGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  newSection: {
    position: "absolute", // SearchBox’un hemen altında açılır gibi
    top: 50, // SearchBox yüksekliğine göre ayarlayın
    left: 0, // container padding ile aynı
    right: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    zIndex: 10,
    maxHeight: 500,
  },

  customerItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  clientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 6,
  },

  clientPhone: {
    fontSize: 14,
    color: "#555",
    marginLeft: 6,
  },

  noDataText: {
    textAlign: "center",
    color: "#999",
    fontSize: 14,
    marginVertical: 12,
  },

  selectBtn: {
    backgroundColor: "#2b6ef2",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    // alignSelf: "center",
    alignItems: "center",
    marginLeft: 10,
  },

  selectBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default SalesScreen;
