import * as React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';

// 加载其它组件

import Sidebar from '../Views/Sidebar1';

// 加载组件样式

const styles = require('./style/MainLayout1.less');

// 定义组件属性接口，验证属性参数类型

interface MainLayoutProps {
  children: Element,
};

// 定义组件状态接口，验证状态参数类型

interface MainLayoutState { };

// 构建组件

class MainLayout extends React.Component<MainLayoutProps, MainLayoutState> {
  render() {
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
          <Sidebar />
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
              { this.props.children }
            </div>
          </div>
        </section>
        {/* 主体内容 结束 */}
        <footer className={styles['ant-layout-footer']}>Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持</footer>
      </section>
    );
  };
};

// 导出组件

export default connect()(MainLayout);
