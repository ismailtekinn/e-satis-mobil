import React, { createContext, useState, ReactNode, useContext } from "react";
import { AddCustomerFormType } from "../../types/customerType";

type AddCustomerFormContextType = {
  addCustomForm: AddCustomerFormType;
  setAddCustomForm: React.Dispatch<React.SetStateAction<AddCustomerFormType>>;
};

// Context oluştur
const AddCustomerFormContext = createContext<AddCustomerFormContextType | undefined>(undefined);

// Provider component
export const AddCustomerFormProvider = ({ children }: { children: ReactNode }) => {
  const [addCustomForm, setAddCustomForm] = useState<AddCustomerFormType>({
    mKod: "",
    musteriSoydı: "",
    musteriAdi: "",
    meslek: "",
    musteriGrubu1: "",
    aileHekimi:"",
    yupass: "",
    tcKimlikNo: "",
    telkod: "",
    kanGrubu: "",
    vergiDairesi: "",
    vergiNo: "",
    telefon1: "",
    telefon2: "",
    gsm1: "",
    gsm2: "",
    fax: "",
    musteriTipi: "",
    // dogumYeriTarihi: new Date().toLocaleDateString(),
    dogumYeriTarihi: new Date(),
    cinsiyet: "Erkek",
    adresSatiri: "",
    adresSatiri2: "",
    semtIlceSehir: "",
    webEmail: "",
    smsGrubu: "",
    interPosSatis: "",
    musteriIndirimi: "0",
    ozelFiyat1: "Satış Fiyatı 1",
    secimTuru: "Seçiniz",
  });

  return (
    <AddCustomerFormContext.Provider value={{ addCustomForm, setAddCustomForm }}>
      {children}
    </AddCustomerFormContext.Provider>
  );
};

// Custom hook
export const useAddCustomerForm = () => {
  const context = useContext(AddCustomerFormContext);
  if (!context) {
    throw new Error("useAddCustomerForm must be used within AddCustomerFormProvider");
  }
  return context;
};
