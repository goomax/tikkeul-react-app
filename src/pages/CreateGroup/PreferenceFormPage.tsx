import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import RatingInput from '@/components/RatingInput';
import Typography from '@/components/common/Typography';
import { useInternalRouter } from '@/hooks';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateGroupFormData, createGroupFormDataSchema } from '@/schemas/createGroup';
import { useFormContext } from '@/FormDataProvider';

type PreferenceField = `preferences.${keyof CreateGroupFormData['preferences']}`;

const PreferenceFormPage = () => {
  const router = useInternalRouter();
  const { formData: createGroupFormData, updateFormData: updateCreateGroupFormData } =
    useFormContext<CreateGroupFormData>();
  const {
    getValues,
    formState: { errors, isValid },
    setValue,
    watch,
    trigger,
  } = useForm({
    defaultValues: createGroupFormData,
    resolver: yupResolver(createGroupFormDataSchema),
    mode: 'onChange',
  });

  const onChangeRatings = (event: React.SyntheticEvent, value: number | null) => {
    const { name } = event.target as HTMLInputElement;

    setValue(name as PreferenceField, value);
    trigger(name as PreferenceField);
  };

  const onClickNextButton = () => {
    const data = getValues();
    updateCreateGroupFormData(data);

    router.push('/onboarding');
  };

  const preferencesValue = watch('preferences');

  return (
    <Stack sx={{ paddingBottom: '100px' }}>
      <Typography fontSize={16} sx={{ textAlign: 'center', marginBottom: '30px' }}>
        취향 선택
      </Typography>
      <Stack gap="24px" sx={{ padding: '0 14px' }}>
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
        <RatingInput
          label="음식 선호도"
          name="preferences.foodRating"
          onChange={onChangeRatings}
          value={preferencesValue?.foodRating}
          helperText={errors.preferences?.foodRating?.message ?? getHelperText(preferencesValue?.foodRating)}
          error={!!errors.preferences?.foodRating}
        />
        <RatingInput
          label="관광 체험 선호도"
          name="preferences.experienceRating"
          onChange={onChangeRatings}
          value={preferencesValue?.experienceRating}
          helperText={
            errors.preferences?.experienceRating?.message ?? getHelperText(preferencesValue?.experienceRating)
          }
          error={!!errors.preferences?.experienceRating}
        />
        <RatingInput
          label="숙소 선호도"
          name="preferences.accommodationRating"
          onChange={onChangeRatings}
          value={preferencesValue?.accommodationRating}
          helperText={
            errors.preferences?.accommodationRating?.message ?? getHelperText(preferencesValue?.accommodationRating)
          }
          error={!!errors.preferences?.accommodationRating}
        />
      </Stack>
      <FixedBottomCTA fullWidth sx={{ height: '44px' }} onClick={onClickNextButton} disabled={!isValid}>
        다음
      </FixedBottomCTA>
    </Stack>
  );
};

export default PreferenceFormPage;

const getHelperText = (rating: number | null | undefined) => {
  switch (rating) {
    case 1:
      return '1점 (거의 신경쓰지 않아요)';
    case 2:
      return '2점 (별로 중요하지 않아요)';
    case 3:
      return '3점 (보통이에요)';
    case 4:
      return '4점 (많이 중요해요)';
    case 5:
      return '5점 (최우선 고려사항이에요)';
    default:
      return '별점을 선택해주세요';
  }
};
