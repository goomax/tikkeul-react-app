import { Stack, StackProps } from '@mui/material';

const Carousel = ({ sx, children, ...others }: StackProps) => {
  return (
    <Stack
      flexDirection="row"
      sx={{
        overflowY: 'hidden',
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...sx,
      }}
      {...others}
    >
      {children}
    </Stack>
  );
};

export default Carousel;
