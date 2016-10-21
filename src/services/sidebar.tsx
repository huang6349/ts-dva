import { isEqual, uniq } from 'underscore';

export const PREFIX_SUB: string = 'sub';
export const PREFIX_MENU: string = 'menu';

export function getSelectedKeys({ menus, pathname, current_name = 'id', url_name = 'url' }) {
  let selectedKeys: string[] = [];
  menus.forEach(function (v, i) {
    if (isEqual(`/${v[url_name]}`, pathname)) {
      selectedKeys = Object.assign([], selectedKeys);
      selectedKeys.push(`${PREFIX_MENU}-${v[current_name]}`);
    }
  });
  return uniq(selectedKeys);
};

export function getOpenKeys({ menus, id, parent_name = 'parent_id', current_name = 'id' }) {
  let openKeys: string[] = [];
  menus.forEach(function (v, i) {
    if (v[parent_name] && isEqual(`${PREFIX_MENU}-${v[current_name]}`, id)) {
      openKeys = Object.assign([], openKeys, getOpenKeys({ menus, id: `${PREFIX_MENU}-${v[parent_name]}` }));
      openKeys.push(`${PREFIX_SUB}-${v[parent_name]}`);
    }
  });
  return uniq(openKeys);
};
