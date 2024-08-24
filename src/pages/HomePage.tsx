import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import TextField from '@/components/common/TextField';
import { Heart, Search, ShoppingCart } from '@/components/icons';
import useFetch from '@/hooks/useFetch';
import {
  GetBenefitResponse,
  GetRecommendedCoursesResponse,
  GetRecommendedLocationsResponse,
} from '@/types/apiResponse';
import { formatTimeRemaining } from '@/utils/dateHelper';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>({});
  const theme = useTheme();
  const { payload: benefits } = useFetch<GetBenefitResponse['data']>({ url: '/benefit' });
  const { payload: recommendedCourses } = useFetch<GetRecommendedCoursesResponse['data']>({
    url: '/recommendedCourseByType',
  });
  const { payload: recommendedLocations } = useFetch<GetRecommendedLocationsResponse['data']>({
    url: '/recommendedLocationsByCategory',
  });

  useEffect(() => {
    if (!Array.isArray(benefits)) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTimes) => {
        const newTimes = { ...prevTimes };
        benefits.forEach((benefit) => {
          newTimes[benefit.key] = formatTimeRemaining(benefit.deadline);
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [benefits]);

  return (
    <>
      <Stack sx={{ backgroundColor: '#F3FFFB' }}>
        <Box sx={{ padding: '19px 14px' }}>
          <TextField
            variant="outlined"
            placeholder="여행지 정보를 찾고 계신가요? 검색해 보세요"
            aria-label="여행지 정보 검색"
            fullWidth
            InputProps={{
              startAdornment: <Search />,
              sx: {
                height: '36px',
              },
            }}
          />
        </Box>
        <Stack>
          <Box sx={{ padding: '8px 14px' }}>
            <Typography>안녕하세요, 김티끌님!</Typography>
            <Typography>오늘 받으실 수 있는 혜택은 총 3개입니다</Typography>
          </Box>
          <Stack
            flexDirection="row"
            gap="20px"
            sx={{
              padding: '8px 14px',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {Array.isArray(benefits) &&
              benefits.map((benefit) => {
                return (
                  <Box
                    key={benefit.key}
                    sx={{
                      minWidth: '188px',
                      height: '135px',
                      padding: '8px 14px',
                      boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                    }}
                  >
                    <Stack gap="16px">
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
                        label={benefit.type}
                      />
                      <Stack gap="4px" height="34px">
                        <Typography fontSize="12px" fontWeight="bold">
                          {benefit.title}
                        </Typography>
                        <Typography fontSize="10px">{benefit.description}</Typography>
                      </Stack>
                      <Button sx={{ height: '34px' }}>{timeRemaining[benefit.key]} 남음</Button>
                    </Stack>
                  </Box>
                );
              })}
          </Stack>
        </Stack>
      </Stack>
      {/* 회원 전용 추천 코스 */}
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Stack>
          <Typography fontSize="14px" lineHeight="21px">
            열정적인 활동가들이 선택한 코스
          </Typography>
          <Typography fontSize="12px">같은 유형의 사용자들이 최근 일주일 간 가장 많이 본 코스입니다</Typography>
        </Stack>
        <Box
          sx={{
            boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
            borderRadius: '12px',
          }}
        >
          {Array.isArray(recommendedCourses) &&
            recommendedCourses.map((course) => {
              return (
                <Stack
                  key={course.key}
                  flexDirection="row"
                  alignItems="center"
                  gap="12px"
                  sx={{ height: '100%', padding: '8px 14px' }}
                >
                  <img src={course.image} width={80} height={80} alt={course.title} style={{ borderRadius: '16px' }} />
                  <Stack gap="8px">
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
                      <Typography fontSize="15px">{course.title}</Typography>
                      <Typography fontSize="15px">{course.desc}</Typography>
                    </Stack>
                    <Stack flexDirection="row" gap="8px">
                      <Stack flexDirection="row" gap="4px">
                        <Heart svgProps={{ width: '15px', height: '15px' }} />
                        <Typography fontSize="12px" color="#CCCCCC">
                          {course.heart}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="4px">
                        <ShoppingCart svgProps={{ width: '15px', height: '15px' }} pathProps={{ stroke: '#CCCCCC' }} />
                        <Typography fontSize="12px" color="#CCCCCC">
                          {course.cart}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack justifyContent="flex-end" alignItems="flex-end">
                      <Typography>예상 평균 금액 {course.price}원</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
        </Box>
      </Stack>

      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Typography fontSize="14px" lineHeight="21px">
          열정적인 활동가들에게 딱 맞는 혜택 받기
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
          <Typography fontSize="14px" lineHeight="21px">
            오늘만 속초 숙소 10%
          </Typography>
          <Typography fontSize="14px" lineHeight="21px">
            할인된 가격으로 예약하기
          </Typography>
        </Stack>
      </Stack>
      {/* 핫한 추천 코스 */}
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Stack>
          <Typography fontSize="14px" lineHeight="21px">
            요즘 가장 핫한 코스 추천
          </Typography>
          <Typography fontSize="12px">최근 일주일 간 가장 담기가 많았던 코스입니다</Typography>
        </Stack>
        <Box
          sx={{
            boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
            borderRadius: '12px',
          }}
        >
          {Array.isArray(recommendedCourses) &&
            recommendedCourses.map((course) => {
              return (
                <Stack
                  key={course.key}
                  flexDirection="row"
                  alignItems="center"
                  gap="12px"
                  sx={{ height: '100%', padding: '8px 14px' }}
                >
                  <img src={course.image} width={80} height={80} alt={course.title} style={{ borderRadius: '16px' }} />
                  <Stack gap="8px">
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
                      <Typography fontSize="15px">{course.title}</Typography>
                      <Typography fontSize="15px">{course.desc}</Typography>
                    </Stack>
                    <Stack flexDirection="row" gap="8px">
                      <Stack flexDirection="row" gap="4px">
                        <Heart svgProps={{ width: '15px', height: '15px' }} />
                        <Typography fontSize="12px" color="#CCCCCC">
                          {course.heart}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" gap="4px">
                        <ShoppingCart svgProps={{ width: '15px', height: '15px' }} pathProps={{ stroke: '#CCCCCC' }} />
                        <Typography fontSize="12px" color="#CCCCCC">
                          {course.cart}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack justifyContent="flex-end" alignItems="flex-end">
                      <Typography>예상 평균 금액 {course.price}원</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              );
            })}
        </Box>
      </Stack>
      {/* 카테고리별 추천 코스 */}
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Stack>
          <Typography fontSize="14px" lineHeight="21px">
            카테고리별 추천
          </Typography>
          <Typography fontSize="12px">최근 일주일 간 가장 조회가 많았던 장소입니다</Typography>
        </Stack>
        <Grid container spacing={4}>
          {Array.isArray(recommendedLocations) &&
            recommendedLocations.map((location) => {
              return (
                <Grid item xs={6} key={location.key}>
                  <Box
                    sx={{
                      borderRadius: '8px',
                      height: '100%',
                    }}
                  >
                    <img src={location.image} alt={location.name} width="100%" style={{ borderRadius: '4px' }} />
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
                      label={location.type}
                    />
                    <Typography variant="h6">{location.name}</Typography>
                    <Typography variant="body1">예상 평균 금액 {location.price}원</Typography>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </>
  );
};

export default HomePage;
