import React from "react";
import { Modal, Form, Input, Select, InputNumber } from "antd";

interface VendorAvailableModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onSave: (values: any) => void;
  initialValues?: any | null;
}

const VendorAvailableModal: React.FC<VendorAvailableModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  onSave,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    onSave(values);
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Modal
      title={initialValues ? "Edit Timing" : "Add Timing"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={handleOk}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={
          initialValues || {
            meal_type: "lunch", // ✅ lowercase
            price: 0,
            start_time: "",
            end_time: "",
          }
        }
      >
        <Form.Item
          label="Meal Type"
          name="meal_type"
          rules={[{ required: true, message: "Meal type is required" }]}
        >
          <Select>
            <Select.Option value="lunch">Lunch</Select.Option>
            <Select.Option value="dinner">Dinner</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Price is required" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name="start_time"
          rules={[{ required: true, message: "Start time is required" }]}
        >
          <Input type="time" />
        </Form.Item>

        <Form.Item
          label="End Time"
          name="end_time"
          rules={[{ required: true, message: "End time is required" }]}
        >
          <Input type="time" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VendorAvailableModal;
