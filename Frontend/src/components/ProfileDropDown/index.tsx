import React, { useState } from "react";
import { Dropdown, type MenuProps, Avatar } from "antd";
import { LuUser } from "react-icons/lu";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router";
import { logoutAction } from "../../redux/actions/authAction.ts";
import { type AppState, useSelector } from "../../redux/store.ts";
import ViewProfileModal from "../ProfileModal/index.tsx";

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<string>(""); // kept for future Profile Modal
  const { userData } = useSelector((state: AppState) => state.auth);

  const handleSignOutClick = (): void => {
    logoutAction();
    navigate("/login");
  };

  const handleProfileClick = (): void => {
    setIsModalOpen("edit"); // reserved for future profile modal
  };

  // Avatar with fallback to user initials or icon
  const getProfileAvatar = (): React.ReactNode => {
    if (userData.profile) {
      return <Avatar src={userData.profile} size={40} />;
    }
    return (
      <Avatar
        size={40}
        style={{
          backgroundColor: "#d9d9d9",
          color: "#595959",
          fontWeight: 600,
        }}
        icon={!userData.name ? <LuUser /> : undefined}
      >
        {userData.name?.charAt(0).toUpperCase()}
      </Avatar>
    );
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="flex items-center gap-2 cursor-pointer">
          {getProfileAvatar()}
          <div>
            <h3 className="capitalize text-gray-700 font-bold">
              {userData.name}
            </h3>
            <p className="text-xs text-gray-500">{userData.email}</p>
          </div>
        </div>
      ),
      key: "0",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          className="flex items-center gap-3 cursor-pointer text-secondary-80 text-sm font-semibold"
          onClick={handleProfileClick}
        >
          <LuUser className="text-[18px]" />
          <span>Profile</span>
        </div>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button
          type="button"
          onClick={handleSignOutClick}
          className="flex items-center gap-3 cursor-pointer text-secondary-80 text-sm font-semibold"
        >
          <GoSignOut className="text-[18px]" />
          <span>Sign Out</span>
        </button>
      ),
      key: "3",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <div className="flex items-center gap-2 cursor-pointer">
          {getProfileAvatar()}
          <div className="text-gray-700">
            <p className="capitalize font-bold leading-normal">
              {userData.name}
            </p>
          </div>
        </div>
      </Dropdown>
      <ViewProfileModal
        isModalOpen={isModalOpen === "edit"}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ProfileDropdown;
