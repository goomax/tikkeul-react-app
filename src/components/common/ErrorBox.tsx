import { Stack, StackProps, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

interface ErrorBoxProps extends Pick<StackProps, 'sx'> {
  message?: string;
  width?: string | number;
  height?: string | number;
}

const ErrorBox = ({ sx, message = '잠시후에 다시 시도해주세요', width = '100%', height = '100%' }: ErrorBoxProps) => {
  return (
    <Stack alignItems="center" justifyContent="center" width={width} height={height} borderRadius={1} p={2} sx={sx}>
      <ErrorIcon sx={{}} />
      <Typography fontSize={12}>{message}</Typography>
    </Stack>
  );
};

export default ErrorBox;
