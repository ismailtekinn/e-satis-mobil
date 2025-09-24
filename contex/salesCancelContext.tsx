// SalesCancelContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type SalesCancelContextType = {
  isCancelled: boolean;
  setIsCancelled: React.Dispatch<React.SetStateAction<boolean>>;
  isDiscountApplied: boolean;
  setIsDiscountApplied: React.Dispatch<React.SetStateAction<boolean>>;
};

const SalesCancelContext = createContext<SalesCancelContextType | undefined>(
  undefined
);

export const SalesCancelProvider = ({ children }: { children: ReactNode }) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  return (
    <SalesCancelContext.Provider value={{ isCancelled, setIsCancelled,isDiscountApplied, setIsDiscountApplied }}>
      {children}
    </SalesCancelContext.Provider>
  );
};

export const useSalesCancel = () => {
  const context = useContext(SalesCancelContext);
  if (!context)
    throw new Error("useSalesCancel must be used within SalesCancelProvider");
  return context;
};
