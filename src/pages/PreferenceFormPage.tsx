import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import RatingInput from '@/components/RatingInput';
import Typography from '@/components/common/Typography';
import { useInputs, useInternalRouter } from '@/hooks';
import { Stack } from '@mui/material';

const PreferenceFormPage = () => {
  const router = useInternalRouter();
  const [ratings, onChangeRatings] = useInputs<
    Record<'foodRating' | 'experienceRating' | 'accommodationRating', number | null>
  >({
    foodRating: null,
    experienceRating: null,
    accommodationRating: null,
  });

  const getHelperText = (rating: number | null) => {
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

  const onClickNextButton = () => {
    router.push('/onboarding');
  };

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
          name="foodRating"
          value={ratings.foodRating}
          onChange={onChangeRatings}
          helperText={getHelperText(ratings.foodRating)}
        />
        <RatingInput
          label="관광 체험 선호도"
          name="experienceRating"
          value={ratings.experienceRating}
          onChange={onChangeRatings}
          helperText={getHelperText(ratings.experienceRating)}
        />
        <RatingInput
          label="숙소 선호도"
          name="accommodationRating"
          value={ratings.accommodationRating}
          onChange={onChangeRatings}
          helperText={getHelperText(ratings.accommodationRating)}
        />
      </Stack>
      <FixedBottomCTA fullWidth sx={{ height: '44px' }} onClick={onClickNextButton}>
        다음
      </FixedBottomCTA>
    </Stack>
  );
};

export default PreferenceFormPage;
