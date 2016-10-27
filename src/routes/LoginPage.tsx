import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

// 加载其它组件

import LoginForm from '../components/Views/LoginForm1';

// 定义界面属性接口，验证属性参数类型

interface PageProps {
  dispatch: any;
  location: any;
  login: any;
};

// 定义界面状态接口，验证状态参数类型

interface PageStates { };

// 构建界面

class Page extends React.Component<PageProps, PageStates> {

  constructor(props, context) {
    super(props, context);
  };

  handleSubmit(data: any) {
    this.props.dispatch({
      type: 'login/LOGIN_IN',
      payload: data
    });
  };

  render() {
    const { loading } = this.props.login;
    return (
      <LoginForm onSubmit={ this.handleSubmit.bind(this) } loading={ loading } />
    );
  };
}

function mapStateToProps({ login }) {
  return { login };
}

export default connect(mapStateToProps)(Page);
