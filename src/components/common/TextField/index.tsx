import { forwardRef } from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps, useTheme } from '@mui/material';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  variant: 'outlined' | 'standard';
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ variant = 'standard', sx, ...others }, ref) => {
  const theme = useTheme();
  return (
    <MuiTextField
      variant={variant}
      sx={{
        ...(variant === 'outlined'
          ? {
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'linear-gradient(to bottom right, #31C690 30%, #5498FF 70%)',
                },
              },
              '& .MuiInputBase-root': {
                borderRadius: '20px',
                backgroundColor: theme.palette.background.default,
              },
            }
          : {}),
        ...sx,
      }}
      ref={ref}
      {...others}
    />
  );
});

export default TextField;
