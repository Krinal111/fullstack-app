import { Popconfirm } from "antd";
import React, { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FaRegClone } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineLockReset } from "react-icons/md";
import { VscEdit, VscEye } from "react-icons/vsc";
import Button from "../Button";
import Popover from "../Popover";
import { BsThreeDotsVertical } from "react-icons/bs";

const TableActions: React.FC<any> = ({
  data,
  onResetPassword,
  onDelete,
  onUpdate,
  onClone,
  onDownload,
  onView,
  deletePopupTitle,
  deletePopupDesc,
}) => {
  const [hide, setHide] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUserName, setIsUserName] = useState<string>("");

  // eslint-disable-next-line
  const handleButtonClick = (
    callback: ((data: any) => void) | undefined
  ): void => {
    callback?.(data);
  };

  const cancel = (): void => {
    setHide(false);
  };

  const handleOpenChange = (newOpen: boolean): void => {
    setHide(newOpen);
  };

  const actions = [
    {
      label: "View",
      icon: <VscEye className="text-lg" />,
      callback: onView,
    },
    {
      label: "Update",
      icon: <VscEdit className="text-lg" />,
      callback: onUpdate,
    },
    // {
    //   label: "Clone",
    //   icon: <FaRegClone className="text-lg" />,
    //   callback: onClone,
    // },
    // {
    //   label: "Download",
    //   icon: <AiOutlineCloudDownload className="text-[20px]" />,
    //   callback: onDownload,
    // },
    {
      label: "Delete",
      icon: <MdDeleteOutline className="text-lg" />,
      callback: onDelete,
    },
  ].filter((action) => action.callback);

  const content = (
    <div className="min-w-[150px] w-full flex-col">
      {actions.map(({ label, icon, callback }) => (
        <React.Fragment key={label}>
          {callback === onDelete ? (
            <Popconfirm
              placement="bottomRight"
              title={deletePopupTitle || `Delete this ${label.toLowerCase()}?`}
              description={
                deletePopupDesc ||
                `Are you sure to delete this ${label.toLowerCase()}?`
              }
              onConfirm={() => {
                // eslint-disable-next-line
                handleButtonClick(
                  callback as ((data: any) => void) | undefined
                );
                cancel();
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="text"
                className="!px-2 !pl-4 !rounded-none w-full !font-semibold !text-start !flex items-center gap-2"
                danger={callback === onDelete}
              >
                {icon}
                {label}
              </Button>
            </Popconfirm>
          ) : (
            <Button
              onClick={() => {
                // eslint-disable-next-line
                handleButtonClick(
                  callback as ((data: any) => void) | undefined
                );
                cancel();
              }}
              type="text"
              className="!px-2 !pl-4 !rounded-none w-full !font-semibold !text-start !flex items-center gap-2"
            >
              {icon}
              {label}
            </Button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <>
      <Popover
        open={hide}
        placement="bottom"
        content={content}
        arrow={false}
        trigger={"click"}
        onOpenChange={handleOpenChange}
        style={{ padding: 0 }}
      >
        <Button onClick={() => setHide(true)} type="text" className="!px-1">
          <BsThreeDotsVertical className="text-[20px] text-primary" />
        </Button>
      </Popover>
      {/* <ResetPasswordModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isUserName={isUserName}
      /> */}
    </>
  );
};

export default TableActions;
