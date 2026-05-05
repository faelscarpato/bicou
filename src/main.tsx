import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@/components/ThemeProvider";
import App from "./App.tsx";
import "./index.css";
import { migrateLegacyGptData } from "./lib/legacyMigration";

migrateLegacyGptData();
createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
