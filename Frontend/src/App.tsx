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
        }}
      >
        <Routes />
      </ConfigProvider>
    </>
  );
}

export default App;
