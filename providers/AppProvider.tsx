import React from "react";
import { AlertProvider, useAlert } from "../contex/AlertContext";
import AlertModal from "../component/AlertModal";
import { SelectedCustomerProvider } from "../contex/selectedCustomerContex";
import { AddCustomerFormProvider } from "../contex/customer/addCustomerFormContext";
import { BussinessProvider } from "../contex/addCustomerModal/bussinessContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertProvider>
      {/* <BussinessProvider> */}
        <AddCustomerFormProvider>
          <SelectedCustomerProvider>
            <AppInner>{children}</AppInner>
          </SelectedCustomerProvider>
        </AddCustomerFormProvider>
      {/* </BussinessProvider> */}
    </AlertProvider>
  );
};

const AppInner = ({ children }: { children: React.ReactNode }) => {
  const { alertModalVisible, alertMessage, setAlertModalVisible } = useAlert();

  return (
    <>
      {children}

      {/* Tek bir yerde modal */}
      <AlertModal
        visible={alertModalVisible}
        message={alertMessage}
        onClose={() => setAlertModalVisible(false)}
      />
    </>
  );
};
