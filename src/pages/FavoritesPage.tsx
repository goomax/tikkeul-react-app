import Button from '@/components/common/Button';
import GridCard from '@/components/common/GridCard';
import Typography from '@/components/common/Typography';
import { useFetch } from '@/hooks';
import { GetRecommendedLocationsResponse } from '@/types/apiResponse';
import { Stack } from '@mui/material';

const FavoritesPage = () => {
  const { payload: recommendedLocations } = useFetch<GetRecommendedLocationsResponse['data']>({
    url: '/recommendedLocationsByCategory',
    defaultValue: [],
  });

  return (
    <Stack sx={{ padding: '8px 14px' }}>
      <Typography bold fontSize={16} mb="20px">
        내가 찜한 코스
      </Typography>

      <GridCard.Wrapper>
        {recommendedLocations.map((location) => (
          <GridCard.Card
            card={location}
            bottom={
              <Button fullWidth variant="outlined" disabled>
                삭제
              </Button>
            }
          />
        ))}
      </GridCard.Wrapper>
    </Stack>
  );
};

export default FavoritesPage;
