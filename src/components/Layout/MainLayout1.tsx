import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';

// 加载其它组件

import Sidebar from '../Views/Sidebar1';

// 加载布局样式

import styles from './style/MainLayout1.less';

const MainLayout = ({ children, location }) => {
  return (
    <section className={styles['ant-layout-aside']}>
      {/* 顶部导航 开始 */}
      <header className={styles['ant-layout-header']}>导航栏</header>
      {/* 顶部导航 结束 */}
      {/* 左侧菜单 开始 */}
      <nav className={styles['ant-layout-sider']}>
        <section className={styles['ant-layout-logo']}>
          TS-DVA
        </section>
        <Sidebar location={location}></Sidebar>
      </nav>
      {/* 左侧菜单 结束 */}
      <div className={styles['ant-layout-breadcrumb']}>
        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>应用列表</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* 主体内容 开始 */}
      <section className={styles['ant-layout-main']}>
        <div className={styles['ant-layout-container']}>
          <div className={styles['ant-layout-content']}>
            {children}
          </div>
        </div>
      </section>
      {/* 主体内容 结束 */}
      <footer className={styles['ant-layout-footer']}>Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持</footer>
    </section>
  );
};

MainLayout.prototype = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object
};

export default MainLayout;
