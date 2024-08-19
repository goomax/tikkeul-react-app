import { Chip as MuiChip, ChipProps as MuiChipProps, useTheme } from '@mui/material';

export interface ChipProps extends MuiChipProps {
  radiusVariant: 'circle' | 'square' | 'half';
}

const Chip = ({ variant, color, sx, radiusVariant = 'circle', ...others }: ChipProps) => {
  const theme = useTheme();

  return (
    <MuiChip
      color={color}
      sx={{
        ...(color === 'default' ? { backgroundColor: theme.palette.grey[500] } : {}),
        color: 'white',
        ...radius[radiusVariant],
        ...sx,
      }}
      {...others}
    />
  );
};

export default Chip;

const radius = {
  circle: {
    borderRadius: '100%',
  },
  square: {
    borderRadius: '4px',
  },
  half: {
    borderRadius: '20px',
  },
};
