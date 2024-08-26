import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavigationBar from './NavigationBar';
import BackToTopButton from './BackToTopButton';

const Layout = () => {
  return (
    <Box
      sx={{
        maxWidth: '380px',
        width: '100%',
        height: '100%',
        margin: '0 auto',
      }}
    >
      <Box sx={{ paddingBottom: '100px' }}>
        <Header />
        <Outlet />
      </Box>
      <NavigationBar />
      <BackToTopButton />
    </Box>
  );
};

export default Layout;
