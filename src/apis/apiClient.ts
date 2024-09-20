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

export default apiClient;
