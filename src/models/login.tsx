import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { query, save } from '../utils/restful';
import { isEqual, isNull, isNaN, uniq, filter } from 'underscore';

export default {
  namespace: 'login',
  state: {
    loading: false,
    isLogin: true,
  },
  reducers: {
    SHOW_LOADING: function (state, action) {
      return Object.assign({}, state, { loading: true });
    },
    HIDE_LOADING: function (state, action) {
      return Object.assign({}, state, { loading: false });
    },
    SET_STATE: function (state, action) {
      return Object.assign({}, state, action.payload);
    }
  },
  effects: {
    LOGIN_IN: function* ({ payload }, { select, call, put }) {
      yield put({ type: 'SHOW_LOADING' });
      const data = yield call(query, '/test/login', payload);
      yield put({ type: 'HIDE_LOADING' });
      if (isEqual(parseInt(data), 1)) {
        yield put({ type: 'SET_STATE', payload: { isLogin: true } });
        yield put(routerRedux.push('/'));
      }
    },
    LOGIN_OUT: function* ({ payload }, { select, call, put }) {
      yield put({ type: 'SET_STATE', payload: { isLogin: false } });
      yield put(routerRedux.push('/login'));
    },
    IS_LOGIN: function* ({ payload }, { select, call, put }) {
      const isLogin = yield select(function (state) {
        return state['login']['isLogin'];
      });
      if (!isLogin) {
        message.warning('您的等待信息已过期，请重新登录！', 3);
        yield put(routerRedux.push('/login'));
      }
    },
  },
  subscriptions: {
    setup: function ({ dispatch, history }) {
      history.listen(function (location) {
        if (!isEqual(location.pathname, '/login')) {
          dispatch({ type: 'IS_LOGIN', payload: {} });
        }
      });
    }
  },
};
