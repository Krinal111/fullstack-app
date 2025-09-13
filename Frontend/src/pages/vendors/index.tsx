import React, { useEffect, useState } from "react";
import { type ColumnType } from "rc-table";
import { type AppState, dispatch, useSelector } from "../../redux/store.ts";
import useNotification from "../../hooks/useNotification.ts";
import usePagination from "../../hooks/usePagination.ts";
import { VENDOR_COLUMNS, VendorAction } from "./constant.tsx";
import { setError } from "../../redux/slices/vendorSlice.ts";
import {
  getVendorsAction,
  updateVendorAction,
  deleteVendorAction,
} from "../../redux/actions/vendorAction.ts";
import { Spin } from "antd";
import Table from "../../components/Table/index.tsx";
import "./style.css";
import EditPage, { type Field } from "../EditPage/index.tsx";

// Example fields config for vendor edit
export const vendorFields: Field[] = [
  {
    name: "shop_name",
    label: "Shop Name",
    component: "input",
    rules: [{ required: true }],
  },
  { name: "name", label: "User Name", component: "input" },
  { name: "phone_number", label: "Phone Number", component: "phone" },
  { name: "open_time", label: "Booking Start Time", component: "timepicker" },
  { name: "close_time", label: "Booking Close Time", component: "timepicker" },
];

const Vendors: React.FC = () => {
  const { vendors, count, error, isLoading } = useSelector(
    (state: AppState) => state.vendors
  );

  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { pagination, handleTableChange } = usePagination(10, count);

  const [editingVendor, setEditingVendor] = useState<any | null>(null);

  const handleCloseNotification = (): void => {
    dispatch(setError(null));
  };

  // load vendors
  useEffect(() => {
    getVendorsAction(pagination.pageSize, pagination.current, "ASC", "");
  }, [pagination.current, pagination.pageSize]);

  // show error notification
  useEffect(() => {
    if (error) {
      openNotificationWithIcon({
        type: "error",
        message: error.message,
        description: "",
        onClose: handleCloseNotification,
      });
      dispatch(setError(null));
    }
  }, [error]);

  const columns = [...VENDOR_COLUMNS];

  // Add Action column with redux actions
  columns.push({
    title: "Action",
    key: "action",
    width: 120,
    align: "center",
    render: (_: any, record: any): React.ReactNode => (
      <VendorAction
        page={pagination.current}
        limit={pagination.pageSize}
        data={record}
        onView={() => {}}
        onUpdate={() => setEditingVendor(record)}
        onDelete={() =>
          deleteVendorAction(record.id, pagination.current, pagination.pageSize)
        }
      />
    ),
  } as unknown as ColumnType<Record<string, unknown>>);

  // If editingVendor is set, show EditPage instead of table
  if (editingVendor) {
    return (
      <EditPage
        id={editingVendor.id}
        data={editingVendor}
        fields={vendorFields}
        handleUpdate={(id, values) => {
          updateVendorAction(
            id,
            values,
            pagination.current,
            pagination.pageSize
          );
          setEditingVendor(null); // return to table
        }}
        onCancel={() => setEditingVendor(null)}
      />
    );
  }

  return (
    <div>
      {contextHolder}
      {isLoading && <Spin />}
      <div className="vendor-table py-8 px-8">
        <Table
          columns={columns}
          dataSource={vendors}
          bordered
          onChange={handleTableChange}
          pagination={pagination}
          rowKey="id"
        />
      </div>
    </div>
  );
};

export default Vendors;
