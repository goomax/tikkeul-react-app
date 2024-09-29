import Carousel from '@/components/common/Carousel';
import Chip from '@/components/common/Chip';
import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { Help, Location, Phone, Time } from '@/components/icons';
import Ticket from '@/components/Ticket';
import TourSiteBottomSheet from '@/components/TourSiteBottomSheet';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useDialog, useQueryString, useSelectableState } from '@/hooks';
import { useGetCourseByCourseIdQuery } from '@/queries/useGetCourseByCourseIdQuery';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { usePickCourseToGroup } from '@/queries/usePickCourseToGroup';
import { Toursite } from '@/schemas/types';
import { formatTimeToAMPM } from '@/utils/dateHelper';
import { commaizeNumber, formatToursiteType } from '@/utils/formatter';
import { alpha, Stack, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
  const theme = useTheme();
  const { courseId } = useParams<{ courseId: string }>();
  const { getParams } = useQueryString();
  const { isLogin, hasGroup } = useGetUserQuery();
  const currentGroupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const { courseData } = useGetCourseByCourseIdQuery({ courseId: Number(courseId) });
  const { selectedState, onSelect, onReset } = useSelectableState<Toursite>(null);
  const { open, onOpen, onClose } = useDialog();
  const { mutate: pickCourseToGroupMutate } = usePickCourseToGroup({ groupId: Number(currentGroupId) });

  const onClickLocation = () => {
    onOpen();
  };

  return (
    <PageTransformWrapper>
      <Stack
        sx={{ backgroundColor: alpha(theme.palette.primary.light, 0.1), padding: '20px 14px 5px 14px' }}
        justifyContent="center"
        alignItems="center"
      >
        {courseData?.tourSites && courseData?.tourSites.length > 0 && (
          <Ticket.Wrapper>
            <Ticket.Header
              label={courseData.courseType}
              title={courseData?.name || 'title'}
              description={courseData?.description || 'description'}
              coordinates={courseData?.tourSites.map((toursite) => ({
                lat: toursite.latitude,
                lng: toursite.longitude,
              }))}
            />
            <Ticket.Bottom images={courseData?.tourSites.flatMap((site) => site.photoUrls) || []} />
          </Ticket.Wrapper>
        )}
      </Stack>
      <Stack
        gap="8px"
        sx={{
          padding: '10px 0 140px 0',
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
          minHeight: '800px',
        }}
      >
        {/* 장소 카드 */}
        {courseData?.tourSites.map((toursite) => {
          return (
            <Stack
              key={toursite.tourSiteId}
              gap="1px"
              sx={{
                backgroundColor: theme.palette.background.default,
                padding: '8px 14px',
                boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
              }}
              onClick={() => {
                onSelect(toursite);
                onClickLocation();
              }}
            >
              <Carousel
                gap="12px"
                sx={{
                  marginBottom: '5px',
                  minHeight: '160px',
                }}
              >
                {toursite.photoUrls.map((url, index) => {
                  return (
                    <ImageWithSkeleton
                      key={index}
                      src={url}
                      width={240}
                      height={160}
                      alt={toursite.name + (index + 1)}
                      style={{
                        borderRadius: '5px',
                      }}
                    />
                  );
                })}
              </Carousel>
              <Stack flexDirection="row" gap="12px">
                <Chip label={formatToursiteType(toursite.type)} radiusVariant="square" color="default" />
              </Stack>
              <Typography bold fontSize={14}>
                {toursite.name}
              </Typography>
              <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px">
                예상 평균 금액{' '}
                <Typography fontSize={16} bold color="secondary" inline>
                  {commaizeNumber(toursite.cost)}원
                </Typography>
                <Help />
              </Typography>
              <Stack flexDirection="row" gap="7px" alignItems="center">
                <Location />
                <Typography fontSize={10}>{toursite.address}</Typography>
              </Stack>
              <Stack flexDirection="row" gap="7px" alignItems="center">
                <Phone />
                <Typography fontSize={10}>{toursite.phone}</Typography>
              </Stack>
              <Stack flexDirection="row" gap="7px" alignItems="center">
                <Time />
                <Typography fontSize={10}>
                  <Typography bold color="secondary" inline>
                    영업중{` `}
                  </Typography>
                  {`${formatTimeToAMPM(toursite.startTime)} ~ ${formatTimeToAMPM(toursite.endTime)}`}
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>

      {currentGroupId && isLogin && hasGroup && (
        <FixedBottomCTA
          fullWidth
          onClick={() => {
            pickCourseToGroupMutate({ courseId: Number(courseId), groupId: Number(currentGroupId) });
          }}
        >
          내 코스에 담기
        </FixedBottomCTA>
      )}
      <TourSiteBottomSheet
        open={open}
        onClose={() => {
          onClose();
          onReset();
        }}
        toursite={selectedState}
      />
    </PageTransformWrapper>
  );
};

export default CoursePage;
