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
    <Layout className="h-screen" style={{ background: "white" }}>
      <Sidebar collapsed={collapsed} />
      <Layout style={{ background: "white" }}>
        <TopHeader
          title={title}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <div className="min-h-screen overflow-y-auto bg-primary">
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
