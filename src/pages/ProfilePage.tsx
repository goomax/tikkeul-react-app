import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Chip from '@/components/common/Chip';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import { Avatar, Box, Divider, Skeleton, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';

const ProfilePage = () => {
  const theme = useTheme();
  return (
    <PageTransformWrapper>
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: '19px 14px ',
          borderRadius: '0 0 10px 10px',
        }}
      >
        <Typography bold fontSize={16} color="white" mb="20px">
          마이페이지
        </Typography>
        <Stack gap="12px" alignItems="space-between">
          <Stack
            height="125px"
            gap="16px"
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: '4px', padding: '12px 14px' }}
          >
            <Stack>
              <Typography fontSize={16} bold>
                김티끌님
              </Typography>
              <Typography fontSize={10} bold color="grey">
                ticklemoa@naver.com
              </Typography>
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: '8.5px 14px',
                backgroundColor: theme.palette.grey[100],
                borderRadius: '4px',
              }}
            >
              <Stack flexDirection="row" alignItems="center" gap="4px">
                <Avatar sx={{ width: '24px', height: '24px' }} />
                <Typography fontSize={12} bold color="grey">
                  열정적인 활동가형
                </Typography>
              </Stack>
              <Button
                shape="circle"
                color="secondary"
                sx={{
                  width: '90px',
                  height: '26px',
                  fontSize: '10px',
                  padding: 0,
                }}
              >
                다시 테스트하기
              </Button>
            </Stack>
          </Stack>
          <Stack
            height="45px"
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: '4px', padding: '12px 14px' }}
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography fontSize={14}>나의 모든 리워드</Typography>
            <Typography fontSize={14} bold>
              3200p
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack></Stack>
    </PageTransformWrapper>
  );
};

export default ProfilePage;
