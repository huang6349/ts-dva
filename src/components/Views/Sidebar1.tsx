import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import { isEqual, isEmpty, uniq, last, filter } from 'underscore';

import { RecursiveTree } from '../../utils/common.util';
import { PREFIX_SUB, PREFIX_MENU, getSelectedKeys, getOpenKeys } from '../../services/sidebar';

function createMenu({ menus, title_name = 'name', icon_name = 'icon', current_name = 'id', url_name = 'url', child_name = 'childs' }) {
  return menus.map((item) => {
    let title: any = item[title_name];
    if (item[icon_name]) {
      title = <div><Icon type={item[icon_name]} />{title}</div>;
    }
    if (item[child_name] && item[child_name].length > 0) {
      return (
        <Menu.SubMenu key={`${PREFIX_SUB}-${item[current_name]}`} title={title}>
          { createMenu({ menus: item[child_name] }) }
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={`${PREFIX_MENU}-${item[current_name]}`}>
          <Link to={item[url_name]}>{title}</Link>
        </Menu.Item>
      );
    }
  });
};

const Sidebar = ({ dispatch, location, sidebar }) => {
  let { menus, openKeys, selectedKeys } = sidebar;
  let changeHandle = (item: string[]) => {
    let newOpenKeys: string[] = new Array();
    if (item && item.length > 0) {
      const last_item = last(item);
      menus.forEach(function (v, i) {
        if (isEqual(`${PREFIX_SUB}-${v['id']}`, last_item)) {
          newOpenKeys = Object.assign([], getOpenKeys({ menus, id: `${PREFIX_MENU}-${v['id']}` }));
        }
      });
      newOpenKeys.push(last_item);
    }
    dispatch({
      type: 'sidebar/UPDATE_SIDEBAR',
      payload: {
        openKeys: uniq(newOpenKeys),
      }
    });
  };
  let clickHandle = ({ item, key, keyPath }) => {
    dispatch({
      type: 'sidebar/UPDATE_SIDEBAR',
      payload: {
        openKeys: filter(keyPath, function (keys) {
          return !isEqual(keys, key);
        }),
        selectedKeys: [key],
      }
    });
  };
  return (
    <Menu mode="inline" theme="dark" onOpenChange={changeHandle} onClick={clickHandle} openKeys={openKeys} selectedKeys={selectedKeys}>
      { createMenu({ menus: RecursiveTree({ data: menus }) }) }
    </Menu>
  );
};

Sidebar.prototype = {
  location: PropTypes.object.isRequired,
  sidebar: PropTypes.array.isRequired,
};

function mapStateToProps({ sidebar }) {
  return { sidebar };
}

export default connect(mapStateToProps)(Sidebar);
