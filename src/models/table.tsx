import { query } from '../utils/restful';

export default {
  namespace: 'table',
  state: {
    list: [],
    total: null,
    loading: false,
    current: null,
  },
  reducers: {
    show_loading: function (state, action) {
      return Object.assign({}, state, { loading: true });
    },
    query_success: function (state, action) {
      return Object.assign({}, state, action.payload, { loading: false });
    }
  },
  effects: {
    query: function* ({ payload }, { select, call, put }) {
      yield put({ type: 'show_loading' });
      payload.page = payload.page || 1;
      payload.limit = payload.limit || 10;
      let rows = yield call(query, '/test/table', payload);
      console.log(rows);
      console.log('ss');
      if (rows) {
        yield put({
          type: 'query_success',
          payload: {
            list: rows.data,
            total: rows.count,
            current: rows.currentPage,
            pageSize: rows.numsPerPage,
          },
        });
      }
    }
  },
  subscriptions: {
    setup: function ({ dispatch, history }) {
      history.listen(function (location) {
        if (location.pathname === '/table') {
          dispatch({
            type: 'query',
            payload: location.query
          });
        }
      });
    }
  },
};
