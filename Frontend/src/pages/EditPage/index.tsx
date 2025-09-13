import React from "react";
import { Form, Input } from "antd";
import PhoneField from "../../components/Phonefield";
import TimePicker from "../../components/TimePicker";
import Button from "../../components/Button";

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
        return <PhoneField disabled={field.disabled} />;
      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder}
            disabled={field.disabled}
          />
        );
      case "input":
      default:
        return (
          <Input placeholder={field.placeholder} disabled={field.disabled} />
        );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={data}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules || []}
        >
          {renderField(field)}
        </Form.Item>
      ))}

      <Form.Item className="flex justify-end gap-2">
        {onCancel && (
          <Button onClick={onCancel} type="default">
            Cancel
          </Button>
        )}
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPage;
