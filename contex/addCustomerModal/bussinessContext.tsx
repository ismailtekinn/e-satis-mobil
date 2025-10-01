// // context/BussinessContext.tsx
// import React, {
//   createContext,
//   useEffect,
//   useState,
//   ReactNode,
//   useContext,
// } from "react";
// import { bussinessList } from "../../api/bussiness";

// type BussinessContextType = {
//   bussinessData: BussinessSqlData | null;
// };

// const BussinessContext = createContext<BussinessContextType | undefined>(
//   undefined
// );

// export const BussinessProvider = ({ children }: { children: ReactNode }) => {
//   const [bussinessData, setBussinessData] = useState<BussinessSqlData | null>(
//     null
//   );

//   useEffect(() => {
//     bussinessList({}).then(setBussinessData).catch(console.error);
//   }, []);

//   return (
//     <BussinessContext.Provider value={{ bussinessData }}>
//       {children}
//     </BussinessContext.Provider>
//   );
// };

// // Kullanımı kolay hook
// export const useBussinessContext = () => {
//   const context = useContext(BussinessContext);
//   if (!context) {
//     throw new Error(
//       "useBussinessContext must be used within a BussinessProvider"
//     );
//   }
//   return context;
// };

// context/BussinessContext.tsx
// context/BussinessContext.tsx
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { SqlData } from "../../types/apiresponse/genericResponseType";
import { fetchSqlData } from "../../api/generic";
import { API_URL8082 } from "../../constants/constant";

// Meslek tipi
export interface Bussiness {
  KOD: string;
  ACIKLAMA: string;
}

export interface CustomerGroup {
  GRUP_NO: string;
  GRUP_ADI: string;
}

type BussinessContextType = {
  bussinessData: Bussiness[] | null;
  reloadBussiness: () => Promise<void>;
  customerData: CustomerGroup[] | null;
};

const BussinessContext = createContext<BussinessContextType | undefined>(
  undefined
);

export const BussinessProvider = ({ children }: { children: ReactNode }) => {
  const [bussinessData, setBussinessData] = useState<Bussiness[] | null>(null);
  const [customerData, setCustomerData] = useState<CustomerGroup[] | null>(
    null
  );

  const loadBussiness = async () => {
    try {
      // const url = "http://94.54.83.21:8082/TriaRestEczane/MeslekSorgula";
      const url = `${API_URL8082}TriaRestEczane/MeslekSorgula`;
      const response: SqlData<Bussiness> = await fetchSqlData<Bussiness>(
        url,
        {}
      );

      console.log("meslek bilgisi contexti çağrıldı ");
      setBussinessData(response.DATA);
    } catch (err) {
      console.error("Meslek verisi alınamadı:", err);
      setBussinessData(null);
    }
  };

  const loadCustomerGroup = async () => {
    try {
      // const url = "http://94.54.83.21:8082/TriaRestEczane/MeslekSorgula";
      const url = `${API_URL8082}TriaRestEczane/CariGrupSorgula`;
      const response: SqlData<CustomerGroup> = await fetchSqlData<CustomerGroup>(
        url,
        {}
      );

      console.log("meslek bilgisi contexti çağrıldı ",response);
      setCustomerData(response.DATA);
    } catch (err) {
      console.error("Meslek verisi alınamadı:", err);
      setCustomerData(null);
    }
  };

  console.log("MÜŞTERİ GRUPLARI CONSOLE YAZDIRILIYOR: ",customerData)
  useEffect(() => {
    loadBussiness();
    loadCustomerGroup();
  }, []);

  return (
    <BussinessContext.Provider
      value={{ bussinessData, reloadBussiness: loadBussiness, customerData }}
    >
      {children}
    </BussinessContext.Provider>
  );
};

// Kullanımı kolay hook
export const useBussinessContext = () => {
  const context = useContext(BussinessContext);
  if (!context) {
    throw new Error(
      "useBussinessContext must be used within a BussinessProvider"
    );
  }
  return context;
};
