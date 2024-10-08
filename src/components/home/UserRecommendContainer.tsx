import Typography from '@/components/common/Typography';
import { useQueryString } from '@/hooks';
import { Skeleton, Stack, useTheme } from '@mui/material';
import RecommendCourses from './RecommendCourses';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useGetCoursesByGroupQuery } from '@/queries/useGetCoursesByGroupQuery';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { mockArray } from '@/utils/generator';
import AsyncBoundary from '../hoc/AsyncBoundary';
import ErrorBox from '../common/ErrorBox';

const UserRecommendContainer = () => {
  const theme = useTheme();
  const { getParams } = useQueryString();
  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const { findGroupById } = useGetUserQuery();
  const { courseList, isLoading, isError } = useGetCoursesByGroupQuery({
    groupId: Number(groupId),
    type: 'recommend',
  });

  return (
    <>
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Stack>
          <Typography fontSize={14} lineHeight="21px" bold>
            <Typography color="primary" inline>
              {findGroupById(Number(groupId))?.groupName}
            </Typography>
            들이 선택한 코스
          </Typography>
          <Typography fontSize={12} color="grey">
            같은 유형의 사용자들이 최근 일주일 간 가장 많이 본 코스입니다
          </Typography>
        </Stack>
        <AsyncBoundary
          isLoading={isLoading}
          isError={isError}
          errorFallback={<ErrorBox height={200} />}
          loadingFallback={
            <Stack gap="10px">
              {mockArray(3).map((_, index) => (
                <Skeleton key={index} variant="rectangular" width="100%" height={113} />
              ))}
            </Stack>
          }
        >
          <RecommendCourses courses={courseList} />
        </AsyncBoundary>
      </Stack>
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Typography fontSize={14} lineHeight="21px" bold>
          <Typography color="primary" inline>
            {findGroupById(Number(groupId))?.groupName}
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
