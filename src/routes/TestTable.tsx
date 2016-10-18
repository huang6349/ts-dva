import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

// 加载其它组件

import TableLayout from '../components/Views/TableLayout1';

const TestTable = ({ dispatch, location, table }) => {

  const { list, total, loading, current, pageSize  } = table;

  let listProps = {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 180,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        width: 150,
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
      }
    ],
    total,
    current,
    pageSize,
    loading,
    dataSource: list,
    onPageChange: function (page) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: Object.assign({}, location.query, { page: page }),
      }));
    },
    onPageSizeChange: function (page, limit) {
      dispatch(routerRedux.push({
        pathname: location.pathname,
        query: Object.assign({}, location.query, { page: page, limit: limit }),
      }));
    },
  };

  return (
    <TableLayout { ...listProps } />
  );
};

TestTable.prototype = {
  table: PropTypes.object,
};

function mapStateToProps({ table }) {
  return { table };
}

export default connect(mapStateToProps)(TestTable);
