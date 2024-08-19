import { PropsWithChildren } from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<PropsWithChildren<MuiButtonProps>, 'color'> {
  color: 'primary' | 'secondary';
}

const Button = ({ color = 'primary', variant = 'contained', children, sx, ...others }: ButtonProps) => {
  return (
    <MuiButton
      color={color}
      variant={variant}
      sx={{
        borderRadius: '4px',
        boxShadow: 'none',
        color: variant === 'contained' ? 'white' : undefined,
        ...sx,
      }}
      {...others}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
