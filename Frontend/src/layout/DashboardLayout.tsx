import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import { Layout } from "antd";
import { route } from "../routes/path";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/Header";

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const location = useLocation();
  const routesArray = Object.values(route);

  useEffect(() => {
    const curTitle = routesArray.find(
      (item) => item.path === location.pathname
    );
    if (curTitle && curTitle.title) {
      setTitle(curTitle.title);
    }
  }, [location.pathname, routesArray]);

  return (
    <Layout style={{ minHeight: "100vh", background: "white" }}>
      <Sidebar collapsed={collapsed} />
      <Layout className="bg-primary">
        <TopHeader
          title={title}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        {/* Content area */}
        <Layout.Content
          className="bg-primary"
          style={{
            minHeight: "calc(100vh - 64px)", // 64px = typical header height
            overflowY: "auto",
            padding: "24px",
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
