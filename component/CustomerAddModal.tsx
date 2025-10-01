import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
  Dimensions,
} from "react-native";
import CustomerSelectDropDownModal from "./CustomerSelectDropDownModal";
import { AddCustomerDropDownType } from "../types/addCustomerDropDownType";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useAddCustomerForm } from "../contex/customer/addCustomerFormContext";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function CustomerAddModal({ visible, onClose }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [smsGuncellemessin, setSmsGuncellemessin] = useState(false);
  const [takipEdiliyor, setTakipEdiliyor] = useState(false);
  const [opsiyonel, setOpsiyonel] = useState(false);
  const [kanGrubuModalVisible, setKanGrubuModalVisible] = useState(false);
  const [dropdownType, setDropDownType] =
    useState<AddCustomerDropDownType>("kanGrubu");
  const { addCustomForm, setAddCustomForm } = useAddCustomerForm();

  const handleChange = (key: string, value: string) => {
    setAddCustomForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Kaydedilen form:", addCustomForm);
    onClose();
  };

  const tabs = [
    { id: 0, label: "Temel Bilgiler", icon: "profile" }, // Profil / bilgi
    { id: 1, label: "Kimlik & Vergi", icon: "idcard" }, // Kimlik kartı
    { id: 2, label: "İletişim", icon: "phone" }, // Telefon
    { id: 3, label: "Özel Ayarlar", icon: "setting" }, // Ayarlar
  ];
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <View style={styles.tabContent}>
            <View style={styles.field}>
              <Text style={styles.label}>T.C Kimlik No</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.musteriAdi}
                onChangeText={(t) => handleChange("musteriAdi", t)}
                placeholder="11 haneli T.C No"
                placeholderTextColor="#999"
              />
            </View>
            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Müşteri Adı</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.mKod}
                  onChangeText={(t) => handleChange("mKod", t)}
                  placeholder="Müşteri Adı"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Müşteri Soyadı</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.musteriSoydı}
                  onChangeText={(t) => handleChange("musteriTuru", t)}
                  placeholder="Müşteri Soyadı"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Meslek</Text>
                <TouchableOpacity
                  style={styles.input}
                  activeOpacity={0.7}
                  onPress={() => {
                    setKanGrubuModalVisible(true);
                    setDropDownType("meslek");
                    // burada istediğin işlemi yapabilirsin
                  }}
                >
                  <Text
                    style={{
                      color: addCustomForm.meslek ? "#000" : "#999",
                    }}
                  >
                    {addCustomForm.meslek || "Meslek"}
                  </Text>
                  <AntDesign
                    name="down"
                    size={16}
                    color="#999"
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "60%",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Kan Grubu</Text>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setKanGrubuModalVisible(true);
                    setDropDownType("kanGrubu");
                  }} // modal aç
                >
                  <Text
                    style={{ color: addCustomForm.kanGrubu ? "#000" : "#999" }}
                  >
                    {addCustomForm.kanGrubu || "A+, B-, AB+, O- vb."}
                  </Text>
                  <AntDesign
                    name="down"
                    size={16}
                    color="#999"
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "60%",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Müşteri Grubu</Text>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setDropDownType("musteriGrubu"); // açılacak dropdown tipi
                    setKanGrubuModalVisible(true); // modalı aç
                  }}
                >
                  <Text
                    style={{
                      color: addCustomForm.musteriGrubu1 ? "#000" : "#999",
                    }}
                  >
                    {addCustomForm.musteriGrubu1 || "Grup seçiniz"}
                  </Text>
                  <AntDesign
                    name="down"
                    size={16}
                    color="#999"
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "60%",
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Yupass</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.yupass}
                  onChangeText={(t) => handleChange("yupass", t)}
                  placeholder="Yupass No"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Doğum Yeri - Tarihi</Text>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    DateTimePickerAndroid.open({
                      value: addCustomForm.dogumYeriTarihi || new Date(),
                      mode: "date",
                      onChange: (event, date) => {
                        if (event.type === "set" && date) {
                          handleChange("dogumYeriTarihi", date.toDateString());
                        }
                      },
                    });
                  }}
                >
                  <Text
                    style={{
                      color: addCustomForm.dogumYeriTarihi ? "#000" : "#999",
                    }}
                  >
                    {addCustomForm.dogumYeriTarihi
                      ? addCustomForm.dogumYeriTarihi.toLocaleDateString()
                      : "Şehir / GG.AA.YYYY"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Cinsiyet</Text>

                <TouchableOpacity
                  style={styles.input}
                  onPress={() => {
                    setKanGrubuModalVisible(true); // modal aç
                    setDropDownType("cinsiyet"); // type'ı taşı
                  }}
                >
                  <Text
                    style={{ color: addCustomForm.cinsiyet ? "#000" : "#999" }}
                  >
                    {addCustomForm.cinsiyet || "Erkek / Kadın"}
                  </Text>
                  <AntDesign
                    name="down"
                    size={16}
                    color="#999"
                    style={{
                      position: "absolute",
                      right: "5%",
                      top: "60%",
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.tabContent}>
            {/* <View style={styles.field}>
              <Text style={styles.label}>T.C. Kimlik No</Text>
              <TextInput
                style={styles.input}
                value={form.tcKimlikNo}
                onChangeText={(t) => handleChange("tcKimlikNo", t)}
                keyboardType="numeric"
                placeholder="11 haneli TC No"
                placeholderTextColor="#999"
              />
            </View> */}

            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Yetkili</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.telkod}
                  onChangeText={(t) => handleChange("telkod", t)}
                  placeholder="Telefon kodu"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Aile Hekimi</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.aileHekimi}
                  onChangeText={(t) => handleChange("aileHekimi", t)}
                  placeholder="Aile Hekimi"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Vergi Dairesi</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.vergiDairesi}
                onChangeText={(t) => handleChange("vergiDairesi", t)}
                placeholder="Vergi dairesi adı"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Vergi No</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.vergiNo}
                onChangeText={(t) => handleChange("vergiNo", t)}
                keyboardType="numeric"
                placeholder="10 haneli vergi no"
                placeholderTextColor="#999"
              />
            </View>

            {/* <View style={styles.field}>
              <Text style={styles.label}>Müşteri Tipi</Text>
              <View style={styles.rowInner}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={form.musteriTipi}
                  onChangeText={(t) => handleChange("musteriTipi", t)}
                  placeholder="Müşteri tipi"
                  placeholderTextColor="#999"
                />
                <View style={styles.switchBox}>
                  <Switch
                    value={opsiyonel}
                    onValueChange={setOpsiyonel}
                    trackColor={{ false: "#ddd", true: "#2563eb" }}
                    thumbColor="#fff"
                  />
                  <Text style={styles.switchLabel}>Opsiyonel</Text>
                </View>
              </View>
            </View> */}
          </View>
        );

      case 2:
        return (
          <View style={styles.tabContent}>
            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Telefon 1</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.telefon1}
                  onChangeText={(t) => handleChange("telefon1", t)}
                  keyboardType="phone-pad"
                  placeholder="(0xxx) xxx xx xx"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>Telefon 2</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.telefon2}
                  onChangeText={(t) => handleChange("telefon2", t)}
                  keyboardType="phone-pad"
                  placeholder="(0xxx) xxx xx xx"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>GSM 1</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.gsm1}
                  onChangeText={(t) => handleChange("gsm1", t)}
                  keyboardType="phone-pad"
                  placeholder="(5xx) xxx xx xx"
                  placeholderTextColor="#999"
                />
              </View>
              <View style={styles.fieldHalf}>
                <Text style={styles.label}>GSM 2</Text>
                <TextInput
                  style={styles.input}
                  value={addCustomForm.gsm2}
                  onChangeText={(t) => handleChange("gsm2", t)}
                  keyboardType="phone-pad"
                  placeholder="(5xx) xxx xx xx"
                  placeholderTextColor="#999"
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Fax</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.fax}
                onChangeText={(t) => handleChange("fax", t)}
                placeholder="Fax numarası"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Adres Satırı 1</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.adresSatiri}
                onChangeText={(t) => handleChange("adresSatiri", t)}
                placeholder="Mahalle, sokak, bina no"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Adres Satırı 2</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.adresSatiri2}
                onChangeText={(t) => handleChange("adresSatiri2", t)}
                placeholder="Daire no, kat vb."
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Semt / İlçe / Şehir</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.semtIlceSehir}
                onChangeText={(t) => handleChange("semtIlceSehir", t)}
                placeholder="Örn: Çankaya / Ankara"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Web / E-mail</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.webEmail}
                onChangeText={(t) => handleChange("webEmail", t)}
                keyboardType="email-address"
                placeholder="ornek@email.com"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.tabContent}>
            <View style={styles.field}>
              <Text style={styles.label}>SMS Grubu</Text>
              <View style={styles.rowInner}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={addCustomForm.smsGrubu}
                  onChangeText={(t) => handleChange("smsGrubu", t)}
                  placeholder="SMS grubu seçiniz"
                  placeholderTextColor="#999"
                />
                <View style={styles.switchBox}>
                  <Switch
                    value={smsGuncellemessin}
                    onValueChange={setSmsGuncellemessin}
                    trackColor={{ false: "#ddd", true: "#2563eb" }}
                    thumbColor="#fff"
                  />
                  <Text style={styles.switchLabel}>SMS Güncellemesin</Text>
                </View>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Müşteri İndirimi (%)</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.musteriIndirimi}
                onChangeText={(t) => handleChange("musteriIndirimi", t)}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Özel Fiyat Tipi</Text>
              <TextInput
                style={styles.input}
                value={addCustomForm.ozelFiyat1}
                onChangeText={(t) => handleChange("ozelFiyat1", t)}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Seçim Türü</Text>
              <View style={styles.rowInner}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={addCustomForm.secimTuru}
                  onChangeText={(t) => handleChange("secimTuru", t)}
                />
                <View style={styles.switchBox}>
                  <Switch
                    value={takipEdiliyor}
                    onValueChange={setTakipEdiliyor}
                    trackColor={{ false: "#ddd", true: "#2563eb" }}
                    thumbColor="#fff"
                  />
                  <Text style={styles.switchLabel}>Takip Ediliyor</Text>
                </View>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconText}>👤</Text>
              </View>
              <Text style={styles.title}>Müşteri Kartı</Text>
            </View>
            {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={onClose}>
              <AntDesign
                name="close"
                size={24}
                color="#fff"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={styles.tabBar}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                onPress={() => setActiveTab(tab.id)}
              >
                <AntDesign
                  name={tab.icon}
                  size={22}
                  color={activeTab === tab.id ? "blue" : "gray"}
                  style={styles.tabIcon}
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab.id && styles.tabTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content */}
          <ScrollView
            style={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {renderTabContent()}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.btnSecondary]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>✕ İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.btnPrimary]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>✓ Kaydet</Text>
            </TouchableOpacity>
          </View>

          <CustomerSelectDropDownModal
            modalVisible={kanGrubuModalVisible}
            onClose={() => setKanGrubuModalVisible(false)}
            type={dropdownType}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "95%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: "#2563eb",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "600",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#2563eb",
    backgroundColor: "#fff",
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    textAlign: "center",
  },
  tabTextActive: {
    color: "#2563eb",
  },
  scrollContent: {
    maxHeight: Dimensions.get("window").height * 0.5,
  },
  tabContent: {
    padding: 20,
  },
  field: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  rowInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fieldHalf: {
    flex: 1,
  },
  label: {
    fontSize: 13,
    color: "#475569",
    marginBottom: 6,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#0f172a",
  },
  switchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  switchLabel: {
    fontSize: 12,
    color: "#475569",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  btnSecondary: {
    backgroundColor: "#64748b",
  },
  btnPrimary: {
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
