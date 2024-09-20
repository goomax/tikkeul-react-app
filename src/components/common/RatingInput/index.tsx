import { forwardRef } from 'react';
import Typography from '@/components/common/Typography';
import { Rating, RatingProps, Stack, useTheme } from '@mui/material';

interface RatingInputProps extends RatingProps {
  label: string;
  helperText?: string;
  error?: boolean;
}

const RatingInput = forwardRef<HTMLDivElement, RatingInputProps>(({ label, helperText, error, sx, ...others }, ref) => {
  const theme = useTheme();

  return (
    <Stack ref={ref}>
      <Typography fontSize={14} bold sx={{ marginBottom: '12px' }}>
        {label}
      </Typography>
      <Rating
        size="large"
        sx={{
          '& .MuiRating-iconFilled': {
            color: theme.palette.primary.main,
          },
          ...sx,
        }}
        {...others}
      />
      <Typography fontSize={12} color={error ? 'warning' : 'grey'}>
        {helperText && helperText}
      </Typography>
    </Stack>
  );
});

export default RatingInput;
