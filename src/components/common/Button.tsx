import { PropsWithChildren } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<PropsWithChildren<MuiButtonProps>, 'color'> {
  color?: 'primary' | 'secondary';
  shape?: 'round' | 'square';
}

const Button = ({
  color = 'primary',
  variant = 'contained',
  shape = 'square',
  children,
  sx,
  ...others
}: ButtonProps) => {
  return (
    <MuiButton
      color={color}
      variant={variant}
      sx={{
        borderRadius: shape === 'square' ? '4px' : '20px',
        boxShadow: 'none',
        ...(variant === 'contained' ? { color: 'white' } : {}),
        ...sx,
      }}
      {...others}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
