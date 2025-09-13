import React from "react";
import { Popover as AntdPopover, type PopoverProps } from "antd";
import "./popoverStyle.css";

const Popover: React.FC<PopoverProps> = ({ className, ...props }) => (
  <AntdPopover className={`popover-main ${className}`} {...props} />
);

export default Popover;
