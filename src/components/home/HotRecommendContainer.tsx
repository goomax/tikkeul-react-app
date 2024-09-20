import Typography from '@/components/common/Typography';
import { useQueryString } from '@/hooks';
import { Stack } from '@mui/material';
import RecommendCourses from './RecommendCourses';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useGetCourseQueries } from '@/queries/useGetCourseQueries';

const HotRecommendContainer = () => {
  const { getParams } = useQueryString();

  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const [, hotCourses] = useGetCourseQueries({ groupId: Number(groupId) ?? 1111 });

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
      {hotCourses.data && <RecommendCourses courses={hotCourses.data} />}
    </Stack>
  );
};

export default HotRecommendContainer;
