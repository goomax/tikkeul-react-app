import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import useFetch from '@/hooks/useFetch';
import { GetRecommendedCoursesResponse } from '@/types/apiResponse';
import { Box, Stack, useTheme } from '@mui/material';

const UserRecommendContainer = () => {
  const theme = useTheme();
  const { payload: recommendedCourses } = useFetch<GetRecommendedCoursesResponse['data']>({
    url: '/recommendedCourseByType',
    defaultValue: [],
  });

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
        <Box
          sx={{
            boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
            borderRadius: '12px',
          }}
        >
          {recommendedCourses.map((course) => {
            return (
              <Stack
                key={course.key}
                flexDirection="row"
                alignItems="center"
                gap="12px"
                sx={{ height: '100%', padding: '8px 14px' }}
              >
                <img src={course.image} width={80} height={80} alt={course.title} style={{ borderRadius: '16px' }} />
                <Stack
                  gap="8px"
                  sx={{
                    width: '202px',
                  }}
                >
                  <Chip
                    radiusVariant="square"
                    color="default"
                    sx={{
                      width: '56px',
                      height: '19px',
                      '& .MuiChip-label': {
                        padding: '1px',
                        fontSize: '10px',
                      },
                    }}
                    label={course.type}
                  />
                  <Stack gap="1px">
                    <Typography fontSize={12} bold noWrap>
                      {course.title}
                    </Typography>
                    <Typography fontSize={10} color="grey">
                      {course.desc}
                    </Typography>
                  </Stack>
                  <Stack flexDirection="row" gap="8px">
                    <Stack flexDirection="row" gap="4px">
                      <Heart svgProps={{ width: '15px', height: '15px' }} />
                      <Typography fontSize={12} color="grey">
                        {course.heart}
                      </Typography>
                    </Stack>
                    <Stack flexDirection="row" gap="4px">
                      <ShoppingCart svgProps={{ width: '15px', height: '15px' }} pathProps={{ stroke: '#CCCCCC' }} />
                      <Typography fontSize={12} color="grey">
                        {course.cart}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack justifyContent="flex-end" alignItems="flex-end">
                    <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
                      예상 평균 금액{' '}
                      <Typography fontSize={14} color="secondary" inline bold>
                        {course.price}원
                      </Typography>
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Box>
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
            color: 'white',
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
