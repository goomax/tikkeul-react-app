import Button from '@/components/common/Button';
import IconButton from '@/components/common/IconButton';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import { Search } from '@/components/icons';
import { Box, Grid, Stack, useTheme } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import AttractionImg from '@/assets/명소.png';
import LodgingImg from '@/assets/숙소.png';
import RestaurantImg from '@/assets/음식점.png';
import { DUMMY_OF_POPULAR_SEARCHES, DUMMY_OF_RECOMMENDED_SEARCHES } from '@/constants/dummy';
import { useInput } from '@/hooks';
import { motion } from 'framer-motion';
import { STORAGE_KEY } from '@/constants/key';

const MAX_RECENT_SEARCHES = 5;

const CATEGORIES_ON_SEARCH = [
  { label: '숙소', imgSrc: LodgingImg },
  { label: '음식점', imgSrc: RestaurantImg },
  { label: '명소', imgSrc: AttractionImg },
];

const SearchFormPage = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const theme = useTheme();
  const { value: searchKeyword, onChange: onChangeSearchKeyword } = useInput('');

  const loadRecentSearches = () => {
    const storedSearches = JSON.parse(localStorage.getItem(STORAGE_KEY.RECENT_SEARCHES) || '[]');
    setRecentSearches(storedSearches);
  };

  const handleSearchKeyword = () => {
    if (!searchKeyword) {
      return;
    }

    const storedSearches = JSON.parse(localStorage.getItem(STORAGE_KEY.RECENT_SEARCHES) || '[]');

    const updatedSearches = [searchKeyword, ...storedSearches.filter((item: string) => item !== searchKeyword)];

    if (updatedSearches.length > MAX_RECENT_SEARCHES) {
      updatedSearches.splice(MAX_RECENT_SEARCHES);
    }

    localStorage.setItem(STORAGE_KEY.RECENT_SEARCHES, JSON.stringify(updatedSearches));
    loadRecentSearches();
  };

  const onClear = () => {
    localStorage.removeItem(STORAGE_KEY.RECENT_SEARCHES);
    setRecentSearches([]);
  };

  const onClickSearch = () => {
    if (searchKeyword) {
      handleSearchKeyword();
    }
  };

  const onKeyDownSearch = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchKeyword();
    }
  };

  useEffect(() => {
    loadRecentSearches();

    const storageListener = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY.RECENT_SEARCHES) {
        loadRecentSearches();
      }
    };

    window.addEventListener('storage', storageListener);
    return () => {
      window.removeEventListener('storage', storageListener);
    };
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  return (
    <Stack
      gap="16px"
      sx={{
        paddingBottom: '100px',
      }}
    >
      {/* 검색창 */}
      <Box sx={{ padding: '19px 14px' }}>
        <motion.div
          className="card-content"
          layoutId="search-input"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
        >
          <TextField
            inputRef={searchRef}
            variant="outlined"
            placeholder="이번엔 어디로 떠나볼까요?"
            aria-label="여행지 정보 검색"
            fullWidth
            InputProps={{
              startAdornment: (
                <IconButton onClick={onClickSearch} sx={{ padding: 0, width: '20px', height: '20px' }}>
                  <Search />
                </IconButton>
              ),
              sx: {
                height: '36px',
              },
            }}
            value={searchKeyword}
            onChange={onChangeSearchKeyword}
            onKeyDown={onKeyDownSearch}
          />
        </motion.div>
      </Box>
      {/* 최근 검색어 */}
      <motion.div
        className="card-content"
        layoutId="search-contents"
        initial={{ opacity: 0, transform: 'translateY(20px)' }}
        animate={{
          opacity: 1,
          transform: 'translateY(0)',
          transitionDuration: '0.5s',
          transitionDelay: '0.15s',
        }}
      >
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
                <Grid item xs={6} key={popularSearch} alignItems="center">
                  <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
                    <Typography fontSize={14} bold>
                      {index + 1}
                    </Typography>
                    <Typography fontSize={10} color="primary">
                      NEW
                    </Typography>
                    <Typography fontSize={14}>{popularSearch}</Typography>
                  </Typography>
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
      </motion.div>
    </Stack>
  );
};

export default SearchFormPage;
