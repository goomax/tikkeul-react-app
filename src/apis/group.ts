import { Course, Group } from '@/schemas/types';
import apiClient from './apiClient';

/**
 * 특정 그룹 정보 불러오기
 */
export const getGroup = ({ groupId }: { groupId: number }) => {
  return apiClient.request<Group>({
    method: 'get',
    url: `/group/${groupId}`,
  });
};

/**
 * 그룹 생성
 */
export const createGroup = (data: {
  peopleCount: number;
  restaurantPrefer: 1 | 2 | 3 | 4 | 5;
  activityPrefer: 1 | 2 | 3 | 4 | 5;
  lodgingPrefer: 1 | 2 | 3 | 4 | 5;
  duration: number;
}) => {
  return apiClient.request<{
    id: number;
  }>({
    method: 'post',
    url: '/group',
    data,
  });
};

/**
 * 코스 담기
 */
export const pickCourseToGroup = ({ courseId, groupId }: { courseId: number; groupId: number }) => {
  return apiClient.request<{
    courseId: number;
  }>({
    method: 'post',
    url: `/group/${groupId}/pick/${courseId}`,
  });
};

/**
 * 코스 좋아요 토글
 */
export const toggleCourseLike = ({ courseId, groupId }: { courseId: number; groupId: number }) => {
  return apiClient.request<{
    courseId: number;
  }>({
    method: 'post',
    url: `/group/${groupId}/like/${courseId}`,
  });
};

export const getCoursesByGroup = ({ type, groupId }: { type: 'recommend' | 'like'; groupId: number }) => {
  return apiClient.request<{
    courseList: Course[];
  }>({
    method: 'get',
    url: `/group/${groupId}/course`,
    params: {
      type,
    },
  });
};

/**
 * 그룹 순서 변경
 */
export const updateCourseOrder = ({
  groupId,
  from,
  to,
  day,
  tourSites,
}: {
  groupId: number;
  from: number;
  to: number;
  day: number;
  tourSites: number[][];
}) => {
  return apiClient.request({
    method: 'put',
    url: `/group/${groupId}/order`,
    params: {
      from,
      to,
      day,
    },
    data: {
      tourSites,
    },
  });
};

/**
 * 장소 추가
 */
export const addToursiteToCourse = ({
  groupId,
  day,
  toursiteId,
}: {
  groupId: number;
  day: number;
  toursiteId: number;
}) => {
  return apiClient.request({
    method: 'post',
    url: `/group/${groupId}/toursite/${toursiteId}`,
    params: {
      day,
    },
  });
};

/**
 * 장소 제거
 */
export const deleteToursite = ({ groupId, toursiteId }: { groupId: number; toursiteId: number }) => {
  return apiClient.request({
    method: 'delete',
    url: `/group/${groupId}/toursite/${toursiteId}`,
  });
};

/**
 * 그룹 코스 내보내기
 */
export const exportCourse = ({ groupId }: { groupId: number }) => {
  return apiClient.request<{
    code: string;
  }>({
    method: 'get',
    url: `/group/${groupId}/export`,
  });
};

/**
 * 그룹 코스 불러오기
 */
export const importCourse = ({ token }: { token: string }) => {
  return apiClient.request<Group>({
    method: 'get',
    url: `/import`,
    params: {
      token,
    },
  });
};
