import React from "react";
import { Button, Layout } from "antd";
import { HiOutlineMenuAlt2, HiOutlineMenuAlt3 } from "react-icons/hi";

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
      className="!bg-secondary !text-primary border-b border-solid border-hover !px-6 flex items-center justify-between shadow-md"
    >
      {/* Left side: Menu + Title */}
      <div className="flex gap-5 items-center">
        <Button
          type="text"
          icon={collapsed ? <HiOutlineMenuAlt3 /> : <HiOutlineMenuAlt2 />}
          onClick={() => setCollapsed(!collapsed)}
          className="!text-[22px] !p-4 !text-primary  hover:!border-2 hover:!border-primary"
        />
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
      </div>

      {/* Right side: Logout */}
      <div>
        <Button
          onClick={onLogout}
          className="bg-secondary text-text-dark font-medium px-4 py-1 rounded-lg shadow hover:bg-hover hover:text-text-light transition"
        >
          Logout
        </Button>
      </div>
    </Header>
  );
};

export default TopHeader;
