import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ClerkProvider } from "@clerk/clerk-react";

// Importa tu clave pública
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const PUBLISHABLE_KEY = 'pk_test_YWNjdXJhdGUtcHVtYS0xMy5jbGVyay5hY2NvdW50cy5kZXYk';
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk publishable key to the .env.local file");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/" // Redirección
      frontendApi="/"
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

// Medir el rendimiento
reportWebVitals();
