import { Avatar, Stack } from '@mui/material';
import IconButton from './IconButton';
import { Logo, ShoppingCart } from '../icons';
import { useInternalRouter } from '@/hooks';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const Header = () => {
  const router = useInternalRouter();
  const { isLogin } = useGetUserQuery();

  return (
    <header>
      <Stack
        sx={{
          height: '45px',
          padding: '8px 10px',
        }}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton onClick={() => router.push('/')}>
          <Logo />
        </IconButton>
        {isLogin ? (
          <Stack flexDirection="row" alignItems="center" gap="2px">
            <Avatar sx={{ width: '22px', height: '22px' }} />
            <IconButton>
              <ShoppingCart />
            </IconButton>
          </Stack>
        ) : (
          <IconButton size="small" sx={{ height: '24px' }} onClick={() => router.push('/login')}>
            <LoginOutlinedIcon />
          </IconButton>
        )}
      </Stack>
    </header>
  );
};

export default Header;
