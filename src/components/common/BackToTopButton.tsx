import { useTheme } from '@mui/material';
import { ArrowTop } from '../icons';
import IconButton from './IconButton';

const BackToTopButton = () => {
  const theme = useTheme();

  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <IconButton
      onClick={onScrollToTop}
      sx={{
        backgroundColor: theme.palette.primary.main,
        position: 'fixed',
        bottom: 80,
        right: 16,
        zIndex: 1000,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <ArrowTop />
    </IconButton>
  );
};

export default BackToTopButton;
