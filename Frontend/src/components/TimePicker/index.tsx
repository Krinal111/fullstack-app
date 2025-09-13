import React from "react";
import { TimePicker as AntdTimePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface TimePickerProps {
  disabled?: boolean;
  initialValue?: string; // "HH:mm" format
  format?: string;
  onChange?: (time: Dayjs | null, timeString: string | string[]) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({
  disabled = false,
  initialValue,
  format = "HH:mm",
  onChange,
}) => {
  const defaultValue: Dayjs | undefined = initialValue
    ? dayjs(initialValue, format)
    : undefined;

  return (
    <AntdTimePicker
      format={format}
      disabled={disabled}
      value={defaultValue} // now Dayjs
      onChange={onChange}
      style={{ width: "100%" }}
    />
  );
};

export default TimePicker;
