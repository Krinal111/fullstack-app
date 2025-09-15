import React, { useEffect, useState } from "react";
import { Card, Form, Input, Switch, Button } from "antd";
import { useSelector } from "../../redux/store";
import { type AppState } from "../../redux/store";
import Table from "../../components/Table";
import ViewProfileModal from "../../components/ProfileModal";
import VendorAvailableModal from "../../components/VendorAvailableModal";
import { PROFILE_TIMING_COLUMNS, ProfileTimingAction } from "./constant";
import {
  addVendorTimingAction,
  updateVendorTimingAction,
  deleteVendorTimingAction,
  getVendorAction,
} from "../../redux/actions/vendorTimingAction";
import { updateVendorAction } from "../../redux/actions/vendorAction";

const ProfilePage: React.FC = () => {
  const { id } = useSelector((state: AppState) => state.auth.userData);
  const {
    vendor,
    timings: vendorTimings,
    loading,
  } = useSelector((state: AppState) => state.vendorTimings);

  // ------------------ Vendor Info ------------------
  const [editVendor, setEditVendor] = useState(false);
  const [vendorForm] = Form.useForm();

  useEffect(() => {
    if (id) getVendorAction(id);
  }, [id]);

  useEffect(() => {
    if (vendor) {
      vendorForm.setFieldsValue({
        shop_name: vendor?.shop_name,
        is_active: vendor?.is_active,
      });
    }
  }, [vendor]);

  const handleVendorUpdate = async (values: any) => {
    if (id) {
      await updateVendorAction(id, values, 1, 10);
      setEditVendor(false);
    }
  };

  // ------------------ User Profile ------------------
  const [showProfileModal, setShowProfileModal] = useState<string>("");

  // ------------------ Vendor Timings ------------------
  const [timings, setTimings] = useState<any[]>(vendorTimings || []);
  const [editingTiming, setEditingTiming] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimings(vendorTimings || []);
  }, [vendorTimings]);

  const handleEditTiming = (timing: any) => {
    setEditingTiming(timing);
    setIsModalOpen(true);
  };

  const handleDeleteTiming = (timing: any) => {
    deleteVendorTimingAction(timing.id).then(() => {
      if (id) getVendorAction(id);
    });
  };

  const handleSaveTiming = async (timing: any) => {
    if (editingTiming) {
      await updateVendorTimingAction(editingTiming.id, timing);
    } else {
      if (vendor.id) await addVendorTimingAction(vendor.id, timing);
    }
    setEditingTiming(null);
    setIsModalOpen(false);
    if (id) getVendorAction(id);
  };

  const columns = [
    ...PROFILE_TIMING_COLUMNS,
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <ProfileTimingAction
          data={record}
          onUpdate={() => handleEditTiming(record)}
          onDelete={() => handleDeleteTiming(record)}
        />
      ),
    },
  ];

  return (
    <div className="p-4 grid gap-6">
      {/* 🔹 User Profile */}
      <Card
        title="User Profile"
        extra={
          <Button onClick={() => setShowProfileModal("open")}>Edit</Button>
        }
      >
        <p>
          <b>Name:</b> {vendor?.user?.name}
        </p>
        <p>
          <b>Phone:</b> {vendor?.user?.phone_number}
        </p>
      </Card>

      {/* 🔹 Vendor Info */}
      <Card
        title="Vendor Info"
        extra={
          !editVendor ? (
            <Button onClick={() => setEditVendor(true)}>Edit</Button>
          ) : null
        }
      >
        <Form
          form={vendorForm}
          layout="vertical"
          disabled={!editVendor}
          onFinish={handleVendorUpdate}
        >
          <Form.Item
            label="Shop Name"
            name="shop_name"
            rules={[{ required: true, message: "Shop name is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Is Active" name="is_active" valuePropName="checked">
            <Switch />
          </Form.Item>
          {editVendor && (
            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditVendor(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          )}
        </Form>
      </Card>

      {/* 🔹 Vendor Timings */}
      <Card
        title="Vendor Timings"
        extra={<Button onClick={() => setIsModalOpen(true)}>Add Timing</Button>}
      >
        <Table
          dataSource={timings}
          columns={columns}
          rowKey="id"
          loading={loading}
        />
      </Card>

      {/* 🔹 Timing Modal */}
      <VendorAvailableModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSave={handleSaveTiming}
        initialValues={editingTiming}
      />

      {/* 🔹 Profile Modal */}
      <ViewProfileModal
        isModalOpen={showProfileModal === "open"}
        setIsModalOpen={setShowProfileModal}
      />
    </div>
  );
};

export default ProfilePage;
