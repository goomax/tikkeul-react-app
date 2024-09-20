import { BottomSheet } from '@/components/BottomSheet';
import Carousel from '@/components/common/Carousel';
import Chip from '@/components/common/Chip';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { DragBar, Help, Location, Phone, Time } from '@/components/icons';
import Ticket from '@/components/Ticket';
import TourSiteBottomSheet from '@/components/TourSiteBottomSheet';
import { useDialog } from '@/hooks';
import { commaizeNumber } from '@/utils/formatter';
import { alpha, Stack, useTheme } from '@mui/material';

const CoursePage = () => {
  const theme = useTheme();
  const { open, onOpen, onClose } = useDialog();

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
        <Ticket.Wrapper>
          <Ticket.Header
            label="열정적인 활동가에게 추천하는"
            title="산에서 한적하게 맛집을 즐기는 휴양 여행"
            description="도심 속에서 시원한 공기와 미식 여행을 할 수 있는 곳"
          />
          <Ticket.Bottom
            images={[
              'https://picsum.photos/80',
              'https://picsum.photos/80',
              'https://picsum.photos/80',
              'https://picsum.photos/80',
              'https://picsum.photos/80',
            ]}
          />
        </Ticket.Wrapper>
      </Stack>
      <Stack
        gap="8px"
        sx={{
          padding: '10px 0 100px 0',
          backgroundColor: alpha(theme.palette.primary.light, 0.1),
          minHeight: '800px',
        }}
      >
        {/* 장소 카드 */}
        {[1, 2, 3].map((t) => {
          return (
            <Stack
              key={t}
              gap="1px"
              sx={{
                backgroundColor: theme.palette.background.default,
                padding: '8px 14px',
                boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
              }}
              onClick={onClickLocation}
            >
              <Carousel
                gap="12px"
                sx={{
                  marginBottom: '5px',
                  minHeight: '160px',
                }}
              >
                {[
                  'https://picsum.photos/200',
                  'https://picsum.photos/200',
                  'https://picsum.photos/200',
                  'https://picsum.photos/200',
                  'https://picsum.photos/200',
                ].map((src, index) => {
                  return (
                    <ImageWithSkeleton
                      key={index}
                      src={src}
                      width={240}
                      height={160}
                      style={{
                        borderRadius: '5px',
                      }}
                    />
                  );
                })}
              </Carousel>
              <Stack flexDirection="row" gap="12px">
                {['식당', '맛을 아는'].map((label) => {
                  return <Chip key={label} label={label} radiusVariant="square" color="default" />;
                })}
              </Stack>
              <Typography bold fontSize={14}>
                큰 기와집
              </Typography>
              <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px">
                예상 평균 금액{' '}
                <Typography fontSize={16} bold color="secondary" inline>
                  {commaizeNumber(33000)}원
                </Typography>
                <Help />
              </Typography>
              <Stack flexDirection="row" gap="7px" alignItems="center">
                <Location />
                <Typography fontSize={10}>강원도 강릉시 난설헌로 234-6</Typography>
              </Stack>
              <Stack flexDirection="row" gap="7px" alignItems="center">
                <Phone />
                <Typography fontSize={10}>033-842-4150</Typography>
              </Stack>
              <Stack flexDirection="row" gap="7px" alignItems="center">
                <Time />
                <Typography fontSize={10}>
                  <Typography bold color="secondary" inline>
                    영업중{` `}
                  </Typography>
                  10am ~ 7pm
                </Typography>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
      <TourSiteBottomSheet open={open} onClose={onClose} tourSite={null} />
    </PageTransformWrapper>
  );
};

export default CoursePage;
