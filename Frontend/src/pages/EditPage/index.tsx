import React from "react";
import { Form, Input } from "antd";
import PhoneField from "../../components/Phonefield";
import TimePicker from "../../components/TimePicker";
import Button from "../../components/Button";
import { isValidPhoneNumber } from "react-phone-number-input";

export interface Field {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  rules?: any[];
  component?: "input" | "textarea" | "timepicker" | "phone";
}

interface EditPageProps {
  id: string;
  data: Record<string, any>;
  handleUpdate: (id: string, values: Record<string, any>) => void;
  fields: Field[];
  onCancel?: () => void;
}

const phoneRules = [
  {
    required: true,
    message: "Please enter your Mobile Number",
  },
  {
    validator: (_: any, value: string) => {
      if (value && !isValidPhoneNumber(value)) {
        return Promise.reject("Please enter a valid Mobile Number");
      }
      return Promise.resolve();
    },
  },
];

const EditPage: React.FC<EditPageProps> = ({
  id,
  data,
  handleUpdate,
  fields,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: Record<string, any>) => {
    handleUpdate(id, values);
  };

  const renderField = (field: Field) => {
    switch (field.component) {
      case "timepicker":
        return <TimePicker format="HH:mm" />;
      case "phone":
        return <PhoneField disabled={field.disabled} className="!py-2 !h-10" />;
      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder}
            disabled={field.disabled}
            className="rounded-lg border-gray-300 focus:ring-amber-500 focus:border-amber-500"
          />
        );
      case "input":
      default:
        return (
          <Input
            placeholder={field.placeholder}
            disabled={field.disabled}
            className="rounded-lg border-gray-300 focus:ring-amber-500 focus:border-amber-500"
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-8 font-['Montserrat']">
      <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-3xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-amber-700">
          Edit Information
        </h1>

        <Form
          form={form}
          layout="vertical"
          initialValues={data}
          onFinish={onFinish}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={
                  <span className="text-sm font-semibold text-gray-700">
                    {field.label}
                    {field.rules?.some((rule) => rule.required) && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </span>
                }
                rules={
                  field.name === "phone_number" ? phoneRules : field.rules || []
                }
                className="mb-0"
              >
                {renderField(field)}
              </Form.Item>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-8">
            {onCancel && (
              <Button
                onClick={onCancel}
                type="default"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-amber-700 border border-amber-700 font-semibold hover:bg-amber-50 transition-colors duration-200"
              >
                Cancel
              </Button>
            )}
            <Button
              type="primary"
              htmlType="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-amber-600 text-white font-semibold shadow-md hover:bg-amber-700 transition-colors duration-200"
            >
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditPage;
