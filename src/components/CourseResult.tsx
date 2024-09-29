import Button from '@/components/common/Button';
import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import Ticket from '@/components/Ticket';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useQueryString } from '@/hooks';
import { Group } from '@/schemas/types';
import { mockArray } from '@/utils/generator';
import { alpha, Stack, Step, StepLabel, Stepper, ToggleButton, useTheme } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { commaizeNumber, formatToursiteType } from '@/utils/formatter';
import { Phone, Time, Location } from '@/components/icons';
import { formatTimeToAMPM } from '@/utils/dateHelper';
import { queryClient } from '@/queries/queryClient';
import { exportCourse } from '@/apis/group';
import { notifyToast } from '@/utils/subject';

const CourseResult = ({ tourData }: { tourData: Group }) => {
  const theme = useTheme();
  const { getParams, setParams } = useQueryString();
  const currentDay = Number(getParams(QUERY_PARAM_KEY.DAY));
  const onChangeDay = (day: number) => {
    setParams(QUERY_PARAM_KEY.DAY, String(day));
  };

  const currentCourse = tourData?.courseDetails.filter((detail) => detail.day === currentDay) || [];

  const onShare = async (groupId: number) => {
    queryClient
      .fetchQuery({
        queryKey: ['export', groupId],
        queryFn: () => exportCourse({ groupId }).then((res) => res.data.code),
      })
      .then((code) => {
        const shareUrl = `${window.location.origin}/share?day=1&token=${code}`;
        navigator.clipboard.writeText(shareUrl);

        notifyToast({
          message: 'URL 복사 완료: 채팅방에 공유하세요!',
          type: 'success',
        });

        console.log('복사완료', shareUrl);
      });
  };

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: alpha(theme.palette.primary.light, 0.1) }}
      >
        {tourData?.courseDetails && tourData?.courseDetails.length > 0 && (
          <Ticket.Wrapper>
            <Ticket.Header
              noZoom
              label="열정적인 활동가에게 추천하는"
              title={tourData.name || 'title'}
              description={tourData.courseDescription || 'description'}
              coordinates={tourData?.courseDetails.map((toursite) => ({
                lat: toursite.latitude,
                lng: toursite.longitude,
              }))}
            />
            <Ticket.Bottom images={tourData?.courseDetails.map((site) => site.photoUrl)} />
          </Ticket.Wrapper>
        )}
        <Stack
          flexDirection={'row'}
          flexWrap="wrap"
          gap="4px"
          sx={{
            padding: '25px 14px',
          }}
        >
          {mockArray(tourData?.duration || 0).map((_, index) => {
            return (
              <ToggleButton
                key={index}
                selected={index + 1 === currentDay}
                value={index + 1}
                onClick={() => {
                  onChangeDay(index + 1);
                }}
                sx={{
                  borderRadius: '16px',
                  height: '31px',
                  backgroundColor: 'grey.200',
                  color: 'grey.500',
                  border: 'none',
                  '&:hover': {
                    backgroundColor: 'grey.200',
                    color: 'grey.500',
                  },
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.main',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none',

                    '&:hover': {
                      backgroundColor: 'secondary.main',
                      color: 'white',
                    },
                  },
                }}
                color="secondary"
              >
                {index + 1}일차
              </ToggleButton>
            );
          })}
        </Stack>
      </Stack>
      <Stack sx={{ padding: '8px 14px 120px 14px' }} gap="30px">
        {currentCourse.length > 0 ? (
          <Stepper
            activeStep={-1}
            orientation="vertical"
            sx={{
              '& .MuiStepIcon-text': {
                fill: 'white',
              },
            }}
          >
            {currentCourse.map((toursite) => {
              return (
                <Step key={toursite.tourSiteId}>
                  <StepLabel>
                    <StepCard toursite={toursite} cost={10000} />
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>
        ) : (
          <Typography
            fontSize={11}
            color="grey"
            textAlign="center"
            sx={{
              margin: '45px 0',
            }}
          >
            담은 장소가 없어요!
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ height: '45px' }}
          onClick={() => {
            onShare(Number(tourData?.groupId));
          }}
        >
          <Stack flexDirection="row" gap="6px" justifyContent="center" alignItems="center">
            공유하기
            <ShareIcon
              sx={{
                width: '20px',
                height: '20px',
              }}
            />
          </Stack>
        </Button>
      </Stack>
    </>
  );
};

export default CourseResult;

const StepCard = ({ toursite, cost }: { toursite: Group['courseDetails'][number]; cost: number }) => {
  const theme = useTheme();

  return (
    <Stack
      gap="8px"
      bgcolor={theme.palette.background.default}
      sx={{
        width: '260px',
        padding: '8px 14px',
        borderRadius: '4px',
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        marginLeft: '10px',
      }}
    >
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
          label={formatToursiteType('restaurant')}
        />
        <Typography fontSize={12} bold>
          {toursite.name}
        </Typography>
      </Stack>
      <Typography fontSize={10} display="inline-flex" alignItems="center" gap="4px" color="grey">
        예상 평균 금액{' '}
        <Typography fontSize={12} bold color="secondary" inline>
          {commaizeNumber(cost)}원
        </Typography>
      </Typography>
      <Stack gap="1px">
        <Stack flexDirection="row" gap="7px" alignItems="center">
          <Location />
          <Typography fontSize={10}>{toursite?.address}</Typography>
        </Stack>
        <Stack flexDirection="row" gap="7px" alignItems="center">
          <Phone />
          <Typography fontSize={10}>010-6476-9788</Typography>
        </Stack>
        <Stack flexDirection="row" gap="7px" alignItems="center">
          <Time />
          <Typography fontSize={10}>
            <Typography bold color="secondary" inline>
              {'영업중 '}
            </Typography>
            {formatTimeToAMPM('08:00')} ~ {formatTimeToAMPM('18:00')}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
