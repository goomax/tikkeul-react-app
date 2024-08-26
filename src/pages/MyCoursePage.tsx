import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import { Skeleton, Stack, useTheme } from '@mui/material';

const MyCoursePage = () => {
  const theme = useTheme();
  return (
    <PageTransformWrapper>
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
        <Stack justifyContent="flex-start" alignItems="center" gap="16px" sx={{ padding: '19px 14px 43px 14px' }}>
          <Skeleton variant="rectangular" width="100%" height={260} />

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
      <Stack sx={{ backgroundColor: theme.palette.grey[300] }}></Stack>
    </PageTransformWrapper>
  );
};

export default MyCoursePage;
