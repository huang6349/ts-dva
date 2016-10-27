import fetch from 'dva/fetch';
import { message } from 'antd';

const parseJSON = (response) => {
  return response.json();
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.message = response;
    throw error;
  }
};

const succeeded = (data) => {
  if (parseInt(data.errno) !== 0) {
    message.error(data['errmsg']);
  }
  if (data) {
    return data['data'];
  } else {
    return data;
  }
};

const failed = (error) => {
  console.log('请求失败', error);
  return error;
};

export default function request(url, options) {
  return fetch(url, options).then(checkStatus).then(parseJSON).then(succeeded).catch(failed);
}
