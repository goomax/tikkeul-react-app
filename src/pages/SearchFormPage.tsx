import IconButton from '@/components/common/IconButton';
import TextField from '@/components/common/TextField';
import { Search } from '@/components/icons';
import { Box, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useInput } from '@/hooks';
import { motion } from 'framer-motion';
import { STORAGE_KEY } from '@/constants/key';
import { useGetTourSiteListQuery } from '@/queries/useGetTourSiteListQuery';
import SearchResultContainer from '@/components/search/SearchResultContainer';
import SearchInfoContainer from '@/components/search/SearchInfoContainer';

const MAX_RECENT_SEARCHES = 5;

const SearchFormPage = () => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const {
    value: searchKeyword,
    onChange: onChangeSearchKeyword,
    debouncedValue,
    setValue: setSearchKeyword,
  } = useInput('', 500);

  const { tourSiteData } = useGetTourSiteListQuery({
    count: 20,
    keyword: debouncedValue,
  });

  const isResultMode = searchKeyword && tourSiteData.length > 0;

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
        {isResultMode ? (
          <SearchResultContainer searchResults={tourSiteData} />
        ) : (
          <SearchInfoContainer recentSearches={recentSearches} onClear={onClear} setSearchKeyword={setSearchKeyword} />
        )}
      </motion.div>
    </Stack>
  );
};

export default SearchFormPage;
