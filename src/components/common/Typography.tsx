import { Typography as MuiTypography, TypographyProps as MuiTypographyProps, useTheme } from '@mui/material';

export interface TypographyProps extends Omit<MuiTypographyProps, 'color'> {
  color?: 'primary' | 'secondary' | 'dark' | 'grey' | 'white';
  inline?: boolean;
  bold?: boolean;
}

const Typography = ({ color = 'dark', inline, bold, children, sx, ...others }: TypographyProps) => {
  const theme = useTheme();

  const textColor = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    grey: theme.palette.grey[500],
    dark: theme.palette.text.primary,
    white: theme.palette.background.default,
  };

  return (
    <MuiTypography
      color={textColor[color]}
      {...(inline ? { component: 'span', fontSize: 'inherit', lineHeight: 'inherit', fontWeight: 'inherit' } : {})}
      {...(bold ? { fontWeight: 'bold' } : {})}
      sx={{
        ...sx,
      }}
      {...others}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
