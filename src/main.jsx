import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.jsx";
import { ToastModalProvider } from "./contexts/ToastModalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastModalProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ToastModalProvider>
  </React.StrictMode>
);
