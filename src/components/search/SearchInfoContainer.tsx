import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import { Box, Grid, Stack, useTheme } from '@mui/material';

import AttractionImg from '@/assets/명소.png';
import LodgingImg from '@/assets/숙소.png';
import RestaurantImg from '@/assets/음식점.png';
import { DUMMY_OF_POPULAR_SEARCHES, DUMMY_OF_RECOMMENDED_SEARCHES } from '@/constants/dummy';

const CATEGORIES_ON_SEARCH = [
  { label: '숙소', imgSrc: LodgingImg },
  { label: '음식점', imgSrc: RestaurantImg },
  { label: '명소', imgSrc: AttractionImg },
];

const SearchInfoContainer = ({
  recentSearches,
  onClear,
  setSearchKeyword,
}: {
  recentSearches: string[];
  onClear: () => void;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useTheme();

  return (
    <>
      <Stack>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ padding: '8px 14px' }}>
          <Typography fontSize={14} bold>
            최근 검색어
          </Typography>
          <Button
            variant="text"
            color="inherit"
            sx={{ color: theme.palette.grey[500] }}
            onClick={onClear}
            disabled={recentSearches.length <= 0}
          >
            전체 삭제
          </Button>
        </Stack>
        <Stack flexDirection="row" gap="12px" flexWrap="wrap" sx={{ padding: '8px 14px' }}>
          {recentSearches.length > 0 ? (
            recentSearches.map((recentSearch) => {
              return (
                <Button
                  key={recentSearch}
                  variant="outlined"
                  color="inherit"
                  shape="circle"
                  sx={{
                    color: theme.palette.grey[500],
                    border: `1px solid ${theme.palette.grey[500]}`,
                    width: 'fit-content',
                  }}
                  onClick={() => {
                    setSearchKeyword(recentSearch);
                  }}
                >
                  {recentSearch}
                </Button>
              );
            })
          ) : (
            <Typography fontSize={12} color="grey">
              최근 검색어가 없습니다
            </Typography>
          )}
        </Stack>
      </Stack>
      {/* 추천 검색어 */}
      <Stack>
        <Stack sx={{ padding: '8px 14px' }}>
          <Typography fontSize={14} bold>
            추천 검색어
          </Typography>
          <Typography fontSize={10} color="grey">
            최근 검색어 기반으로 추천 검색어를 골라봤어요
          </Typography>
        </Stack>
        <Stack flexDirection="row" gap="12px" flexWrap="wrap" sx={{ padding: '8px 14px' }}>
          {DUMMY_OF_RECOMMENDED_SEARCHES.map((search) => {
            return (
              <Button
                key={search}
                variant="outlined"
                color="inherit"
                shape="circle"
                sx={{
                  color: theme.palette.grey[500],
                  border: `1px solid ${theme.palette.grey[500]}`,
                  width: 'fit-content',
                }}
                onClick={() => {
                  setSearchKeyword(search);
                }}
              >
                {search}
              </Button>
            );
          })}
        </Stack>
      </Stack>
      {/* 인기 검색어 */}
      <Stack>
        <Stack sx={{ padding: '8px 14px' }}>
          <Typography fontSize={14} bold>
            인기 검색어
          </Typography>
          <Typography fontSize={10} color="grey">
            15시 기준
          </Typography>
        </Stack>
        <Grid container spacing={2} sx={{ padding: '8px 14px' }}>
          {DUMMY_OF_POPULAR_SEARCHES.map((popularSearch, index) => {
            return (
              <Grid
                item
                xs={6}
                key={popularSearch}
                alignItems="center"
                onClick={() => {
                  setSearchKeyword(popularSearch);
                }}
              >
                <Stack alignItems="center" gap="8px" flexDirection="row">
                  <Typography fontSize={14} bold>
                    {index + 1}
                  </Typography>
                  <Typography fontSize={10} color="primary">
                    NEW
                  </Typography>
                  <Typography fontSize={14}>{popularSearch}</Typography>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Stack>
      {/* 카테고리별 탐색 */}
      <Stack sx={{ padding: '8px 14px' }} gap="16px">
        <Typography fontSize={14} bold>
          카테고리별 탐색
        </Typography>
        <Stack flexDirection="row" gap="12px">
          {CATEGORIES_ON_SEARCH.map((category) => {
            return (
              <Box
                key={category.label}
                sx={{
                  width: 58,
                  height: 58,
                  backgroundImage: `url(${category.imgSrc})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 1)',
                  boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.5)',
                }}
              >
                <Typography fontSize={10} bold color="white">
                  {category.label}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
};

export default SearchInfoContainer;
