import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import createStore, { createStoreReturn } from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthProvider store={store as createStoreReturn<object>}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
