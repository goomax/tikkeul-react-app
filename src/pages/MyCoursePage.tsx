import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import Chip from '@/components/common/Chip';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import KakaoMap from '@/components/KakaoMap';
import { useGetGroupQuery } from '@/queries/useGetGroupQuery';
import { Group } from '@/schemas/types';
import { Box, Divider, Skeleton, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';

const MyCoursePage = () => {
  const theme = useTheme();
  const { groupData } = useGetGroupQuery({ groupId: 1 });

  return (
    <PageTransformWrapper>
      <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
        <Stack justifyContent="flex-start" alignItems="center" gap="16px" sx={{ padding: '19px 14px 43px 14px' }}>
          {groupData?.courseDetails && groupData?.courseDetails.length > 0 ? (
            <KakaoMap
              coordinates={groupData?.courseDetails.flatMap((dayDetails) =>
                dayDetails.map((toursite) => ({
                  lat: toursite.latitude,
                  lng: toursite.longitude,
                })),
              )}
              width="100%"
              height="260px"
              style={{ borderRadius: '5px' }}
              level={8}
            />
          ) : (
            <Skeleton variant="rectangular" width="100%" height={260} />
          )}

          <Stack flexDirection="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <Stack alignItems="flex-start">
              <Typography fontSize={14} color="white" bold>
                {groupData?.name}
              </Typography>
              <Typography fontSize={10} color="white">
                {groupData?.courseDescription}
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
        {groupData?.courseDetails.map((day, index) => {
          return (
            <>
              <Stack sx={{ padding: '12px 14px' }}>
                <Typography fontSize={12}>{index + 1}일차</Typography>
                <Stack gap="12px">
                  <Stepper activeStep={-1} orientation="vertical">
                    {day.map((toursite) => {
                      return (
                        <Step key={toursite.tourSiteId}>
                          <StepLabel>
                            <StepCard
                              name={toursite.name}
                              address={toursite.address}
                              recommendType={toursite.recommendType}
                              photoUrl={toursite.photoUrl}
                            />
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                  <Button variant="outlined">장소 추가하기</Button>
                </Stack>
              </Stack>
              {index + 1 !== groupData?.courseDetails.length && <Divider />}
            </>
          );
        })}

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

const StepCard = ({
  name,
  address,
  recommendType,
  photoUrl,
}: Pick<Group['courseDetails'][number], 'name' | 'photoUrl' | 'address' | 'recommendType'>) => {
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
      <ImageWithSkeleton width={52} height={52} variant="rectangular" src={photoUrl} alt={name} />
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
            label={recommendType}
          />
          <Typography fontSize={12} bold>
            {name}
          </Typography>
        </Stack>
        <Typography fontSize={10} color="grey">
          {address}
        </Typography>
      </Stack>
    </Stack>
  );
};
