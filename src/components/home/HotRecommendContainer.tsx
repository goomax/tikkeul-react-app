import Typography from '@/components/common/Typography';
import useFetch from '@/hooks/useFetch';
import { GetRecommendedCoursesResponse } from '@/types/apiResponse';
import { Stack } from '@mui/material';
import RecommendCourses from './RecommendCourses';

const HotRecommendContainer = () => {
  const { payload: recommendedCourses } = useFetch<GetRecommendedCoursesResponse['data']>({
    url: '/recommendedCourseByType',
    defaultValue: [],
  });

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
      <RecommendCourses courses={recommendedCourses} />
    </Stack>
  );
};

export default HotRecommendContainer;
