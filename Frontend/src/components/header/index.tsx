import React from "react";
import { Button, Layout } from "antd";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";
import ProfileDropdown from "../ProfileDropDown";

const { Header } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  onLogout?: () => void;
}

const TopHeader: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  title,
  onLogout,
}) => {
  return (
    <Header
      style={{ padding: 0 }}
      className="!bg-accent !text-secondary !px-6 flex items-center justify-between shadow-md"
    >
      {/* Left side: Menu + Title */}
      <div className="flex gap-5 items-center">
        <Button
          type="text"
          icon={collapsed ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
          onClick={() => setCollapsed(!collapsed)}
          className="!text-[22px] !p-4 !text-secondary  hover:!border-2 hover:!border-secondary"
        />
        <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      </div>

      {/* Right side: Logout */}
      <div className="flex items-center gap-5">
        <ProfileDropdown />
      </div>
    </Header>
  );
};

export default TopHeader;
