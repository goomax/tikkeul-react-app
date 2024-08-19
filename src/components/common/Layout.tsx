import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box
      sx={{
        maxWidth: '400px',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        backgroundColor: 'red',
      }}
    >
      <Outlet />
    </Box>
  );
};

export default Layout;
