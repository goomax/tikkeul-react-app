import { PropsWithChildren } from 'react';
import { Box, IconButton as MuiIconButton, IconButtonProps as MuiIconButtonProps, useTheme } from '@mui/material';

export interface IconButtonProps extends PropsWithChildren<MuiIconButtonProps> {
  textBadge?: string;
}

const IconButton = ({ textBadge, children, sx, ...others }: IconButtonProps) => {
  const theme = useTheme();
  return (
    <MuiIconButton
      sx={{
        position: textBadge ? 'relative' : undefined,
        width: '40px',
        height: '40px',
        ...sx,
      }}
      {...others}
    >
      {textBadge && (
        <Box
          sx={{
            width: '16px',
            height: '16px',
            borderRadius: '100%',
            position: 'absolute',
            top: '3px',
            right: '3px',
            fontSize: '9px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
          }}
        >
          {textBadge}
        </Box>
      )}
      {children}
    </MuiIconButton>
  );
};

export default IconButton;
