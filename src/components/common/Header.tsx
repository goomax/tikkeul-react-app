import { Avatar, Stack } from '@mui/material';
import IconButton from './IconButton';
import { Logo, ShoppingCart } from '../icons';

const Header = () => {
  return (
    <header>
      <Stack
        sx={{
          height: '40px',
          padding: '8px 10px',
        }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton>
          <Logo />
        </IconButton>
        <Stack flexDirection="row" alignItems="center" gap="2px">
          <Avatar sx={{ width: '22px', height: '22px' }} />
          <IconButton textBadge="3">
            <ShoppingCart />
          </IconButton>
        </Stack>
      </Stack>
    </header>
  );
};

export default Header;
