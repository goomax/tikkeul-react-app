import apiClient from './apiClient';
import { TourSite2 } from './course';

export interface Group {
  groupId: number;
  groupName: string;
  cost: number;
  duration: number;
  courseDescription: string;
  courseDetails: {
    courseId: number;
    title: string;
    description: string;
    tags: string[];
    likeCount: number;
    cartCount: number;
    isLike: boolean;
    price: number;
  }[];
}

/**
 * 특정 그룹 정보 불러오기
 */
export const getGroup = ({ groupId }: { groupId: number }) => {
  return apiClient.request<{
    group: Group;
  }>({
    method: 'get',
    url: `/group/${groupId}`,
  });
};

/**
 * 그룹 생성
 */
export const createGroup = (data: {
  headCount: number;
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
    toursites: TourSite2[];
  }>({
    method: 'get',
    url: `/group/${groupId}/course`,
    params: {
      type,
    },
  });
};
