import { PropsWithChildren } from 'react';
import { CircularProgress, Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<PropsWithChildren<MuiButtonProps>, 'color'> {
  color?: 'primary' | 'secondary' | 'inherit';
  shape?: 'circle' | 'square';
  isLoading?: boolean;
}

const Button = ({
  color = 'primary',
  variant = 'contained',
  shape = 'square',
  isLoading,
  children,
  disabled,
  sx,
  ...others
}: ButtonProps) => {
  return (
    <MuiButton
      color={color}
      variant={variant}
      disabled={disabled || isLoading}
      sx={{
        textTransform: 'none',
        boxShadow: 'none',
        borderRadius: shape === 'square' ? '4px' : '20px',
        ...(variant === 'contained' ? { color: 'white' } : {}),
        ...sx,
      }}
      {...others}
    >
      {isLoading ? <CircularProgress /> : children}
    </MuiButton>
  );
};

export default Button;
