import { ENV } from '@/constants/config';
import { Adapter, toCamelCase, toSnakeCase } from '@/utils/adapter';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: ENV.MOCK_MODE ? '' : ENV.SERVER_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((request) => {
  if (ENV.MOCK_MODE) {
    request['url'] = '/mocks' + request['url'] + '.json';
  }

  if (request.data) {
    request.data = Adapter.from(request.data).to(toSnakeCase);
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => {
    response.data = Adapter.from(response.data).to(toCamelCase);

    if (ENV.MOCK_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response);
        }, 1000);
      });
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
