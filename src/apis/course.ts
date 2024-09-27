import { Course, Toursite } from '@/schemas/types';
import apiClient from './apiClient';

/**
 * 코스 상세보기 (수정 불가능한 코스 + 수정 가능한 코스)
 */
export const getCourse = ({ courseId }: { courseId: number }) => {
  return apiClient.request<Course>({
    method: 'get',
    url: `/course/${courseId}`,
  });
};

/**
 * 인기 코스 리스트 불러오기
 */
export const getHotCourse = ({ count }: { count: number }) => {
  return apiClient.request<{
    courseList: Course[];
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
  return apiClient.request<{ tourSites: Toursite[] }>({
    method: 'get',
    url: '/toursite',
    params,
  });
};

/**
 *  특정 장소 불러오기
 */
export const getTourSite = ({ tourSiteId }: { tourSiteId: number }) => {
  return apiClient.request<Toursite>({
    method: 'get',
    url: `/toursite/${tourSiteId}`,
  });
};
