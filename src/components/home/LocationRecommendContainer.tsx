import Typography from '@/components/common/Typography';
import { Stack, Tab, Tabs, useTheme } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import GridCard from '../GridCard';
import { useGetTourSiteListQuery } from '@/queries/useGetTourSiteListQuery';

const TABS = [
  { label: '숙소', value: 'lodging' },
  { label: '음식점', value: 'restaurant' },
  { label: '명소', value: 'activity' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

const LocationRecommendContainer = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState<TabValue>(TABS[0].value);

  const { tourSiteData } = useGetTourSiteListQuery({
    filter: tabValue,
  });

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue as TabValue);
  };

  return (
    <Stack gap="16px" sx={{ padding: '8px 14px 100px 14px' }}>
      <Stack>
        <Typography fontSize={14} lineHeight="21px" bold>
          카테고리별 추천
        </Typography>
        <Typography fontSize={12} color="grey">
          최근 일주일 간 가장 조회가 많았던 장소입니다
        </Typography>
      </Stack>
      <Tabs
        value={tabValue}
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
        {TABS.map((tab) => {
          return (
            <Tab
              label={tab.label}
              value={tab.value}
              key={tab.value}
              {...a11yProps(tab.label)}
              sx={{ minHeight: '28px', height: '28px' }}
            />
          );
        })}
      </Tabs>
      <GridCard.Wrapper>
        {tourSiteData.map((tourSite) => (
          <GridCard.Card
            key={tourSite.tourSiteId}
            thumbnail={tourSite.thumbnails[0]}
            title={tourSite.name}
            tag={tourSite.tags[0]}
            price={tourSite.price}
          />
        ))}
      </GridCard.Wrapper>
    </Stack>
  );
};

export default LocationRecommendContainer;

function a11yProps(label: string) {
  return {
    id: `simple-tab-${label}`,
    'aria-controls': `simple-tabpanel-${label}`,
  };
}
