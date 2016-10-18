import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

/**
 * 表格布局 1
 * 
 * columns 列描述数
 * total 数据总数
 * loading 加载状态
 * dataSource 数据
 * current 当前页数
 * onPageChange 当前页数发生改变执行的回调
 * pageSize 每页条数
 * onShowSizeChange 每页条数发生改变执行的回调
 */
const TableLayout = ({ columns, total, loading, dataSource, current, onPageChange, pageSize, onPageSizeChange}) => {

  let tableProps = {
    columns: columns,
    dataSource: dataSource,
    loading: loading,
    rowKey: function (record) {
      return record.id;
    },
    pagination: {
      total: total || 0,
      current: current || 1,
      onChange: onPageChange,
      showSizeChanger: true,
      pageSize: pageSize || 10,
      onShowSizeChange: onPageSizeChange,
    },
  };

  return (
    <Table { ...tableProps } size="default" />
  );
};

export default connect()(TableLayout);
