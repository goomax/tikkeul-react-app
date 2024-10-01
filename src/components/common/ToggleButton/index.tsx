import { ToggleButton as MuiToggleButton, ToggleButtonProps as MuiToggleButtonProps, useTheme } from '@mui/material';

interface ToggleButtonProps extends Omit<MuiToggleButtonProps, 'color'> {
  color: 'primary' | 'secondary';
}
const ToggleButton = ({ children, color = 'primary', sx, ...others }: ToggleButtonProps) => {
  const theme = useTheme();

  return (
    <MuiToggleButton
      color={color}
      sx={{
        borderRadius: '16px',
        height: '31px',
        backgroundColor: 'grey.200',
        color: 'grey.500',
        border: 'none',
        '&:hover': {
          backgroundColor: 'grey.200',
          color: 'grey.500',
        },
        '&.Mui-selected': {
          backgroundColor: theme.palette[color].main,
          color: 'white',
          fontWeight: 'bold',
          border: 'none',

          '&:hover': {
            backgroundColor: theme.palette[color].main,
            color: 'white',
          },
        },

        ...sx,
      }}
      {...others}
    >
      {children}
    </MuiToggleButton>
  );
};

export default ToggleButton;
