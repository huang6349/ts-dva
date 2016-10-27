import * as React from 'react';
import { Router, Route } from 'dva/router';

// 加载布局

import MainLayout from './components/Layout/MainLayout1';

// 加载程序页面

import LoginPage from './routes/LoginPage';
import IndexPage from './routes/IndexPage.js';
import TestTablePage from './routes/TestTable';

// 导出路由配置

export default ({ history }) => {
  return (
    <Router history={ history }>
      <Route path="login" components={ LoginPage }></Route>
      <Route component={ MainLayout }>
        <Route path="/" component={ IndexPage } />
        <Route path="table" components={ TestTablePage }></Route>
      </Route>
    </Router>
  );
};
