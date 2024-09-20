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

const AgeFormPage = () => {
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
    updateSignUpFormData({
      ...data,
      age: Number(data.age),
    });
    router.push('/signup-gender');
  };

  const onInitAgeValue = () => {
    setValue('age', 0);
  };

  return (
    <Stack sx={{ paddingBottom: '100px' }}>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '30px' }}>
        회원가입: 나이 입력
      </Typography>
      <Stack gap="24px" sx={{ padding: '0 14px' }}>
        <Stack>
          <Typography fontSize={22}>
            <Typography inline color="primary" bold>
              나이
            </Typography>
            를 입력해 주세요.
          </Typography>
          <Typography color="grey" fontSize={12}>
            거의 다 왔어요
          </Typography>
        </Stack>
        <TextField
          variant="standard"
          label="나이를 입력해 주세요"
          id="age"
          {...register('age')}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onInitAgeValue}>
                <CloseCircle />
              </IconButton>
            ),
          }}
          helperText={errors.age?.message}
          error={!!errors.age}
        />
      </Stack>
      <FixedBottomCTA
        fullWidth
        sx={{ height: '44px' }}
        onClick={onClickNextButton}
        disabled={!watch('age') || !!errors.age}
      >
        다음
      </FixedBottomCTA>
    </Stack>
  );
};

export default AgeFormPage;
