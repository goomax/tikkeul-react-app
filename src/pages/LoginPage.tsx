import Typography from '@/components/common/Typography';
import { Stack, useTheme } from '@mui/material';
import LogoImg from '@/assets/logo.png';
import Image from '@/components/common/Image';
import Button from '@/components/common/Button';
import { useInternalRouter } from '@/hooks';

const LoginPage = () => {
  const theme = useTheme();
  const router = useInternalRouter();

  const onClickLoginButton = () => {
    router.push('/headcount-form');
  };

  const onClickGuestModeButton = () => {
    router.push('/?guest=true');
  };

  return (
    <Stack justifyContent="center" alignItems="center" gap="54px" sx={{ padding: '0 14px', minHeight: '540px' }}>
      <Stack sx={{ width: '100%' }}>
        <Typography fontSize={24}>돌아오셨군요!</Typography>
        <Typography fontSize={24} bold>
          오늘도{' '}
          <Typography inline color="primary">
            티끌 모아 여행
          </Typography>
          해 봐요
        </Typography>
      </Stack>
      <Image src={LogoImg} />
      <Stack sx={{ width: '100%' }} gap="5px">
        <Button
          fullWidth
          sx={{ backgroundColor: '#FBEA00', color: '#111111', height: '44px' }}
          onClick={onClickLoginButton}
        >
          카카오로 로그인
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={{ color: theme.palette.grey[500], textDecoration: `solid underline ${theme.palette.grey[300]}` }}
          onClick={onClickGuestModeButton}
        >
          비회원으로 둘러보기
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
