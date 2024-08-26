import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import { useFetch } from '@/hooks';
import { GetRecommendedLocationsResponse } from '@/types/apiResponse';
import { Box, Grid, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { SyntheticEvent, useState } from 'react';

const LocationRecommendContainer = () => {
  const theme = useTheme();

  const { payload: recommendedLocations } = useFetch<GetRecommendedLocationsResponse['data']>({
    url: '/recommendedLocationsByCategory',
    defaultValue: [],
  });

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack gap="16px" sx={{ padding: '8px 14px' }}>
      <Stack>
        <Typography fontSize={14} lineHeight="21px" bold>
          카테고리별 추천
        </Typography>
        <Typography fontSize={12} color="grey">
          최근 일주일 간 가장 조회가 많았던 장소입니다
        </Typography>
      </Stack>

      <Tabs
        value={value}
        centered
        onChange={handleChange}
        textColor="inherit"
        sx={{
          height: '36px',
          maxHeight: '36px',
          minHeight: '36px',

          backgroundColor: theme.palette.grey[200],
          borderRadius: '20px',
          padding: '3.5px 0',

          '& .Mui-selected': {
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '20px',
          },

          '& .MuiTabs-indicator': {
            display: 'none',
          },
        }}
      >
        <Tab label="숙소" {...a11yProps(0)} sx={{ minHeight: '28px', height: '28px' }} />
        <Tab label="음식점" {...a11yProps(1)} sx={{ minHeight: '28px', height: '28px' }} />
        <Tab label="명소" {...a11yProps(2)} sx={{ minHeight: '28px', height: '28px' }} />
      </Tabs>

      <Grid container spacing={4}>
        {recommendedLocations.map((location) => {
          return (
            <Grid item xs={6} key={location.key}>
              <Box
                sx={{
                  borderRadius: '8px',
                  height: '100%',
                }}
              >
                <img
                  src={location.image}
                  alt={location.name}
                  width="148px"
                  height="132px"
                  style={{ borderRadius: '4px' }}
                />
                <Chip
                  radiusVariant="square"
                  color="default"
                  sx={{
                    width: '47px',
                    height: '19px',
                    '& .MuiChip-label': {
                      padding: '1px',
                      fontSize: '10px',
                    },
                  }}
                  label={location.type}
                />
                <Typography fontSize={12} bold>
                  {location.name}
                </Typography>
                <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
                  예상 평균 금액{' '}
                  <Typography fontSize={14} bold color="secondary" inline>
                    {location.price}원
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default LocationRecommendContainer;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}