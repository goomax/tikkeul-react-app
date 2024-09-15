import Typography from '@/components/common/Typography';
import { Rating, RatingProps, Stack, useTheme } from '@mui/material';

interface RatingInputProps extends RatingProps {
  label: string;
  helperText?: string;
}

const RatingInput = ({ label, helperText, sx, ...others }: RatingInputProps) => {
  const theme = useTheme();

  return (
    <Stack>
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
      <Typography fontSize={12} color="grey">
        {helperText && helperText}
      </Typography>
    </Stack>
  );
};

export default RatingInput;
