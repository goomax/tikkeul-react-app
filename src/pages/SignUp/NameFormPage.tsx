import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import IconButton from '@/components/common/IconButton';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import { CloseCircle } from '@/components/icons';
import { useFormContext } from '@/FormDataProvider';
import { useInternalRouter } from '@/hooks';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormData, signUpFormDataSchema } from '@/schemas/signup';

const NameFormPage = () => {
  const router = useInternalRouter();
  const { formData: signUpFormData, updateFormData: updateSignUpFormData } = useFormContext<SignUpFormData>();

  const {
    getValues,
    setValue,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: signUpFormData,
    resolver: yupResolver(signUpFormDataSchema),
    mode: 'onChange',
  });

  const onClickNextButton = () => {
    const data = getValues();
    updateSignUpFormData(data);
    router.push('/signup-age');
  };

  const onInitNameValue = () => {
    setValue('name', '');
  };

  return (
    <Stack sx={{ paddingBottom: '100px' }}>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '30px' }}>
        회원가입: 이름 입력
      </Typography>
      <Stack gap="24px" sx={{ padding: '0 14px' }}>
        <Stack>
          <Typography fontSize={22}>
            <Typography inline color="primary" bold>
              이름
            </Typography>
            을 입력해 주세요.
          </Typography>
          <Typography color="grey" fontSize={12}>
            별명도 가능해요
          </Typography>
        </Stack>
        <TextField
          variant="standard"
          label="이름을 입력해 주세요"
          id="name"
          {...register('name')}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onInitNameValue}>
                <CloseCircle />
              </IconButton>
            ),
          }}
          helperText={errors.name?.message}
          error={!!errors.name}
        />
      </Stack>
      <FixedBottomCTA
        fullWidth
        sx={{ height: '44px' }}
        onClick={onClickNextButton}
        disabled={!watch('name') || !!errors.name}
      >
        다음
      </FixedBottomCTA>
    </Stack>
  );
};

export default NameFormPage;
