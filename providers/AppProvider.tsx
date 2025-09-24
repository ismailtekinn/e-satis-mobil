import React from "react";
import { AlertProvider, useAlert } from "../contex/AlertContext";
import AlertModal from "../component/AlertModal";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertProvider>
      <AppInner>{children}</AppInner>
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
