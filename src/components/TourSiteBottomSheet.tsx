import { Stack } from '@mui/material';
import { BottomSheet } from './common/BottomSheet';
import Carousel from './common/Carousel';
import { DragBar, Phone, Time, Location } from './icons';
import ImageWithSkeleton from './common/ImageWithSkeleton';
import Typography from './common/Typography';
import { commaizeNumber } from '@/utils/formatter';
import { TourSite } from '@/apis/course';
import { formatTimeToAMPM, getIsBusinessOpen } from '@/utils/dateHelper';

interface TourSiteBottomSheetProps {
  open: boolean;
  onClose: () => void;
  tourSite: Pick<
    TourSite,
    'thumbnails' | 'name' | 'price' | 'description' | 'startTime' | 'endTime' | 'phoneNumber' | 'address'
  > | null;
}

const TourSiteBottomSheet = ({ open, onClose, tourSite }: TourSiteBottomSheetProps) => {
  const isBusinessOpen = tourSite ? getIsBusinessOpen(tourSite.startTime, tourSite.endTime) : false;

  return (
    <BottomSheet open={open && !!tourSite} header={<DragBar />} close={onClose}>
      <Stack gap="7px">
        <Carousel
          gap="12px"
          sx={{
            marginBottom: '30px',
          }}
        >
          {tourSite?.thumbnails.map((thumbnail, index) => {
            return (
              <ImageWithSkeleton
                key={index}
                src={thumbnail}
                width={304}
                height={200}
                style={{
                  borderRadius: '5px',
                }}
              />
            );
          })}
        </Carousel>
        <Typography fontSize={16} bold>
          {tourSite?.name}
        </Typography>
        <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px" color="grey">
          예상 평균 금액{' '}
          <Typography fontSize={16} bold color="secondary" inline>
            {commaizeNumber(tourSite?.price)}원
          </Typography>
        </Typography>
        <Typography fontSize={12}>{tourSite?.description}</Typography>
        <Stack gap="1px">
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Location />
            <Typography fontSize={12}>{tourSite?.address}</Typography>
          </Stack>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Phone />
            <Typography fontSize={12}>{tourSite?.phoneNumber}</Typography>
          </Stack>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Time />
            <Typography fontSize={12}>
              <Typography bold color="secondary" inline>
                {isBusinessOpen ? '영업중 ' : '영업종료 '}
              </Typography>
              {formatTimeToAMPM(tourSite?.startTime)} ~ {formatTimeToAMPM(tourSite?.endTime)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </BottomSheet>
  );
};

export default TourSiteBottomSheet;
