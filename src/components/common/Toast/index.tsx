import { SnackbarContent, SnackbarContentProps, Stack, useTheme } from '@mui/material';
import Typography from '../Typography';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface ToastProps extends SnackbarContentProps {
  type: 'success' | 'error';
}

const typeToStyles = {
  error: { Icon: ErrorIcon },
  success: { Icon: CheckCircleIcon },
};

const Toast = ({ type, message, sx, ...others }: ToastProps) => {
  const theme = useTheme();
  const { Icon } = typeToStyles[type];

  return (
    <SnackbarContent
      message={
        <Stack direction="row" alignItems="center">
          <Icon sx={{ width: '20px', height: '20px', marginRight: '8px', color: 'white' }} />
          <Typography color="white" fontSize={14}>
            {message}
          </Typography>
        </Stack>
      }
      sx={{
        backgroundColor: theme.palette[type].main,
        borderRadius: '4px',
        marginBottom: '10px',
        padding: '8px 16px',
        ...sx,
      }}
      {...others}
    />
  );
};

export default Toast;
