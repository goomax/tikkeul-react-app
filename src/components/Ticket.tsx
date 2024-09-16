import { PropsWithChildren, useEffect, useState } from 'react';
import Chip from '@/components/common/Chip';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import Typography from '@/components/common/Typography';
import { Dialog, Stack, SxProps, Theme, useTheme } from '@mui/material';
import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import Carousel from './common/Carousel';
import { useDialog } from '@/hooks';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';
import { Check, DragBar, Help, List, Location, Phone, Time } from '@/components/icons';

import IconButton from './common/IconButton';
import { commaizeNumber } from '@/utils/formatter';
import Button from './common/Button';
import { BottomSheet } from './BottomSheet';
import axios from 'axios';
import { ENV } from '@/constants/config';

interface Vertex {
  lat: number;
  lng: number;
}

interface Road {
  name: string;
  distance: number;
  duration: number;
  traffic_speed: number;
  traffic_state: number;
  vertexes: number[];
}

interface Section {
  distance: number;
  duration: number;
  bound: {
    min_x: number;
    min_y: number;
    max_x: number;
    max_y: number;
  };
  roads: Road[];
}

interface ApiResponse {
  routes: {
    sections: Section[];
  }[];
}

interface TicketHeaderProps {
  label: string;
  title: string;
  description: string;
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
  Header: ({ label, title, description }: TicketHeaderProps) => {
    const { open, onOpen, onClose } = useDialog();
    const { open: bottomSheetOpen, onOpen: onOpenBottomSheet, onClose: onCloseBottomSheet } = useDialog();

    const theme = useTheme();

    const coordinates = [
      { latitude: 37.1507494904, longitude: 129.2062296318 },
      { latitude: 37.7726505813, longitude: 128.9473504054 },
      { latitude: 37.7071731576, longitude: 128.7188396792 },
      { latitude: 38.2188863049, longitude: 128.5916575733 },
    ];

    const [allVertexes, setAllVertexes] = useState<Vertex[]>([]);

    const formatVertexes = (vertexes: number[]): Vertex[] => {
      const formatted: Vertex[] = [];
      for (let i = 0; i < vertexes.length; i += 2) {
        formatted.push({ lat: vertexes[i + 1], lng: vertexes[i] });
      }
      return formatted;
    };

    useEffect(() => {
      axios
        .request<ApiResponse>({
          method: 'post',
          url: 'https://apis-navi.kakaomobility.com/v1/waypoints/directions',
          headers: {
            Authorization: `KakaoAK ${ENV.KAKAO_REST_KEY}`,
          },
          data: {
            // 출발지
            origin: {
              x: 129.2062296318,
              y: 37.1507494904,
            },
            // 도착지
            destination: {
              x: 128.5916575733,
              y: 38.2188863049,
            },
            // 경유지
            waypoints: [
              {
                x: 128.9473504054,
                y: 37.7726505813,
              },
              {
                x: 128.7188396792,
                y: 37.7071731576,
              },
            ],
          },
        })
        .then((res) => {
          const combinedVertexes: Vertex[] = res.data.routes[0].sections.flatMap((section) =>
            section.roads.flatMap((road) => formatVertexes(road.vertexes)),
          );

          setAllVertexes(combinedVertexes);
        });
    }, []);

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
            <Map
              center={{ lat: 37.17364526353777, lng: 129.33560656383634 }}
              style={{
                width: '290px',
                height: '112px',
                borderRadius: '12px',
                marginTop: '10px',
              }}
              level={4}
            ></Map>
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
          </div>
        </Stack>
        <Dialog fullScreen open={open}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Map
              center={{ lat: 38.204275, lng: 128.5941667 }}
              style={{
                width: '100%',
                height: '100%',
              }}
              level={8}
            >
              {coordinates.map((coord, index) => (
                <MapMarker key={index} position={{ lat: coord.latitude, lng: coord.longitude }} />
              ))}
              <Polyline
                path={allVertexes.map((coord) => ({ lat: coord.lat, lng: coord.lng }))}
                strokeWeight={6}
                strokeColor={theme.palette.secondary.main}
                strokeOpacity={0.8}
                strokeStyle="solid"
              />
            </Map>
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
              <LocationCard />
            </div>
            <>
              <BottomSheet open={bottomSheetOpen} header={<DragBar />} close={onCloseBottomSheet}>
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
                {[1, 2, 3, 4, 5, 6, 7].map((location) => {
                  return (
                    <LocationCard
                      key={location}
                      sx={{
                        boxShadow: 'none',
                        padding: '12px 0',
                      }}
                    />
                  );
                })}
              </BottomSheet>
            </>
          </div>
        </Dialog>
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

const LocationCard = ({ sx }: { sx?: SxProps<Theme> }) => {
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
      <ImageWithSkeleton src="https://picsum.photos/100" width={80} height={80} />
      <Stack gap="2px">
        <Typography fontSize={14} bold>
          <Chip label="명소" radiusVariant="square" color="default" sx={{ marginRight: '5px' }} />
          산토리니 카페
        </Typography>
        <Typography fontSize={12} display="inline-flex" alignItems="center" gap="8px" color="grey">
          예상 평균 금액{' '}
          <Typography fontSize={14} bold color="secondary" inline>
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
    </Stack>
  );
};
