import qs from 'qs';
import request from './request';

const baseUrl = '/api';

/**
 * 增加数据
 * 
 * @export
 * @param {any} url
 * @param {any} params
 * @returns
 */
export function save(url: string, params: any) {
  return request(makeUrl(baseUrl, url, params), {
    method: 'POST',
    body: qs.stringify(params)
  });
};

/**
 * 删除数据
 * 
 * @export
 * @param {any} url
 * @param {any} params
 * @returns
 */
export function remove(url: string, params: any) {
  return request(makeUrl(baseUrl, url, params), {
    method: 'DELETE',
    body: qs.stringify(params)
  });
};

/**
 * 查询数据
 * 
 * @export
 * @param {any} url
 * @param {any} params
 * @returns
 */
export function query(url: string, params: any) {
  return request(`${makeUrl(baseUrl, url, params)}?${qs.stringify(params)}`, {
    method: 'GET'
  });
};

/**
 * 修改数据
 * 
 * @export
 * @param {any} url
 * @param {any} params
 * @returns
 */
export function update(url: string, params: any) {
  return request(makeUrl(baseUrl, url, params), {
    method: 'PUT',
    body: qs.stringify(params)
  });
};

const makeUrl = function (baseUrl: string, endpoint: string, params: any) {
  if (/^https?:\/\//.test(endpoint)) {
    throw new Error(`Endpoint 无效: "${endpoint}"`)
  }
  let points = endpoint.split('@');
  for (let i in points) {
    if (parseInt(i) > 1) {
      if (params[points[i]]) {
        endpoint = `${endpoint}/${params[points[i]]}`;
      }
    } else {
      endpoint = points[i];
    }
  }
  return `${baseUrl.replace(/(\/$)/, '')}/${endpoint.toString().replace(/(^\/)/, '')}`;
};

export default {
  save: save,
  remove: remove,
  query: query,
  update: update
};
