import { Snackbar, Alert } from "@mui/material";
import React, { createContext, useContext, useState, useCallback } from "react";

const ToastModalContext = createContext(undefined);

const ToastModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [ToastModal, setToastModal] = useState(null);

  const triggerToastModal = useCallback((message, severity) => {
    setToastModal({ message, severity });
    setOpen(true);
  }, []);

  const handleClose = useCallback((event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }, []);

  return (
    <ToastModalContext.Provider value={{ triggerToastModal }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {ToastModal ? (
          <Alert
            onClose={handleClose}
            severity={ToastModal?.severity}
            sx={{ width: "100%" }}
          >
            {ToastModal?.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </ToastModalContext.Provider>
  );
};

const useToastModal = () => {
  const context = useContext(ToastModalContext);
  if (context === undefined) {
    throw new Error("useToastModal must be used within a ToastModalProvider");
  }
  return context;
};

export { ToastModalProvider, useToastModal };
