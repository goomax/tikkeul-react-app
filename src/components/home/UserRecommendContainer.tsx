import Typography from '@/components/common/Typography';
import { useQueryString } from '@/hooks';
import { Skeleton, Stack, useTheme } from '@mui/material';
import RecommendCourses from './RecommendCourses';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { mockArray } from '@/utils/generator';
import { Suspense } from 'react';
import { useGetCoursesByGroupQuery } from '@/queries/useGetCoursesByGroupQuery';

const UserRecommendContainer = () => {
  const theme = useTheme();

  return (
    <>
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Stack>
          <Typography fontSize={14} lineHeight="21px" bold>
            <Typography color="primary" inline>
              열정적인 활동가들
            </Typography>
            이 선택한 코스
          </Typography>
          <Typography fontSize={12} color="grey">
            같은 유형의 사용자들이 최근 일주일 간 가장 많이 본 코스입니다
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
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Typography fontSize={14} lineHeight="21px" bold>
          <Typography color="primary" inline>
            열정적인 활동가들
          </Typography>
          에게 딱 맞는 혜택 받기
        </Typography>
        <Stack
          sx={{
            backgroundColor: theme.palette.secondary.main,
            minHeight: '74px',
            padding: '12px',
            borderRadius: '4px',
          }}
        >
          <Typography fontSize={14} lineHeight="21px" color="white">
            오늘만{' '}
            <Typography inline bold color="white">
              속초 숙소 10%
            </Typography>
          </Typography>
          <Typography fontSize={14} lineHeight="21px" color="white">
            할인된 가격으로 예약하기
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default UserRecommendContainer;

const AsyncRecommendCourses = () => {
  const { getParams } = useQueryString();

  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const { courseList } = useGetCoursesByGroupQuery({ groupId: Number(groupId), type: 'recommend' });

  return <RecommendCourses courses={courseList} />;
};
