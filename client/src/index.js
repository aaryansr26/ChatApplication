import {createRoot} from "react-dom/client" 
// import { StrictMode } from "react"; 
import App from "./App" 
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");; 
const root = createRoot(rootElement);

root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
)