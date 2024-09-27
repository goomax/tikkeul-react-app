import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import IconButton from '@/components/common/IconButton';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import KakaoMap from '@/components/KakaoMap';
import { useGetGroupQuery } from '@/queries/useGetGroupQuery';
import { Group } from '@/schemas/types';
import { Divider, Skeleton, Stack, Step, StepLabel, Stepper, useTheme } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import { useToggle } from '@/hooks';
import { useDeleteToursiteMutation } from '@/queries/useDeleteToursiteMutation';
import { deleteToursite } from '@/apis/group';
import { Fragment } from 'react';

const MyCoursePage = () => {
  const theme = useTheme();
  const { groupData } = useGetGroupQuery({ groupId: 1 });
  const { value: isEditMode, toggle } = useToggle({ initialValue: false });
  const { mutate: deleteToursiteMutate } = useDeleteToursiteMutation({
    groupId: 1,
    onSuccess: () => {
      toggle();
    },
  });

  const onDelete = (data: Parameters<typeof deleteToursite>[0]) => {
    deleteToursiteMutate(data);
  };

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
        <Stack flexDirection="row" justifyContent="flex-end" alignItems="center" sx={{ padding: '12px 14px ' }}>
          {isEditMode ? (
            <Button variant="text" sx={{ fontSize: '10px' }} onClick={toggle}>
              돌아가기 &gt;
            </Button>
          ) : (
            <Button variant="text" sx={{ fontSize: '10px' }} onClick={toggle}>
              편집하기 &gt;
            </Button>
          )}
        </Stack>
        {groupData?.courseDetails.map((day, dayIndex) => {
          return (
            <Fragment key={dayIndex}>
              <Stack sx={{ padding: '12px 14px' }}>
                <Typography fontSize={12}>{dayIndex + 1}일차</Typography>
                <Stack gap="20px">
                  {!isEditMode ? (
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
                  ) : (
                    <>
                      {day.map((toursite) => (
                        <Stack
                          key={toursite.tourSiteId}
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <IconButton sx={{ cursor: 'grab' }}>
                            <DragIndicatorIcon sx={{ color: 'grey.400' }} />
                          </IconButton>
                          <StepCard
                            key={toursite.tourSiteId}
                            name={toursite.name}
                            address={toursite.address}
                            recommendType={toursite.recommendType}
                            photoUrl={toursite.photoUrl}
                          />
                          <IconButton
                            onClick={() => {
                              onDelete({ groupId: 1, toursiteId: toursite.tourSiteId });
                            }}
                          >
                            <DeleteIcon sx={{ color: theme.palette.grey[400] }} />
                          </IconButton>
                        </Stack>
                      ))}
                    </>
                  )}
                  {!isEditMode && <Button variant="outlined">장소 추가하기</Button>}
                </Stack>
              </Stack>
              {dayIndex + 1 !== groupData?.courseDetails.length && <Divider />}
            </Fragment>
          );
        })}

        <Stack sx={{ padding: '12px 14px 100px 14px' }}>
          {!isEditMode && (
            <Button variant="contained" fullWidth sx={{ height: '45px' }}>
              이대로 여행 시작하기
            </Button>
          )}
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
        width: '260px',
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
