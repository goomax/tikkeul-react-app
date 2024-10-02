import Typography from '@/components/common/Typography';
import { Grid, Skeleton, Stack } from '@mui/material';
import GridCard from '../GridCard';
import { useGetTourSiteListQuery } from '@/queries/useGetTourSiteListQuery';
import { Toursite } from '@/schemas/types';
import { useDialog, useSelectableState, useTab } from '@/hooks';
import TourSiteBottomSheet from '../TourSiteBottomSheet';
import { formatToursiteType } from '@/utils/formatter';
import Tab from '@/components/common/Tab';
import AsyncBoundary from '../hoc/AsyncBoundary';
import { mockArray } from '@/utils/generator';
import ErrorBox from '../common/ErrorBox';

const VISIBLE_LENGTH = 4;

const TABS = [
  { label: '숙소', value: 'lodging' },
  { label: '음식점', value: 'restaurant' },
  { label: '명소', value: 'activity' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

const LocationRecommendContainer = () => {
  const { tab: currentTab, onChangeTab } = useTab<TabValue>(TABS[0].value);
  const { tourSiteData, isLoading, isError } = useGetTourSiteListQuery({
    filter: currentTab,
    count: VISIBLE_LENGTH,
  });
  const { selectedState, onSelect, onReset } = useSelectableState<Toursite>(null);
  const { open, onOpen, onClose } = useDialog();

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
        <Tab.Wrapper value={currentTab} onChange={onChangeTab}>
          {TABS.map((tab) => {
            return <Tab.Item key={tab.value} label={tab.label} value={tab.value} />;
          })}
        </Tab.Wrapper>
        <GridCard.Wrapper>
          <AsyncBoundary
            isLoading={isLoading}
            isError={isError}
            loadingFallback={mockArray(VISIBLE_LENGTH).map((_, index) => (
              <Grid item xs={6} key={index}>
                <Skeleton height={196} variant="rectangular" />
              </Grid>
            ))}
            errorFallback={<ErrorBox height={200} />}
          >
            {tourSiteData.map((toursite) => (
              <GridCard.Item
                key={toursite.tourSiteId}
                thumbnail={toursite.photoUrls[0]}
                title={toursite.name}
                tag={formatToursiteType(toursite.type)}
                price={toursite.cost}
                onClick={() => {
                  onSelect(toursite);
                  onOpen();
                }}
              />
            ))}
          </AsyncBoundary>
        </GridCard.Wrapper>
        <TourSiteBottomSheet
          open={open}
          onClose={() => {
            onClose();
            onReset();
          }}
          toursite={selectedState}
        />
      </Stack>
    </>
  );
};

export default LocationRecommendContainer;
