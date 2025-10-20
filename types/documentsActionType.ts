import { SelectedCustomer } from "./customerType";
import { SaleItemDeneme } from "./saleType";

export type PendingDocument = {
  customer?: SelectedCustomer;      
  products: SaleItemDeneme[];      
  documentType?:string;
  timestamp: string;               
};