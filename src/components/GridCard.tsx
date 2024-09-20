import { Grid, Stack } from '@mui/material';
import Typography from './common/Typography';
import ImageWithSkeleton from './common/ImageWithSkeleton';
import Chip from './common/Chip';
import { ReactNode } from 'react';
import { commaizeNumber } from '@/utils/formatter';

interface GridCardWrapperProps {
  children: ReactNode;
}

interface GridCardCardProps {
  bottom?: ReactNode;
  thumbnail: string;
  tag: string;
  title: string;
  price: number;
}

const GridCard = {
  Wrapper: ({ children }: GridCardWrapperProps) => (
    <Grid container spacing={4}>
      {children}
    </Grid>
  ),
  Card: ({ thumbnail, title, price, tag, bottom }: GridCardCardProps) => (
    <Grid item xs={6}>
      <Stack
        justifyContent="center"
        sx={{
          borderRadius: '8px',
          height: '100%',
        }}
      >
        <ImageWithSkeleton src={thumbnail} alt={title} width="148px" height="132px" style={{ borderRadius: '4px' }} />
        <Chip
          radiusVariant="square"
          color="default"
          sx={{
            marginTop: '6px',
          }}
          label={tag}
        />
        <Typography fontSize={12} bold>
          {title}
        </Typography>
        <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
          예상 평균 금액{' '}
          <Typography fontSize={14} bold color="secondary" inline>
            {commaizeNumber(price)}원
          </Typography>
        </Typography>
        {bottom && bottom}
      </Stack>
    </Grid>
  ),
};

export default GridCard;
