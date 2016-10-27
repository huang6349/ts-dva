import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

// 加载其它组件

import TableLayout from '../components/Views/TableLayout1';

// 定义界面属性接口，验证属性参数类型

interface PageProps {
  dispatch: any;
  location: any;
  table: any;
};

// 定义界面状态接口，验证状态参数类型

interface PageStates { };

// 构建界面

class Page extends React.Component<PageProps, PageStates> {

  constructor(props, context) {
    super(props, context);
  };

  render() {

    const { list, total, loading, current, pageSize } = this.props.table;

    const tableProps = {
      dispatch: this.props.dispatch,
      location: this.props.location,
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
        },
      ],
      total: total,
      current: current,
      pageSize: pageSize,
      loading: loading,
      dataSource: list,
    };

    return (
      <TableLayout { ...tableProps } ></TableLayout>
    );
  };
};

// 连接组件和模型

function mapStateToProps({ table }) {
  return { table };
}

// 导出界面

export default connect(mapStateToProps)(Page);
