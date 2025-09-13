import React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./style.css";
interface PhoneInputFieldProps {
  className?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  international?: boolean;
  limitMaxLength?: boolean;
  value?: string;
}

const PhoneField: React.FC<PhoneInputFieldProps> = ({
  className,
  label,
  required,
  value,
  ...otherProps
}) => (
  <div className="flex flex-col gap-1 w-full">
    <label htmlFor={label} className="font-medium text-gray-60 text-[15px]">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <PhoneInput
      onChange={() => {}}
      placeholder="Enter phone number"
      autoComplete="off"
      defaultCountry="IN"
      countryCallingCodeEditable
      limitMaxLength
      className={`${className}`}
      international={false}
      value={value}
      {...otherProps}
    />
  </div>
);

export default PhoneField;
