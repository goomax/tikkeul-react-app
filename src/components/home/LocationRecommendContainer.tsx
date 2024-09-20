import Typography from '@/components/common/Typography';
import { Grid, Skeleton, Stack, Tab, Tabs, useTheme } from '@mui/material';
import { Suspense, SyntheticEvent, useState } from 'react';
import GridCard from '../GridCard';
import { useGetTourSiteListQuery } from '@/queries/useGetTourSiteListQuery';
import { TourSite } from '@/apis/course';
import { useDialog, useSelectableState } from '@/hooks';
import TourSiteBottomSheet from '../TourSiteBottomSheet';
import { mockArray } from '@/utils/generator';

const TABS = [
  { label: '숙소', value: 'lodging' },
  { label: '음식점', value: 'restaurant' },
  { label: '명소', value: 'activity' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

const LocationRecommendContainer = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<TabValue>(TABS[0].value);

  const onChangeTab = (_event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue as TabValue);
  };

  return (
    <>
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
          value={currentTab}
          centered
          onChange={onChangeTab}
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
        <Suspense
          fallback={
            <Grid container spacing={4}>
              {mockArray(4).map((_, index) => (
                <Grid item xs={6} key={index}>
                  <Skeleton variant="rounded" height={211} width={157} />
                </Grid>
              ))}
            </Grid>
          }
        >
          <AsyncTourSiteGrid currentTab={currentTab} />
        </Suspense>
      </Stack>
    </>
  );
};

export default LocationRecommendContainer;

function a11yProps(label: string) {
  return {
    id: `simple-tab-${label}`,
    'aria-controls': `simple-tabpanel-${label}`,
  };
}

const AsyncTourSiteGrid = ({ currentTab }: { currentTab: TabValue }) => {
  const { tourSiteData } = useGetTourSiteListQuery({
    filter: currentTab,
  });

  const { selectedState, onSelect, onReset } = useSelectableState<Omit<TourSite, 'order'>>(null);
  const { open, onOpen, onClose } = useDialog();

  return (
    <>
      <GridCard.Wrapper>
        {tourSiteData.map((tourSite) => (
          <GridCard.Card
            key={tourSite.tourSiteId}
            thumbnail={tourSite.thumbnails[0]}
            title={tourSite.name}
            tag={tourSite.tags[0]}
            price={tourSite.price}
            onClick={() => {
              onSelect(tourSite);
              onOpen();
            }}
          />
        ))}
      </GridCard.Wrapper>
      <TourSiteBottomSheet
        open={open}
        onClose={() => {
          onClose();
          onReset();
        }}
        tourSite={selectedState}
      />
    </>
  );
};
