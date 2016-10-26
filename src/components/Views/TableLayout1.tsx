import * as React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Menu, Dropdown, Icon } from 'antd';

// 定义组件属性接口，验证属性参数类型

interface ViewProps {
  dispatch: any;
  location: any;
  columns: Array<any>;
  dataSource: Array<any>;
  loading: Boolean;
  key?: string;
  total: Number;
  current: Number;
  pageSize: Number;
};

// 定义组件状态接口，验证状态参数类型

interface ViewStates { };

// 构建组件

class View extends React.Component<ViewProps, ViewStates> {

  constructor(props, context) {
    super(props, context);
  };

  init() {
    return {
      columns: this.pushAction.bind(this)(),
      dataSource: this.props.dataSource,
      loading: this.props.loading,
      rowKey: this.getRowKey.bind(this),
      pagination: {
        total: this.props.total || 0,
        current: this.props.current || 1,
        onChange: this.onPageChange.bind(this),
        showSizeChanger: true,
        pageSize: this.props.pageSize || 10,
        onShowSizeChange: this.onShowSizeChange.bind(this),
      },
    };
  };

  pushAction() {
    let columns = this.props.columns;
    if (columns.length > 0) {
      const menu = (
        <Menu>
          <Menu.Item key="0">
            <a href="javascript:void(0);">删除该项</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="javascript:void(0);">修改该项</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3">
            <a href="javascript:void(0);">查看该项</a>
          </Menu.Item>
        </Menu>
      );
      columns.push({
        title: '操作',
        key: 'action',
        width: 180,
        render: function (text, row, index) {
          return (
            <div>
              <a href="javascript:void(0);">查看</a>
              <span className="ml-10 mr-10">|</span>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="javascript:void(0);">
                  更多 <Icon type="down" />
                </a>
              </Dropdown>
            </div>
          );
        },
      });
    }
    return columns;
  };

  getRowKey(record) {
    return record[this.props.key] || record['id'];
  }

  onPageChange(page) {
    if (this.props.location) {
      this.props.dispatch(routerRedux.push({
        pathname: this.props.location.pathname,
        query: Object.assign({}, this.props.location.query, { page: page }),
      }));
    }
  };

  onShowSizeChange(page, limit) {
    if (this.props.location) {
      this.props.dispatch(routerRedux.push({
        pathname: this.props.location.pathname,
        query: Object.assign({}, this.props.location.query, { page: page, limit: limit }),
      }));
    }
  };

  render() {
    return (
      <Table { ...this.init.bind(this)() } size="default" />
    );
  };
};

// 导出组件

export default View;
