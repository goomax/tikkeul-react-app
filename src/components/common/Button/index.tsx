import { PropsWithChildren } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<PropsWithChildren<MuiButtonProps>, 'color'> {
  color?: 'primary' | 'secondary' | 'inherit';
  shape?: 'circle' | 'square';
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
        textTransform: 'none',
        boxShadow: 'none',
        borderRadius: shape === 'square' ? '4px' : '20px',
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
