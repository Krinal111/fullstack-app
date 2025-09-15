import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Layout } from "antd";
import { LuLayoutDashboard } from "react-icons/lu";
import { RiUser3Line } from "react-icons/ri";
import { PiUsersThree } from "react-icons/pi";
import { route } from "../../routes/path";
import { useSelector, type AppState } from "../../redux/store";

import "./style.css";
interface SidebarProps {
  collapsed: boolean;
}

const { Sider } = Layout;

// Define static menuItems per role
const menuItemsByRole = {
  Admin: [
    {
      key: route.DASHBOARD.path,
      icon: <LuLayoutDashboard />,
      label: route.DASHBOARD.title,
      path: route.DASHBOARD.path,
    },

    {
      key: route.VENDORS.path,
      icon: <PiUsersThree />,
      label: route.VENDORS.title,
      path: route.VENDORS.path,
    },
  ],
  Customer: [
    {
      key: route.DASHBOARD.path,
      icon: <LuLayoutDashboard />,
      label: route.DASHBOARD.title,
      path: route.DASHBOARD.path,
    },
    {
      key: route.VENDORS.path,
      icon: <PiUsersThree />,
      label: route.VENDORS.title,
      path: route.VENDORS.path,
    },
  ],
  Vendor: [
    {
      key: route.DASHBOARD.path,
      icon: <LuLayoutDashboard />,
      label: route.DASHBOARD.title,
      path: route.DASHBOARD.path,
    },
    {
      key: route.PROFILE.path,
      icon: <RiUser3Line />,
      label: route.PROFILE.title,
      path: route.PROFILE.path,
    },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userData } = useSelector((state: AppState) => state.auth); // assume role is in redux

  const handleMenuItemClick = (path: string): void => {
    navigate(path);
  };

  // pick menuItems based on role (fallback: empty array)
  const menuItems =
    menuItemsByRole[userData.role as keyof typeof menuItemsByRole] || [];
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sidebar-main"
    >
      <div className="flex justify-center my-4">
        <img alt="Logo" width={collapsed ? 55 : 180} />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        items={menuItems.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: item.label,
          onClick: () => handleMenuItemClick(item.path),
        }))}
      />
    </Sider>
  );
};

export default Sidebar;
