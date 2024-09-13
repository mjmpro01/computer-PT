import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/styles.scss";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";
createRoot(document.getElementById("root")!).render(
  <StyleProvider hashPriority="high">
    <StrictMode>
      <ConfigProvider
        theme={{
          token: {
            marginXS: 2,
          },
        }}
      >
        <App />
      </ConfigProvider>
    </StrictMode>
  </StyleProvider>
);
