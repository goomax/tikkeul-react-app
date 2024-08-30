import { useTheme } from '@mui/material';
import { ArrowTop } from '../icons';
import IconButton from './IconButton';
import { useEffect, useState } from 'react';
import { throttle } from 'lodash-es';

const BackToTopButton = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const onScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 400);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <IconButton
      onClick={onScrollToTop}
      sx={{
        backgroundColor: theme.palette.primary.main,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        position: 'fixed',
        bottom: 80,
        right: 16,
        zIndex: 1000,
        color: '#fff',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
      aria-label="최상단으로 스크롤"
    >
      <ArrowTop />
    </IconButton>
  );
};

export default BackToTopButton;
