import apiClient from './apiClient';

/**
 * 회원가입
 */
export const postUser = (data: { gender: 'M' | 'F'; age: number; name: string }) => {
  return apiClient.request({
    method: 'post',
    url: '/user',
    data,
  });
};

/**
 * 사용자 정보 불러오기
 */
export const getUser = () => {
  return apiClient.request<{
    user: {
      email: string;
      name: string;
      groupList: {
        groupId: number;
        groupType: string;
      }[];
    } | null;
  }>({
    method: 'get',
    url: '/user',
  });
};
