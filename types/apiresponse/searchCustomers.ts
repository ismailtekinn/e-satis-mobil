export type CustomerItem = {
  ROWNUMBER: string;
  ID: string;
  MUSTERI_KODU: string;
  MUSTERI_ADI: string;
  MUSTERI_SOYADI: string;
  MUSTERI_ADI_SOYADI: string;
  TC_KIMLIK_NO: string;
  VERGI_DAIRESI: string;
  VERGI_NUMARASI: string;
  IL: string;
  ILCE: string;
  TELEFON_1: string;
  GSM: string;
  DOGUM_TARIHI: string;
  CINSIYETI: string;
  INDIRIM_ORANI: string;
  FIYAT_NO: string;
  KREDI_LIMITI: string;
  RISK_LIMITI: string;
  KART_NO: string;
};

export type SQLDataResponse = {
  RECORD_COUNT: string;
  DATA: CustomerItem[];
};

export type ApiResponse = {
  ResultCode: string;
  ErrorMessage: string | null;
  ServisVersiyon: string;
  FisBarkod: string | null;
  BelgeNo: string | null;
  BarkodData: string | null;
  Id: number;
  CariId: number;
  SQL_Data: string;       // Backend JSON string gönderiyor
  SQL_Data_2: string | null;
  SQL_Data_3: string | null;
  SQL_Data_4: string | null;
  SQL_Data_5: string | null;
  SQL_Data_6: string | null;
  SQL_Data_7: string | null;
  SQL_Data_8: string | null;
  SQL_Data_9: string | null;
  SQL_Data_10: string | null;
  BelgeTarihi: string;
  dtBelgeTarihi: string;  // ISO date string
  SQL_Data_List: string | null;
};

// Kullanımı:
const parseSQLData = (response: ApiResponse): SQLDataResponse => {
  return JSON.parse(response.SQL_Data) as SQLDataResponse;
};
