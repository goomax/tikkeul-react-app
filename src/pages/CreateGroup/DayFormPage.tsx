import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import IconButton from '@/components/common/IconButton';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import { CloseCircle } from '@/components/icons';
import { CreateGroupFormData, createGroupFormDataSchema } from '@/schemas/createGroup';
import { useFormContext } from '@/FormDataProvider';
import { useInternalRouter } from '@/hooks';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const DayFormPagge = () => {
  const router = useInternalRouter();
  const { formData: createGroupFormData, updateFormData: updateCreateGroupFormData } =
    useFormContext<CreateGroupFormData>();
  const {
    getValues,
    setValue,
    register,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: createGroupFormData,
    resolver: yupResolver(createGroupFormDataSchema),
    mode: 'onChange',
  });

  const onClickNextButton = () => {
    const data = getValues();
    updateCreateGroupFormData(data);
    router.push('/preference-form');
  };

  const onInitDuration = () => {
    setValue('duration', null);
  };

  return (
    <Stack sx={{ paddingBottom: '100px' }}>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '30px' }}>
        기간 입력
      </Typography>
      <Stack gap="24px" sx={{ padding: '0 14px' }}>
        <Stack>
          <Typography fontSize={22}>
            여행{' '}
            <Typography inline color="primary" bold>
              기간
            </Typography>
            을 입력해 주세요.
          </Typography>
          <Typography color="grey" fontSize={12}>
            기간을 입력해야 다음 단계로 갈 수 있어요!{' '}
          </Typography>
        </Stack>
        <TextField
          variant="standard"
          label="여행 기간을 입력해 주세요"
          id="duration"
          {...register('duration')}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onInitDuration}>
                <CloseCircle />
              </IconButton>
            ),
          }}
          helperText={errors.duration?.message}
          error={!!errors.duration}
        />
      </Stack>
      <FixedBottomCTA
        fullWidth
        sx={{ height: '44px' }}
        onClick={onClickNextButton}
        disabled={!watch('duration') || !!errors.duration}
      >
        다음
      </FixedBottomCTA>
    </Stack>
  );
};

export default DayFormPagge;
