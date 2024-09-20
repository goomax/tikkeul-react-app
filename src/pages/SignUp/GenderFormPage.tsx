import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import Typography from '@/components/common/Typography';
import { useFormContext } from '@/FormDataProvider';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialSignUpFormData, SignUpFormData, signUpFormDataSchema } from '@/schemas/signup';
import { usePostUser } from '@/queries/usePostUser';

const GenderFormPage = () => {
  const { formData: signUpFormData, updateFormData: updateSignUpFormData } = useFormContext<SignUpFormData>();
  const { mutate: postUserMutate } = usePostUser();

  const {
    getValues,
    formState: { errors, isValid },
    control,
  } = useForm({
    defaultValues: signUpFormData,
    resolver: yupResolver(signUpFormDataSchema),
    mode: 'onChange',
  });

  const onClickCompleteButton = () => {
    const data = getValues();
    console.log(data);
    updateSignUpFormData(data);
    postUserMutate(data);
    // router.push('/gender-form');
  };

  return (
    <Stack sx={{ paddingBottom: '100px' }}>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '30px' }}>
        회원가입: 성별 입력
      </Typography>
      <Stack gap="24px" sx={{ padding: '0 14px' }}>
        <Stack>
          <Typography fontSize={22}>
            <Typography inline color="primary" bold>
              성별
            </Typography>
            을 입력해 주세요.
          </Typography>
          <Typography color="grey" fontSize={12}>
            마지막이에요
          </Typography>
        </Stack>
        <FormControl component="fieldset">
          <FormLabel component="legend">성별 선택</FormLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue={initialSignUpFormData.gender}
            render={({ field }) => (
              <RadioGroup {...field} row>
                <FormControlLabel value="M" control={<Radio />} label="남성" />
                <FormControlLabel value="F" control={<Radio />} label="여성" />
              </RadioGroup>
            )}
          />
          {errors.gender && <Typography color="warning">{errors.gender.message}</Typography>}
        </FormControl>
      </Stack>
      <FixedBottomCTA fullWidth sx={{ height: '44px' }} onClick={onClickCompleteButton} disabled={!isValid}>
        회원가입 완료하기
      </FixedBottomCTA>
    </Stack>
  );
};

export default GenderFormPage;
