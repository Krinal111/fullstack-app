import React, { useEffect, useState } from "react";
import { type ColumnType } from "rc-table";
import { type AppState, dispatch, useSelector } from "../../redux/store.ts";
import useNotification from "../../hooks/useNotification.ts";
import usePagination from "../../hooks/usePagination.ts";
import { VENDOR_COLUMNS, VendorAction } from "./constant.tsx";
import { setError } from "../../redux/slices/vendorSlice.ts";
import {
  getVendorsAction,
  deleteVendorAction,
} from "../../redux/actions/vendorAction.ts";
import { Spin } from "antd";
import Table from "../../components/Table/index.tsx";
import "./style.css";
import Button from "../../components/Button/index.tsx";
import { FaPlus } from "react-icons/fa";
import VendorModal from "../../components/VendorModal/index.tsx";

const Vendors: React.FC = () => {
  const { vendors, count, error, isLoading } = useSelector(
    (state: AppState) => state.vendors
  );

  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { pagination, handleTableChange } = usePagination(10, count);

  const [editingVendor, setEditingVendor] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
        onUpdate={() => {
          setEditingVendor(record);
          setModalOpen(true);
        }}
        onDelete={() =>
          deleteVendorAction(
            record.user_id,
            pagination.current,
            pagination.pageSize
          )
        }
      />
    ),
  } as unknown as ColumnType<Record<string, unknown>>);

  return (
    <div className="flex flex-col">
      {contextHolder}
      {isLoading && <Spin />}

      {/* Add Vendor Button */}
      <Button
        type="primary"
        className="ml-auto mr-10 mt-5"
        onClick={() => {
          setEditingVendor(null);
          setModalOpen(true);
        }}
      >
        <span>
          <FaPlus />
        </span>
        Add Vendor
      </Button>

      {/* Vendor Modal (for both add & edit) */}
      <VendorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        page={pagination.current}
        limit={pagination.pageSize}
        vendor={editingVendor} // null → Add, object → Edit
      />

      {/* Table */}
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
