import React from "react";
import { Input, type InputProps } from "antd";

interface PasswordFieldProps extends InputProps {
  className?: string;
  label?: string;
  required?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  className,
  required,
  ...otherProps
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className="font-medium text-gray-60 text-[15px]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Input.Password
      autoComplete="false"
      className={`!py-2 ${className}`}
      {...otherProps}
    />
  </div>
);
export default PasswordField;
