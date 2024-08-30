import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import IconButton from '@/components/common/IconButton';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import { CloseCircle } from '@/components/icons';
import { useInternalRouter } from '@/hooks';
import { Stack } from '@mui/material';

const HeadcountFormPage = () => {
  const router = useInternalRouter();

  const onClickNextButton = () => {
    router.push('/preference-form');
  };

  return (
    <>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '60px' }}>
        인원 수 입력
      </Typography>
      <Stack gap="100px" sx={{ padding: '0 14px' }}>
        <Stack>
          <Typography fontSize={22}>
            여행{' '}
            <Typography inline color="primary" bold>
              인원 수
            </Typography>
            를 입력해 주세요.
          </Typography>
          <Typography color="grey" fontSize={12}>
            그룹을 설정하고 나중에 추가할 수 있어요!
          </Typography>
        </Stack>
        <TextField
          variant="standard"
          label="여행 총 인원을 입력해 주세요"
          InputProps={{
            endAdornment: (
              <IconButton>
                <CloseCircle />
              </IconButton>
            ),
          }}
          helperText="미입력 시 다음 단계로 넘어갈 수 없습니다"
        />
      </Stack>
      <FixedBottomCTA fullWidth sx={{ height: '44px' }} onClick={onClickNextButton}>
        다음
      </FixedBottomCTA>
    </>
  );
};

export default HeadcountFormPage;
