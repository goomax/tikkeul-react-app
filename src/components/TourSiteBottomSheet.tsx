import { Stack } from '@mui/material';
import { BottomSheet } from './common/BottomSheet';
import Carousel from './common/Carousel';
import { DragBar, Phone, Time, Location } from './icons';
import ImageWithSkeleton from './common/ImageWithSkeleton';
import Typography from './common/Typography';
import { commaizeNumber } from '@/utils/formatter';
import { formatTimeToAMPM, getIsBusinessOpen } from '@/utils/dateHelper';
import { Toursite } from '@/schemas/types';

interface TourSiteBottomSheetProps {
  open: boolean;
  onClose: () => void;
  toursite: Toursite | null;
}

const TourSiteBottomSheet = ({ open, onClose, toursite }: TourSiteBottomSheetProps) => {
  const isBusinessOpen = toursite ? getIsBusinessOpen(toursite.startTime, toursite.endTime) : false;

  return (
    <BottomSheet open={open && !!toursite} header={<DragBar />} close={onClose}>
      <Stack gap="7px">
        <Carousel
          gap="12px"
          sx={{
            marginBottom: '30px',
          }}
        >
          {toursite?.photoUrls.map((photoUrl, index) => {
            return (
              <ImageWithSkeleton
                key={index}
                src={photoUrl}
                width={304}
                height={200}
                // alt={`${toursite?.name}-${index}`}
                style={{
                  borderRadius: '5px',
                }}
              />
            );
          })}
        </Carousel>
        <Typography fontSize={16} bold>
          {toursite?.name}
        </Typography>
        <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px" color="grey">
          예상 평균 금액{' '}
          <Typography fontSize={16} bold color="secondary" inline>
            {commaizeNumber(toursite?.cost)}원
          </Typography>
        </Typography>
        <Typography fontSize={12}>{toursite?.description}</Typography>
        <Stack gap="1px">
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Location />
            <Typography fontSize={12}>{toursite?.address}</Typography>
          </Stack>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Phone />
            <Typography fontSize={12}>{toursite?.phone}</Typography>
          </Stack>
          <Stack flexDirection="row" gap="7px" alignItems="center">
            <Time />
            <Typography fontSize={12}>
              <Typography bold color="secondary" inline>
                {isBusinessOpen ? '영업중 ' : '영업종료 '}
              </Typography>
              {formatTimeToAMPM(toursite?.startTime)} ~ {formatTimeToAMPM(toursite?.endTime)}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </BottomSheet>
  );
};

export default TourSiteBottomSheet;
