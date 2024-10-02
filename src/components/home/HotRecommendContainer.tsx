import Typography from '@/components/common/Typography';
import { Skeleton, Stack } from '@mui/material';
import RecommendCourses from './RecommendCourses';
import { mockArray } from '@/utils/generator';
import { useGetHotCourseQuery } from '@/queries/useGetHotCourseQuerie';
import AsyncBoundary from '../hoc/AsyncBoundary';
import ErrorBox from '../common/ErrorBox';

const VISIBLE_LENGTH = 3;

const HotRecommendContainer = () => {
  const { courseList, isLoading, isError } = useGetHotCourseQuery({ count: VISIBLE_LENGTH });

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
      <AsyncBoundary
        isLoading={isLoading}
        isError={isError}
        loadingFallback={
          <Stack gap="10px">
            {mockArray(VISIBLE_LENGTH).map((_, index) => (
              <Skeleton key={index} variant="rectangular" width="100%" height={113} />
            ))}
          </Stack>
        }
        errorFallback={<ErrorBox height={200} />}
      >
        <RecommendCourses courses={courseList} />
      </AsyncBoundary>
    </Stack>
  );
};

export default HotRecommendContainer;
