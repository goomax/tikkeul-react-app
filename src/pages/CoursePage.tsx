import { BottomSheet } from '@/components/BottomSheet';
import Chip from '@/components/common/Chip';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { DragBar, Help, Location, Phone, Time } from '@/components/icons';
import Ticket from '@/components/Ticket';
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
              }}
              onClick={onClickLocation}
            >
              <Stack
                flexDirection="row"
                gap="12px"
                sx={{
                  marginBottom: '5px',
                  overflowX: 'scroll',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
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
              </Stack>
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
      <BottomSheet open={open} header={<DragBar />} close={onClose}>
        <Stack gap="5px">
          <Stack
            flexDirection="row"
            gap="12px"
            sx={{
              marginBottom: '30px',
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
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
                  width={304}
                  height={200}
                  style={{
                    borderRadius: '5px',
                  }}
                />
              );
            })}
          </Stack>
          <Typography fontSize={16} bold>
            경포 아쿠아리움
          </Typography>
          <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px" color="grey">
            예상 평균 금액{' '}
            <Typography fontSize={16} bold color="secondary" inline>
              {commaizeNumber(33000)}원
            </Typography>
          </Typography>
          <Typography fontSize={12}>
            경포 석호 생태관은 강릉 녹색 도시체험센터 바로 뒤쪽에 있다. 인근에 푸른 경포 바다와 석호인 경호 포수, 그리고
            허균, 허난설헌기념공원이 있어 접근성이 매우 좋다. 물의 톤수로만 놓고 보면 서울 63빌딩의 아쿠아리움보다 그
            규모가 크다. 오전 10시부터 오후 5시까지 매시간 아쿠아리스트의 해설이 있어 시간을 맞춰가면 관람에 도움을 받을
            수 있다. 또 다이버가 수조에 직접 들어가 먹이를 주는 피딩쇼를... 더보기
          </Typography>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Location />
            <Typography fontSize={12}>강원도 강릉시 난설헌로 234-6</Typography>
          </Stack>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Phone />
            <Typography fontSize={12}>033-842-4150</Typography>
          </Stack>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Time />
            <Typography fontSize={12}>
              <Typography bold color="secondary" inline>
                영업중{` `}
              </Typography>
              10am ~ 7pm
            </Typography>
          </Stack>
        </Stack>
      </BottomSheet>
    </PageTransformWrapper>
  );
};

export default CoursePage;
