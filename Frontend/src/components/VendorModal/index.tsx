import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import PhoneField from "../Phonefield";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
  addVendorAction,
  updateVendorAction,
} from "../../redux/actions/vendorAction";

interface VendorModalProps {
  open: boolean;
  onClose: () => void;
  page: number;
  limit: number;
  vendor?: any | null; // if vendor exists → edit mode
}

const VendorModal: React.FC<VendorModalProps> = ({
  open,
  onClose,
  page,
  limit,
  vendor,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vendor) {
      form.setFieldsValue(vendor); // pre-fill in edit mode
    } else {
      form.resetFields(); // reset in add mode
    }
  }, [vendor, form]);

  const handleFinish = async (values: any) => {
    try {
      setLoading(true);
      if (vendor) {
        // ✅ Edit Mode
        await updateVendorAction(
          vendor.id,
          { user_id: vendor.user_id, ...values },
          page,
          limit
        );
      } else {
        // ✅ Add Mode
        await addVendorAction(values, page, limit);
      }
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Failed to save vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={vendor ? "Edit Vendor" : "Add Vendor"}
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ shop_name: "", name: "", phone_number: "" }}
      >
        <Form.Item
          name="shop_name"
          label="Shop Name"
          rules={[{ required: true, message: "Please enter shop name" }]}
        >
          <Input placeholder="Enter shop name" />
        </Form.Item>

        <Form.Item
          name="name"
          label="Vendor Name"
          rules={[{ required: true, message: "Please enter vendor name" }]}
        >
          <Input placeholder="Enter vendor name" />
        </Form.Item>

        <Form.Item
          name="phone_number"
          rules={[
            {
              required: true,
              message: "Please enter your Mobile Number",
            },
            {
              validator: (_, value) => {
                if (value && !isValidPhoneNumber(value)) {
                  return Promise.reject("Please enter a valid Mobile Number");
                }
                return Promise.resolve();
              },
            },
          ]}
          validateTrigger={["onChange", "onBlur"]}
        >
          <PhoneField
            label="Phone Number"
            placeholder="Enter Your Mobile Number"
            className="phone-input"
            required
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {vendor ? "Update Vendor" : "Add Vendor"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default VendorModal;
