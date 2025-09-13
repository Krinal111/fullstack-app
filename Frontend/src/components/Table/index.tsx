import React from 'react';
import { Table as AntdTable } from 'antd';
import type  { TableProps } from 'antd/es/table';
import './tableStyle.css';

const Table: React.FC<TableProps<Record<string, unknown>>> = ({ dataSource, columns, ...others }) => (
  <AntdTable dataSource={dataSource} columns={columns} {...others} scroll={{ y: 650 }} />
);

export default Table;
