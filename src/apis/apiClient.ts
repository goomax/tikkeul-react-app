import { ENV } from '@/constants/config';
import { ApiAdapter } from '@/utils/apiAdapter';
import axios from 'axios';
import { camelCase } from 'lodash-es';

const apiClient = axios.create({
  baseURL: ENV.SERVER_URL,
  withCredentials: true,
});

const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result: any, key: string) => {
      result[camelCase(key)] = toCamelCase(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

apiClient.interceptors.request.use((request) => {
  if (ENV.MOCK_MODE) {
    request['url'] = '/mocks' + request['url'] + '.json';
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    response.data = ApiAdapter.toCamelCase(response.data);

    if (ENV.MOCK_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response);
        }, 2000);
      });
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
