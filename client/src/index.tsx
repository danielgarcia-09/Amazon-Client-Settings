import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUser from "./components/user/EditUser";
import Payments from "./components/payments/Payments";
import CreatePayment from "./components/payments/CreatePayment";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/edit_user/:id" element={<EditUser />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/new-payment" element={<CreatePayment />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
