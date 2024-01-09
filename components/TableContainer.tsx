import React from "react";
import { Table } from "antd";

interface TableColumn {
  columnsData: any[];
  rowsData: any[];
  pagination: {
    pageSize: number;
    onChange: (pagination: { current: number; pageSize: number }) => void;
  };
  currentPage: number;
  totalItems: number;
}

const TableContainer = ({
  columnsData,
  rowsData,
  pagination,
  currentPage,
  totalItems,
// }: TableColumn|any) => {     //remove because there are some tables that are under development , may cause error in development
}: any) => {
  const antPagination = {
    current: currentPage,
    pageSize: pagination.pageSize,
    total: totalItems,
    onChange: (page: number, pageSize: number) => {
      pagination.onChange({ current: page, pageSize });
    },
  };
  return (
    <div className="w-full  overflow-x-auto my-5 ">
      <Table
        columns={columnsData}
        dataSource={rowsData}
        // pagination={rowsData && rowsData.length ? antPagination : false}
        scroll={{ x: 'max-content' }}
        pagination={{ total: rowsData?.length, showTotal: (total, range) =><p className="text-600">{`Showing ${range[0]}-${range[1]} of ${total} items`}</p> }}
      
      />
    </div>
  );
};

export default TableContainer;
