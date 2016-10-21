import { isEqual, uniq } from 'underscore';
import { query } from '../utils/restful';

import { getSelectedKeys, getOpenKeys } from '../services/sidebar';

export default {
  namespace: 'sidebar',
  state: {
    menus: [],
    openKeys: [],
    selectedKeys: [],
  },
  reducers: {
    UPDATE_SIDEBAR: function (state, action) {
      return Object.assign({}, state, action.payload);
    }
  },
  effects: {
    INIT: function* ({ payload }, { select, call, put }) {
      const menus = yield call(query, '/test/sidebar', payload);
      if (menus && menus.length > 0) {
        let defaultSelectedKeys: string[] = yield call(getSelectedKeys, { menus, pathname: payload.pathname });
        let defaultOpenKeys: string[] = [];
        for (let i of defaultSelectedKeys) {
          defaultOpenKeys = Object.assign([], defaultOpenKeys, yield call(getOpenKeys, { menus, id: i }));
        }
        yield put({
          type: 'UPDATE_SIDEBAR',
          payload: {
            menus: menus,
            openKeys: defaultOpenKeys,
            selectedKeys: defaultSelectedKeys,
          }
        });
      }
    },
  },
  subscriptions: {
    setup: function ({ dispatch, history }) {
      let bool: boolean = false;
      history.listen(function (location) {
        if (!bool) {
          dispatch({
            type: 'INIT',
            payload: {
              pathname: location.pathname,
            }
          });
          bool = true;
        }
      });
    },
  },
};
