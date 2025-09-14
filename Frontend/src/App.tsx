import React from "react";
import Routes from "./routes";
import { ConfigProvider } from "antd";
import useAuth from "./hooks/useAuth";

function App() {
  useAuth();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorSuccess: "#0bd71f",
            colorError: "#f54040",
            colorTextBase: "#16161e",
            wireframe: false,
            colorPrimary: "#8b4513",
            colorInfo: "#ff5b22",
            fontFamily: "Montserrat",
          },
          components: {
            Table: {
              headerBorderRadius: 0,
              cellPaddingBlock: 14,
              headerBg: "transparent",
              borderColor: "transparent",
              headerColor: "#ffff",
              headerSplitColor: "rgb(120 53 15)",
              rowExpandedBg: "#677778",
              colorText: "rgb(120 53 15)",
              fontWeightStrong: 600,
            },
          },
        }}
      >
        <Routes />
      </ConfigProvider>
    </>
  );
}

export default App;
