import React from "react";
import { Button as AntdButton, type ButtonProps } from "antd";

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type,
  className,
  ...props
}) => (
  <AntdButton
    onClick={onClick}
    {...props}
    type={type}
    className={`!px-5 !py-2  !h-auto ${className}`}
  >
    {children}
  </AntdButton>
);

export default Button;
