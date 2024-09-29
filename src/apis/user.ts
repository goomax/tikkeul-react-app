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
    name: string;
    age: number;
    gender: 'M' | 'F';
    groups: {
      groupId: number;
      groupName: string;
    }[];
  }>({
    method: 'get',
    url: '/user',
  });
};

/**
 * 로그아웃
 */
export const postLogout = () => {
  return apiClient.request({
    method: 'post',
    url: '/auth/logout',
  });
};

/**
 * 회원탈퇴
 */
export const postWithdraw = () => {
  return apiClient.request({
    method: 'post',
    url: '/auth/withdraw',
  });
};
