import {createRoot} from "react-dom/client";

import "./index.css";

import App from "./App";

import {ProductProvider} from "./context/ProductContext";

createRoot(document.getElementById("root")!).render(
    <ProductProvider>
        <App />
    </ProductProvider>
);