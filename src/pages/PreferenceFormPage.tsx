import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import Typography from '@/components/common/Typography';
import { useInternalRouter } from '@/hooks';
import { Stack } from '@mui/material';

const PreferenceFormPage = () => {
  const router = useInternalRouter();

  const onClickNextButton = () => {
    router.push('/onboarding');
  };

  return (
    <>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '60px' }}>
        취향 선택
      </Typography>
      <Stack gap="100px" sx={{ padding: '0 14px' }}>
        <Stack>
          <Typography fontSize={22}>
            <Typography inline color="primary" bold>
              항목별 취향
            </Typography>
            을 선택해 주세요.
          </Typography>
          <Typography color="grey" fontSize={12}>
            모두 선택해야 완료할 수 있어요!{' '}
          </Typography>
        </Stack>
        별점~
      </Stack>
      <FixedBottomCTA fullWidth sx={{ height: '44px' }} onClick={onClickNextButton}>
        다음
      </FixedBottomCTA>
    </>
  );
};

export default PreferenceFormPage;
