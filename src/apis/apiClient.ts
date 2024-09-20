import { ENV } from '@/constants/config';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: ENV.SERVER_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((request) => {
  if (ENV.MOCK_MODE) {
    request['url'] = '/mocks' + request['url'] + '.json';
  }

  return request;
});

apiClient.interceptors.response.use(
  (response) => {
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
