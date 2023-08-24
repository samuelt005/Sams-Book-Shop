import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Cria uma raiz para a renderização no elemento com id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o componente App dentro da raiz criada
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
