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

const HeadcountFormPage = () => {
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
    router.push('/day-form');
  };

  const onInitHeadCount = () => {
    setValue('peopleCount', null);
  };

  return (
    <Stack sx={{ paddingBottom: '100px' }}>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '30px' }}>
        인원 수 입력
      </Typography>
      <Stack gap="24px" sx={{ padding: '0 14px' }}>
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
          id="peopleCount"
          {...register('peopleCount')}
          InputProps={{
            endAdornment: (
              <IconButton onClick={onInitHeadCount}>
                <CloseCircle />
              </IconButton>
            ),
          }}
          helperText={errors.peopleCount?.message}
          error={!!errors.peopleCount}
        />
      </Stack>
      <FixedBottomCTA
        fullWidth
        sx={{ height: '44px' }}
        onClick={onClickNextButton}
        disabled={!watch('peopleCount') || !!errors.peopleCount}
      >
        다음
      </FixedBottomCTA>
    </Stack>
  );
};

export default HeadcountFormPage;
