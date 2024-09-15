import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Chip from '@/components/common/Chip';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import { Box, Divider, Skeleton, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import { Map } from 'react-kakao-maps-sdk';

const MyCoursePage = () => {
  const theme = useTheme();
  return (
    <PageTransformWrapper>
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
        <Stack justifyContent="flex-start" alignItems="center" gap="16px" sx={{ padding: '19px 14px 43px 14px' }}>
          {/* <Skeleton variant="rectangular" width="100%" height={260} /> */}
          <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: '100%', height: '260px', borderRadius: '5px' }}
            level={7}
          ></Map>
          <Stack flexDirection="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Stack alignItems="flex-start">
              <Typography fontSize={14} color="white" bold>
                산에서 한적하게 맛집을 즐기는 휴양 여행
              </Typography>
              <Typography fontSize={10} color="white">
                도심 속에서 시원한 공기와 미식 여행을 할 수 있는 곳
              </Typography>
            </Stack>
            <Stack flexDirection="row" gap="16px">
              <Stack gap="2px">
                <Heart svgProps={{ width: '16', height: '16' }} pathProps={{ stroke: 'white' }} />
                <Typography fontSize={10} color="white">
                  350
                </Typography>
              </Stack>
              <Stack gap="2px">
                <ShoppingCart svgProps={{ width: '16', height: '16' }} pathProps={{ stroke: 'white' }} />
                <Typography fontSize={10} color="white">
                  150
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ padding: '12px 14px ' }}>
          <Box>
            <Checkbox
              checked
              color="primary"
              label={
                <Typography fontSize={12} color="grey">
                  장소 전체 선택
                </Typography>
              }
              size="small"
            />
          </Box>
          <Button variant="text" sx={{ fontSize: '10px' }}>
            편집하기 &gt;
          </Button>
        </Stack>
        <Stack sx={{ padding: '12px 14px' }}>
          <Typography fontSize={12}>1일차</Typography>
          <Stack gap="12px">
            <Stepper activeStep={-1} orientation="vertical">
              <Step>
                <StepLabel>
                  <StepCard />
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  <StepCard />
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  <StepCard />
                </StepLabel>
              </Step>
            </Stepper>
            <Button variant="outlined">장소 추가하기</Button>
          </Stack>
        </Stack>
        <Divider />
        <Stack sx={{ padding: '12px 14px' }}>
          <Typography fontSize={12}>2일차</Typography>
          <Stack gap="12px">
            <Stepper
              activeStep={-1}
              orientation="vertical"
              sx={{
                '& .MuiStepper-dot': { backgroundColor: '#CCCCCC' },
                '& .MuiStepper-dotActive': { backgroundColor: '#666666' },
              }}
            >
              <Step>
                <StepLabel>
                  <StepCard />
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  <StepCard />
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  <StepCard />
                </StepLabel>
              </Step>
            </Stepper>
            <Button variant="outlined">장소 추가하기</Button>
          </Stack>
        </Stack>
        <Stack sx={{ padding: '12px 14px 100px 14px' }}>
          <Button variant="contained" fullWidth sx={{ height: '45px' }}>
            이대로 여행 시작하기
          </Button>
        </Stack>
      </Stack>
    </PageTransformWrapper>
  );
};

export default MyCoursePage;

const StepCard = () => {
  const theme = useTheme();

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap="20px"
      bgcolor={theme.palette.background.default}
      sx={{
        padding: '8px 14px',
        borderRadius: '4px',
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        marginLeft: '10px',
      }}
    >
      <Skeleton width={52} height={52} variant="rectangular" />
      <Stack gap="8px">
        <Stack flexDirection="row" gap="8px">
          <Chip
            radiusVariant="square"
            color="default"
            sx={{
              height: '19px',
              '& .MuiChip-label': {
                padding: '1px',
                fontSize: '10px',
              },
            }}
            label="명소"
          />
          <Typography fontSize={12} bold>
            경포대
          </Typography>
        </Stack>
        <Typography fontSize={10} color="grey">
          강원도 강릉시 경포로 365
        </Typography>
      </Stack>
    </Stack>
  );
};
