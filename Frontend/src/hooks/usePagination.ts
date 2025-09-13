import { type TablePaginationConfig } from "antd";
import { useState, useEffect } from "react";

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  pageSizeOptions: string[];
  showSizeChanger: boolean;
}

interface UsePaginationReturnType {
  pagination: PaginationConfig;
  handleTableChange: (newPagination: TablePaginationConfig) => void;
}

const usePagination = (
  defaultPageSize = 10,
  totalCount = 0
): UsePaginationReturnType => {
  const [pagination, setPagination] = useState<PaginationConfig>({
    current: 1,
    pageSize: defaultPageSize,
    total: totalCount,
    pageSizeOptions: ["1", "2", "5", "10", "20", "30"],
    showSizeChanger: true,
  });

  useEffect(() => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      total: totalCount,
    }));
  }, [totalCount]);

  const handleTableChange = (newPagination: TablePaginationConfig): void => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: newPagination.current || 1,
      pageSize: newPagination.pageSize || defaultPageSize,
    }));
  };

  return { pagination, handleTableChange };
};

export default usePagination;
