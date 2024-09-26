import apiClient from './apiClient';

export interface Course {
  courseId: number;
  title: string;
  description: string;
  tags: string[];
  likeCount: number;
  cartCount: number;
  isLike: boolean;
  price: number;
  thumbnails: string[];
}

export interface TourSite {
  tourSiteId: number;
  days: number;
  type: 'restaurant' | 'activity' | 'lodging';
  name: string;
  tags: string[];
  startTime: `${number}:${number}`;
  endTime: `${number}:${number}`;
  phoneNumber: string;
  price: number;
  address: string;
  description: string;
  lat: number; // 위도
  lng: number; // 경도
  order: number;
  thumbnails: string[];
}

/**
 * 추천 코스 리스트
 */
export interface TourSite2 {
  id: number;
  name: string;
  description: string;
  cost: number;
  picked: number;
  liked: number;
  tags: string[];
  tourSites: {
    tourSiteId: number;
    latitude: number;
    longitude: number;
    name: string;
    cost: number;
    startTime: string;
    endTime: string;
    phone: string;
    type: string;
    address: string;
    recommendType: number;
    description: string;
    photoUrls: string[];
  }[];
}

/**
 * 코스 리스트 불러오기 (수정 불가능한 코스들)
 */
export const getCourseList = (params: { type: 'recommend' | 'like' | 'hot'; groupId?: number }) => {
  return apiClient.request<{
    courseList: Course[];
  }>({
    method: 'get',
    url: '/courses',
    params,
  });
};

/**
 * 코스 상세보기 (수정 불가능한 코스 + 수정 가능한 코스)
 */
export const getCourse = ({ courseId }: { courseId: number }) => {
  return apiClient.request<{
    course: Course & { tourSiteList: TourSite };
  }>({
    method: 'get',
    url: `/courses/${courseId}`,
  });
};

/**
 * 코스 수정
 */
export const updateCourse = ({
  groupId,
  courseId,
  updatedList,
}: {
  updatedList: Pick<TourSite, 'tourSiteId' | 'days' | 'order'>[];
  groupId: number;
  courseId: number;
}) => {
  return apiClient.request<{
    courseId: number;
  }>({
    method: 'post',
    url: `/courses/${courseId}`,
    data: {
      groupId,
      updatedList,
    },
  });
};

/**
 * 여행 장소 리스트 불러오기 (검색, 메인페이지 하단에서 사용)
 */
export const getTourSiteList = (params: {
  filter?: 'restaurant' | 'activity' | 'lodging';
  count?: number;
  searchKeyword?: string;
}) => {
  return apiClient.request<{ tourSiteList: Omit<TourSite, 'order'>[] }>({
    method: 'get',
    url: '/toursites',
    params,
  });
};

export const getHotCourse = () => {
  return apiClient.request<{
    toursites: TourSite2[];
  }>({
    method: 'get',
    url: '/course/hot',
  });
};
