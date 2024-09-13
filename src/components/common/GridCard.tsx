import { Box, Grid, Stack } from '@mui/material';
import Typography from './Typography';
import Image from './Image';
import Chip from './Chip';
import { GetRecommendedLocationsResponse } from '@/types/apiResponse';
import { ReactNode } from 'react';

interface GridCardWrapperProps {
  children: ReactNode;
}

interface GridCardCardProps {
  card: GetRecommendedLocationsResponse['data'][0];
  bottom?: ReactNode;
}

const GridCard = {
  Wrapper: ({ children }: GridCardWrapperProps) => (
    <Grid container spacing={4}>
      {children}
    </Grid>
  ),
  Card: ({ card, bottom }: GridCardCardProps) => (
    <Grid item xs={6} key={card.id}>
      <Stack
        justifyContent="center"
        sx={{
          borderRadius: '8px',
          height: '100%',
        }}
      >
        <Image src={card.image} alt={card.name} width="148px" height="132px" style={{ borderRadius: '4px' }} />
        <Chip
          radiusVariant="square"
          color="default"
          sx={{
            width: '47px',
            height: '19px',
            '& .MuiChip-label': {
              padding: '1px',
              fontSize: '10px',
            },
          }}
          label={card.type}
        />
        <Typography fontSize={12} bold>
          {card.name}
        </Typography>
        <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
          예상 평균 금액{' '}
          <Typography fontSize={14} bold color="secondary" inline>
            {card.price}원
          </Typography>
        </Typography>
        {bottom && bottom}
      </Stack>
    </Grid>
  ),
};

export default GridCard;
