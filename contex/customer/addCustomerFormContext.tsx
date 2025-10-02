// import React, { createContext, useState, ReactNode, useContext } from "react";
// import { AddCustomerFormType } from "../../types/customerType";

// type AddCustomerFormContextType = {
//   addCustomForm: AddCustomerFormType;
//   setAddCustomForm: React.Dispatch<React.SetStateAction<AddCustomerFormType>>;
// };

// const AddCustomerFormContext = createContext<AddCustomerFormContextType | undefined>(undefined);

// export const AddCustomerFormProvider = ({ children }: { children: ReactNode }) => {
//   const [addCustomForm, setAddCustomForm] = useState<AddCustomerFormType>({
//     mKod: "",
//     musteriSoydı: "",
//     musteriAdi: "",
//     meslek: "",
//     musteriGrubu1: "",
//     aileHekimi:"",
//     yupass: "",
//     tcKimlikNo: "",
//     telkod: "",
//     kanGrubu: "",
//     vergiDairesi: "",
//     vergiNo: "",
//     telefon1: "",
//     telefon2: "",
//     gsm1: "",
//     gsm2: "",
//     fax: "",
//     musteriTipi: "",
//     dogumYeriTarihi: new Date(),
//     cinsiyet: "Erkek",
//     adresSatiri: "",
//     adresSatiri2: "",
//     semtIlceSehir: "",
//     webEmail: "",
//     smsGrubu: "",
//     interPosSatis: "",
//     musteriIndirimi: "0",
//     ozelFiyat1: "Satış Fiyatı 1",
//     secimTuru: "Seçiniz",
//   });

//   return (
//     <AddCustomerFormContext.Provider value={{ addCustomForm, setAddCustomForm }}>
//       {children}
//     </AddCustomerFormContext.Provider>
//   );
// };

// export const useAddCustomerForm = () => {
//   const context = useContext(AddCustomerFormContext);
//   if (!context) {
//     throw new Error("useAddCustomerForm must be used within AddCustomerFormProvider");
//   }
//   return context;
// };
import React, { createContext, useState, ReactNode, useContext } from "react";
import {
  AddCustomerFormType,
  AddCustomerFormTypeDeneme,
} from "../../types/customerType";

// type AddCustomerFormContextType = {
//   addCustomForm: AddCustomerFormType;
//   setAddCustomForm: React.Dispatch<React.SetStateAction<AddCustomerFormType>>;
// };
type AddCustomerFormContextType = {
  addCustomForm: AddCustomerFormTypeDeneme;
  setAddCustomForm: React.Dispatch<
    React.SetStateAction<AddCustomerFormTypeDeneme>
  >;
};

const AddCustomerFormContext = createContext<
  AddCustomerFormContextType | undefined
>(undefined);

export const AddCustomerFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [addCustomForm, setAddCustomForm] = useState<AddCustomerFormTypeDeneme>(
    {
      WebErisimKullanici: "TRIA_TEST",
      WebErisimSifre: "SFR57220",
      CARI_ADI: "",
      CARI_UNVANI: "",
      TUR_KODU: "MÜSTERI",
      TELEFON: "",
      INSERT_USER: "ADMIN",
      UPDATE_USER: "ADMIN",
      GSM: "",
      TC_KIMLIK_NO: "",
      ID: 0,
      VERGI_DAIRESI: "",
      VERGI_NUMARASI: "",
      ADRES1: "",
      ADRES2: "",
      SEMT: "",
      ILCE: "",
      IL: "",
      EMAIL: "",
      M_DOGUM_YERI: "",
      M_DOGUM_TARIHI: "",
      M_MEDENI_HALI: 0,
      M_CINSIYETI: 0,
      SMS_GRUP_NO: "",
      GRUP_NO: "",
      PASIF: 0,
      YUPAS_NO: "",
      KAN_GRUBU: "",
      MESLEK_NO: "",
      SMS_GONDERILMESIN: 0,
      KART_NO: "",
    }
  );

  return (
    <AddCustomerFormContext.Provider
      value={{ addCustomForm, setAddCustomForm }}
    >
      {children}
    </AddCustomerFormContext.Provider>
  );
};

export const useAddCustomerForm = () => {
  const context = useContext(AddCustomerFormContext);
  if (!context) {
    throw new Error(
      "useAddCustomerForm must be used within AddCustomerFormProvider"
    );
  }
  return context;
};
