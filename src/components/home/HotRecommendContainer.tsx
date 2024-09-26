import Typography from '@/components/common/Typography';
import { Skeleton, Stack } from '@mui/material';
import RecommendCourses from './RecommendCourses';
import { Suspense } from 'react';
import { mockArray } from '@/utils/generator';
import { useGetHotCourseQuery } from '@/queries/useGetHotCourseQuerie';

const HotRecommendContainer = () => {
  return (
    <Stack gap="16px" sx={{ padding: '8px 14px' }}>
      <Stack>
        <Typography fontSize={14} lineHeight="21px" bold>
          <Typography color="primary" inline>
            요즘 가장 핫한
          </Typography>{' '}
          코스 추천
        </Typography>
        <Typography fontSize={12} color="grey">
          최근 일주일 간 가장 담기가 많았던 코스입니다
        </Typography>
      </Stack>
      <Suspense
        fallback={
          <Stack gap="10px">
            {mockArray(3).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={113} />
            ))}
          </Stack>
        }
      >
        <AsyncRecommendCourses />
      </Suspense>
    </Stack>
  );
};

export default HotRecommendContainer;

const AsyncRecommendCourses = () => {
  const { courseList } = useGetHotCourseQuery({ count: 3 });

  return <RecommendCourses courses={courseList} />;
};
