import { Course, TourSite } from '@/schemas/types';
import apiClient from './apiClient';

/**
 * 코스 상세보기 (수정 불가능한 코스 + 수정 가능한 코스)
 */
export const getCourse = ({ courseId }: { courseId: number }) => {
  return apiClient.request<Course>({
    method: 'get',
    url: `/courses/${courseId}`,
  });
};

/**
 * 인기 코스 리스트 불러오기
 */
export const getHotCourse = ({ count }: { count: number }) => {
  return apiClient.request<{
    toursites: Course[];
  }>({
    method: 'get',
    url: '/course/hot',
    params: {
      count,
    },
  });
};

/**
 * 여행 장소 리스트 불러오기 (검색, 메인페이지 하단에서 사용)
 */
export const getTourSiteList = (params: {
  filter?: 'restaurant' | 'activity' | 'lodging';
  count?: number;
  keyword?: string;
}) => {
  return apiClient.request<{ tourSites: TourSite[] }>({
    method: 'get',
    url: '/toursite',
    params,
  });
};

/**
 *  특정 장소 불러오기
 */
export const getTourSite = ({ tourSiteId }: { tourSiteId: number }) => {
  return apiClient.request<TourSite>({
    method: 'get',
    url: `/toursite/${tourSiteId}`,
  });
};
