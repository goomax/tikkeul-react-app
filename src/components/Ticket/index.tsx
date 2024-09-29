import { PropsWithChildren } from 'react';
import Chip from '@/components/common/Chip';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import Typography from '@/components/common/Typography';
import { Dialog, Stack, SxProps, Theme, useTheme } from '@mui/material';
import { useDialog } from '@/hooks';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { Check, DragBar, Help, List, Location, Phone, Time } from '@/components/icons';

import { commaizeNumber } from '@/utils/formatter';
import KakaoMap from '../KakaoMap';
import IconButton from '../common/IconButton';
import Carousel from '../common/Carousel';
import Button from '../common/Button';
import { BottomSheet, BottomSheetProps } from '../common/BottomSheet';
import { useParams } from 'react-router-dom';
import { useGetCourseByCourseIdQuery } from '@/queries/useGetCourseByCourseIdQuery';
import { Toursite } from '@/schemas/types';
import { formatTimeToAMPM } from '@/utils/dateHelper';

interface TicketHeaderProps {
  label: string;
  title: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  }[];
  noZoom?: boolean;
}

interface TicketBottomProps {
  images: string[];
}

const Ticket = {
  Wrapper: ({ children }: PropsWithChildren) => {
    return (
      <Stack
        id="ticket"
        sx={{
          backgroundImage: 'url("/ticket-bg.png")',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          borderRadius: '16px',
          height: '320px',
          width: '332px',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: '10px',
        }}
      >
        {children}
      </Stack>
    );
  },
  Header: ({ label, title, description, coordinates, noZoom = false }: TicketHeaderProps) => {
    const { open, onOpen, onClose } = useDialog();

    return (
      <>
        <Stack
          id="ticket-header"
          justifyContent="center"
          alignItems="center"
          sx={{
            padding: '0 14px',
            height: '197px',
          }}
        >
          <Stack sx={{ width: '100%' }}>
            <Chip radiusVariant="square" label={label} variant="filled" color="secondary" />
            <Typography noWrap fontSize={16} bold>
              {title}
            </Typography>
            <Typography fontSize={12} color="grey">
              {description}
            </Typography>
          </Stack>
          <div style={{ position: 'relative', width: '290px', height: '112px' }}>
            <KakaoMap
              coordinates={coordinates}
              width="290px"
              height="112px"
              level={12}
              style={{
                borderRadius: '12px',
                marginTop: '10px',
              }}
            />
            {!noZoom && (
              <IconButton
                size="small"
                onClick={onOpen}
                sx={{
                  position: 'absolute',
                  top: '8px',
                  right: '1px',
                  zIndex: 2,
                }}
              >
                <ZoomOutMapIcon
                  sx={{
                    width: '19px',
                    height: '19px',
                  }}
                />
              </IconButton>
            )}
          </div>
        </Stack>
        <FullScreenMap open={open} onClose={onClose} />
      </>
    );
  },
  Bottom: ({ images }: TicketBottomProps) => {
    return (
      <Stack
        id="ticket-bottom"
        justifyContent="center"
        alignItems="center"
        sx={{
          padding: '7px 14px',
          height: '100px',
        }}
      >
        <Carousel
          gap="12px"
          sx={{
            padding: '6px 14px',
            width: '300px',
            height: '100px',
          }}
        >
          {images.map((src, index) => {
            return (
              <ImageWithSkeleton
                key={index}
                src={src}
                width={75}
                height={75}
                style={{
                  borderRadius: '12px',
                }}
              />
            );
          })}
        </Carousel>
      </Stack>
    );
  },
};

export default Ticket;

const FullScreenMap = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courseData } = useGetCourseByCourseIdQuery({ courseId: Number(courseId) });

  const { open: bottomSheetOpen, onOpen: onOpenBottomSheet, onClose: onCloseBottomSheet } = useDialog();
  const theme = useTheme();

  return (
    <Dialog fullScreen open={open}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {courseData?.tourSites && courseData?.tourSites.length > 0 && (
          <KakaoMap
            coordinates={courseData?.tourSites.map((toursite) => ({
              lat: toursite.latitude,
              lng: toursite.longitude,
            }))}
            correctRoute
          />
        )}

        <IconButton
          size="small"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2,
          }}
        >
          <ZoomInMapIcon
            sx={{
              width: '19px',
              height: '19px',
            }}
          />
        </IconButton>
        <div
          style={{
            zIndex: 2,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '220px',
          }}
        >
          <Button
            color="secondary"
            shape="circle"
            size="small"
            onClick={onOpenBottomSheet}
            sx={{
              boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
            }}
          >
            <List
              pathProps={{
                stroke: theme.palette.background.default,
              }}
            />
            목록
          </Button>
        </div>
        <div
          id="overlay-card"
          style={{
            zIndex: 2,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '73px',
          }}
        >
          <LocationCard
            name={courseData?.tourSites[0].name || ''}
            cost={courseData?.tourSites[0].cost || 0}
            address={courseData?.tourSites[0].address || ''}
            phone={courseData?.tourSites[0].phone || ''}
            endTime={courseData?.tourSites[0].endTime || '00:00'}
            startTime={courseData?.tourSites[0].startTime || '00:00'}
            photoUrl={courseData?.tourSites[0].photoUrls[0] || ''}
          />
        </div>
        <ListBottomSheet open={bottomSheetOpen} close={onCloseBottomSheet} />
      </div>
    </Dialog>
  );
};

const ListBottomSheet = ({ open, close }: Pick<BottomSheetProps, 'open' | 'close'>) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { courseData } = useGetCourseByCourseIdQuery({ courseId: Number(courseId) });

  return (
    <BottomSheet open={open} header={<DragBar />} close={close}>
      <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
        <Button
          shape="circle"
          variant="outlined"
          color="secondary"
          sx={{
            height: '23px',
            fontSize: '10px',
          }}
        >
          인기 순
        </Button>
        <Stack flexDirection="row" alignItems="center" gap="2px">
          <Check />
          <Typography fontSize={10} color="grey">
            최저가 순으로 보기
          </Typography>
        </Stack>
      </Stack>
      {courseData?.tourSites.map((toursite) => {
        return (
          <LocationCard
            key={toursite.tourSiteId}
            name={toursite.name || ''}
            cost={toursite.cost || 0}
            address={toursite.address || ''}
            phone={toursite.phone || ''}
            endTime={toursite.endTime || '00:00'}
            startTime={toursite.startTime || '00:00'}
            photoUrl={toursite.photoUrls[0] || ''}
            sx={{
              boxShadow: 'none',
              padding: '12px 0',
            }}
          />
        );
      })}
    </BottomSheet>
  );
};

const LocationCard = ({
  name,
  cost,
  address,
  phone,
  startTime,
  endTime,
  photoUrl,
  sx,
}: { sx?: SxProps<Theme>; photoUrl: string } & Pick<
  Toursite,
  'name' | 'cost' | 'address' | 'startTime' | 'endTime' | 'phone'
>) => {
  const theme = useTheme();

  return (
    <Stack
      width="332px"
      height="134px"
      flexDirection="row"
      alignItems="center"
      gap="16px"
      bgcolor={theme.palette.background.default}
      sx={{
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        padding: '12px 14px',
        ...sx,
      }}
    >
      <ImageWithSkeleton src={photoUrl} width={80} height={80} />
      <Stack gap="2px">
        <Typography fontSize={14} bold>
          <Chip label="명소" radiusVariant="square" color="default" sx={{ marginRight: '5px' }} />
          {name}
        </Typography>
        <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px" color="grey">
          예상 평균 금액{' '}
          <Typography fontSize={14} bold color="secondary" inline>
            {commaizeNumber(cost)}원
          </Typography>
          <Help />
        </Typography>
        <Stack flexDirection="row" gap="7px" alignItems="center">
          <Location />
          <Typography fontSize={10}>{address}</Typography>
        </Stack>
        <Stack flexDirection="row" gap="7px" alignItems="center">
          <Phone />
          <Typography fontSize={10}>{phone}</Typography>
        </Stack>
        <Stack flexDirection="row" gap="7px" alignItems="center">
          <Time />
          <Typography fontSize={10}>
            <Typography bold color="secondary" inline>
              영업중{` `}
            </Typography>
            {`${formatTimeToAMPM(startTime)} ~ ${formatTimeToAMPM(endTime)}`}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
