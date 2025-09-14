/* eslint-disable no-unused-vars */
import type { ColumnType } from "antd/es/table";
import React from "react";
import TableActions from "../../components/TableAction";
import moment from "moment";

interface Vendor {
  id: string;
  shop_name: string;
  open_time: string | null;
  close_time: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  phone_number: string;
}

interface ActionProps {
  data: Vendor;
  onDelete?: (data: Vendor) => void;
  onUpdate?: (data: Vendor) => void;
  onView?: (data: Vendor) => void;
  page: number;
  limit: number;
}

export const VENDOR_COLUMNS = [
  {
    title: "Shop Name",
    dataIndex: "shop_name",
    key: "shop_name",
  },
  {
    title: "User Name",
    dataIndex: "name",
    key: "user_name",
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
  },

  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
    sorter: (a: Vendor, b: Vendor): number => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    },
  },
] as ColumnType<Record<string, unknown>>[];

export const VendorAction: React.FC<ActionProps> = ({
  data,
  onDelete,
  onUpdate,
  onView,
  page,
  limit,
}) => (
  <TableActions
    data={data}
    onDelete={onDelete}
    onUpdate={onUpdate}
    onView={onView}
    page={page}
    limit={limit}
    deletePopupTitle="Delete this vendor"
    deletePopupDesc="Are you sure to delete this vendor?"
  />
);
