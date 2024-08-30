import { Chip as MuiChip, ChipProps as MuiChipProps, useTheme } from '@mui/material';

export interface ChipProps extends Omit<MuiChipProps, 'color'> {
  radiusVariant: 'circle' | 'square' | 'half';
  color: 'default' | 'primary' | 'secondary';
}

const Chip = ({ variant, color, sx, radiusVariant = 'square', ...others }: ChipProps) => {
  const theme = useTheme();

  return (
    <MuiChip
      color={color}
      sx={{
        ...(color === 'default'
          ? { backgroundColor: theme.palette.grey[100], color: theme.palette.grey[700] }
          : { color: 'white' }),
        ...radius[radiusVariant],
        paddingLeft: '1px',
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
