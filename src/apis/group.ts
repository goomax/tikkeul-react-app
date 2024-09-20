import apiClient from './apiClient';

export interface Group {
  groupId: number;
  groupType: string;
  courseList: {
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
export const postGroup = (data: {
  headCount: number;
  restaurantPrefer: 1 | 2 | 3 | 4 | 5;
  activityPrefer: 1 | 2 | 3 | 4 | 5;
  lodgingPrefer: 1 | 2 | 3 | 4 | 5;
  startDate: Date;
  endDate: Date;
}) => {
  return apiClient.request<{
    group: Group;
  }>({
    method: 'post',
    url: '/group',
    data,
  });
};
