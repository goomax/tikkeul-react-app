import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import KakaoMap from '@/components/KakaoMap';
import { useGetGroupQuery } from '@/queries/useGetGroupQuery';
import { Skeleton, Stack, useTheme } from '@mui/material';
import { useGetUserQuery } from '@/queries/useGetUserQuery';

const CourseOverviewContainer = () => {
  const theme = useTheme();
  const { currentGroup } = useGetUserQuery();
  const { groupData } = useGetGroupQuery({ groupId: Number(currentGroup?.groupId) });

  return (
    <Stack sx={{ backgroundColor: theme.palette.primary.main }}>
      <Stack justifyContent="flex-start" alignItems="center" gap="16px" sx={{ padding: '19px 14px 43px 14px' }}>
        {groupData?.courseDetails && groupData?.courseDetails.length > 0 ? (
          <KakaoMap
            coordinates={groupData?.courseDetails.map((toursite) => ({
              lat: toursite.latitude,
              lng: toursite.longitude,
            }))}
            width="100%"
            height="260px"
            style={{ borderRadius: '5px' }}
            level={12}
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
  );
};

export default CourseOverviewContainer;
