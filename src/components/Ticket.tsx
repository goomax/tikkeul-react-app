import { PropsWithChildren } from 'react';
import Chip from '@/components/common/Chip';
import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import Typography from '@/components/common/Typography';
import { Stack } from '@mui/material';
import { Map } from 'react-kakao-maps-sdk';

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
    return (
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
        <Map
          center={{ lat: 38.204275, lng: 128.5941667 }}
          style={{
            width: '290px',
            height: '112px',
            borderRadius: '12px',
            marginTop: '10px',
          }}
          level={8}
        ></Map>
      </Stack>
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
        <Stack
          flexDirection="row"
          gap="12px"
          sx={{
            padding: '6px 14px',
            width: '300px',
            height: '100px',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
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
        </Stack>
      </Stack>
    );
  },
};

export default Ticket;
