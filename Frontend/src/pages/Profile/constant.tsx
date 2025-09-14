import type { ColumnType } from "antd/es/table";
import TableActions from "../../components/TableAction";

interface ActionProps {
  data: any;
  onDelete?: (data: any) => void;
  onUpdate?: (data: any) => void;
}

export const PROFILE_TIMING_COLUMNS: ColumnType<Record<string, unknown>>[] = [
  {
    title: "Meal Type",
    dataIndex: "meal_type",
    key: "meal_type",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Start Time",
    dataIndex: "start_time",
    key: "start_time",
  },
  {
    title: "End Time",
    dataIndex: "end_time",
    key: "end_time",
  },
];

export const ProfileTimingAction: React.FC<ActionProps> = ({
  data,
  onDelete,
  onUpdate,
}) => (
  <TableActions
    data={data}
    onDelete={onDelete}
    onUpdate={onUpdate}
    deletePopupTitle="Delete this timing"
    deletePopupDesc="Are you sure to delete this timing?"
  />
);
