import Chip from '@/components/common/Chip';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import BenefitCard from '@/components/home/BenefitCard';
import { Heart, Search, ShoppingCart } from '@/components/icons';
import useFetch from '@/hooks/useFetch';
import { useInternalRouter } from '@/hooks/useInternalRouter';
import {
  GetBenefitResponse,
  GetRecommendedCoursesResponse,
  GetRecommendedLocationsResponse,
} from '@/types/apiResponse';
import { Box, Grid, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';

const HomePage = () => {
  const theme = useTheme();
  const { payload: rawBenefits } = useFetch<GetBenefitResponse['data']>({ url: '/benefit', defaultValue: [] });
  const { payload: recommendedCourses } = useFetch<GetRecommendedCoursesResponse['data']>({
    url: '/recommendedCourseByType',
    defaultValue: [],
  });
  const { payload: recommendedLocations } = useFetch<GetRecommendedLocationsResponse['data']>({
    url: '/recommendedLocationsByCategory',
    defaultValue: [],
  });

  const [benefits, setBenefits] = useState<(GetBenefitResponse['data'][number] & { isClose: boolean })[]>([]);

  useEffect(() => {
    setBenefits(
      rawBenefits.map((benefit) => {
        return {
          ...benefit,
          isClose: false,
        };
      }),
    );
  }, [rawBenefits]);

  const onCloseBenefit = (benefitId: string) => {
    setBenefits((prevBenefits) =>
      prevBenefits.map((benefit) => (benefit.key === benefitId ? { ...benefit, isClose: true } : benefit)),
    );
  };

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const router = useInternalRouter();

  const onFocusSearchInput = () => {
    router.push('/search-form');
  };

  return (
    <PageTransformWrapper>
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
            onFocus={onFocusSearchInput}
          />
        </Box>
        <Stack>
          <Box sx={{ padding: '8px 14px' }}>
            <Typography fontSize={14} lineHeight="21px">
              안녕하세요, 김티끌님!
            </Typography>
            <Typography fontSize={14} lineHeight="21px" bold>
              오늘 받으실 수 있는 혜택은{' '}
              <Typography color="primary" inline>
                총 {benefits.filter((benefit) => !benefit.isClose).length}개
              </Typography>
              입니다
            </Typography>
          </Box>
          <Stack
            flexDirection="row"
            gap="20px"
            sx={{
              padding: '20px 14px',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {benefits.map((benefit) => {
              if (benefit.isClose) {
                return null;
              }

              return <BenefitCard key={benefit.key} benefit={benefit} onClose={onCloseBenefit} />;
            })}
          </Stack>
        </Stack>
      </Stack>
      {/* 회원 전용 추천 코스 */}
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
      {/* 핫한 추천 코스 */}
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
                      <Typography fontSize={14} bold color="secondary" inline>
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
      {/* 카테고리별 추천 코스 */}
      <Stack gap="16px" sx={{ padding: '8px 14px' }}>
        <Stack>
          <Typography fontSize={14} lineHeight="21px" bold>
            카테고리별 추천
          </Typography>
          <Typography fontSize={12} color="grey">
            최근 일주일 간 가장 조회가 많았던 장소입니다
          </Typography>
        </Stack>

        <Tabs
          value={value}
          centered
          onChange={handleChange}
          textColor="inherit"
          sx={{
            height: '36px',
            maxHeight: '36px',
            minHeight: '36px',

            backgroundColor: theme.palette.grey[200],
            borderRadius: '20px',
            padding: '3.5px 0',

            '& .Mui-selected': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
              fontWeight: 'bold',
              borderRadius: '20px',
            },

            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab label="숙소" {...a11yProps(0)} sx={{ minHeight: '28px', height: '28px' }} />
          <Tab label="음식점" {...a11yProps(1)} sx={{ minHeight: '28px', height: '28px' }} />
          <Tab label="명소" {...a11yProps(2)} sx={{ minHeight: '28px', height: '28px' }} />
        </Tabs>

        <Grid container spacing={4}>
          {recommendedLocations.map((location) => {
            return (
              <Grid item xs={6} key={location.key}>
                <Box
                  sx={{
                    borderRadius: '8px',
                    height: '100%',
                  }}
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    width="148px"
                    height="132px"
                    style={{ borderRadius: '4px' }}
                  />
                  <Chip
                    radiusVariant="square"
                    color="default"
                    sx={{
                      width: '47px',
                      height: '19px',
                      '& .MuiChip-label': {
                        padding: '1px',
                        fontSize: '10px',
                      },
                    }}
                    label={location.type}
                  />
                  <Typography fontSize={12} bold>
                    {location.name}
                  </Typography>
                  <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
                    예상 평균 금액{' '}
                    <Typography fontSize={14} bold color="secondary" inline>
                      {location.price}원
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </PageTransformWrapper>
  );
};

export default HomePage;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
