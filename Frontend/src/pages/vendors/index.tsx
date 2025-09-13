import React, { useEffect } from "react";
import { type ColumnType } from "rc-table";
import { type AppState, dispatch, useSelector } from "../../redux/store.ts";
import useNotification from "../../hooks/useNotification.ts";
import usePagination from "../../hooks/usePagination.ts";
import { VENDOR_COLUMNS, VendorAction } from "./constant.tsx";
import { setError } from "../../redux/slices/vendorSlice.ts";
import { getVendorsAction } from "../../redux/actions/vendorAction.ts";
import { Spin } from "antd";
import Table from "../../components/Table/index.tsx";
import "./style.css";
const Vendors: React.FC = () => {
  const { vendors, count, error, isLoading } = useSelector(
    (state: AppState) => state.vendors
  );

  const { openNotificationWithIcon, contextHolder } = useNotification();
  const { pagination, handleTableChange } = usePagination(10, count);

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
  // Add Action column
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
        onView={() => console.log("View", record)}
        onUpdate={() => console.log("Update", record)}
        onDelete={() => console.log("Delete", record)}
      />
    ),
  } as unknown as ColumnType<Record<string, unknown>>);

  return (
    <div>
      {contextHolder}
      {isLoading && <Spin />}
      <div className="vendor-table px-8">
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
