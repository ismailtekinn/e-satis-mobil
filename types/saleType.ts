export interface CreateSale {
  UserID: number;
  SaleDate: Date;
  ProductID: number;
  SaleType: string;
  TotalAmount: number;
  // ClientID?: number |undefined;
  Quantity: number;
}

export interface SaleAllList {
  ProductID: number;
  ProductName: string;
  SalePrice: number;
  SaleID: number;
  Stok_Quantity: number;
  PurchasePrice: number;
}

export interface SaleEditProdcut {
  ProductID: number;
  ProductName: string;
  PurchasePrice: number;
  SaleDate: Date;
  SaleID: number;
  StockType?: string;
  SalePrice: number;
  Quantity: number;
  Stok_Quantity: number;
  TotalAmount: number;
  SaleType: string;
  UserID: number;
  ClientName?: string;
  ClientSurname?: string;
}
export interface SaleEdit {
  ProductID: number;
  SaleDate: Date;
  SaleID: number;
  Quantity: number;
  // Stok_Quantity: number;
  TotalAmount: number;
  SaleType: string;
  UserID: number;
}
export class SaleItemDeneme {
  Index!: number;
  ProductName!: string;
  Barcode!: number;
  Stock!: number;
  Price!: number;
  VatRate!: number;
  Rayon!: string;
  Currency!: string;
  Isconto?: string;
  isCanceled?: boolean;

  // opsiyonel alanlar
  UrunId?: number;
  UrunTipi?: number;
  DepartmanNo?: number;
  Birim?: string;
  Adet?: number;
  BirimFiyat?: number;
  IndFlag?: number;
  IndOran?: number;
  IndTutar?: number;
  SaticiNo?: number;
  Puan?: number;
  KasiyerNo?: number;
  UrunKartiFiyati?: number;
  UpdateDate?: string;
  QrCode?: string;
  SeriNo?: string;
  Miad?: string;
  PartiNo?: string;
  DipIskonto?: number;
  DipArttirim?: number;
  FiyatNo?: number;
  Tutar: number;
  UtsLi?: number;
  UtsLotNo?: string;
  UtsSeriNo?: string;
  UtsUrunNo?: string;
  UtsEssizKimlikNo?: string;

  discount?: number;
  arttirim?: number;
  
  constructor(data: Omit<SaleItemDeneme, "Tutar">) {
    Object.assign(this, data);
    this.Tutar = (data.Price ?? 0) * (data.Stock ?? 0); // direkt hesapla ve ata
  }
}

export type SaleProduct = {
  Barcode: string;
  ProductName: string;
  Stock: number;
  VatRate: number;
  Shelf: string;
  Price: number;
};
