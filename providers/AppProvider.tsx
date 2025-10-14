import React from "react";
import { AlertProvider, useAlert } from "../contex/AlertContext";
import AlertModal from "../component/AlertModal";
import { SelectedCustomerProvider } from "../contex/selectedCustomerContex";
import { AddCustomerFormProvider } from "../contex/customer/addCustomerFormContext";
import { KullaniciProvider } from "../contex/kullaniciContext";
import { AutoLoginProvider } from "../contex/settings/autoLoginContext";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AutoLoginProvider>
      <AlertProvider>
        {/* <BussinessProvider> */}
        <KullaniciProvider>
          <AddCustomerFormProvider>
            <SelectedCustomerProvider>
              <AppInner>{children}</AppInner>
            </SelectedCustomerProvider>
          </AddCustomerFormProvider>
        </KullaniciProvider>
        {/* </BussinessProvider> */}
      </AlertProvider>
    </AutoLoginProvider>
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
