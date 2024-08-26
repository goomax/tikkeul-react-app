import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import BenefitCard from '@/components/home/BenefitCard';
import { Search } from '@/components/icons';
import { useInternalRouter, useFetch } from '@/hooks';
import { GetBenefitResponse } from '@/types/apiResponse';
import { Box, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BannerContainer = () => {
  const [benefits, setBenefits] = useState<(GetBenefitResponse['data'][number] & { isClose: boolean })[]>([]);
  const { payload: rawBenefits } = useFetch<GetBenefitResponse['data']>({ url: '/benefit', defaultValue: [] });

  const router = useInternalRouter();

  useEffect(() => {
    setBenefits(
      rawBenefits.map((benefit) => {
        return {
          ...benefit,
          isClose: false,
        };
      }),
    );
  }, [rawBenefits]);

  const onCloseBenefit = (benefitId: string) => {
    setBenefits((prevBenefits) =>
      prevBenefits.map((benefit) => (benefit.key === benefitId ? { ...benefit, isClose: true } : benefit)),
    );
  };

  const onFocusSearchInput = () => {
    router.push('/search-form');
  };

  return (
    <Stack sx={{ backgroundColor: '#F3FFFB' }}>
      <Box sx={{ padding: '19px 14px' }}>
        <motion.div className="card-content" layoutId="search-input">
          <TextField
            variant="outlined"
            placeholder="여행지 정보를 찾고 계신가요?"
            aria-label="여행지 정보 검색페이지로 이동"
            fullWidth
            InputProps={{
              startAdornment: <Search />,
              sx: {
                height: '36px',
              },
            }}
            onFocus={onFocusSearchInput}
          />
        </motion.div>
      </Box>
      <Stack>
        <Box sx={{ padding: '8px 14px' }}>
          <Typography fontSize={14} lineHeight="21px">
            안녕하세요, 김티끌님!
          </Typography>
          <Typography fontSize={14} lineHeight="21px" bold>
            오늘 받으실 수 있는 혜택은{' '}
            <Typography color="primary" inline>
              총 {benefits.filter((benefit) => !benefit.isClose).length}개
            </Typography>
            입니다
          </Typography>
        </Box>
        <Stack
          flexDirection="row"
          gap="20px"
          sx={{
            padding: '20px 14px',
            overflowX: 'scroll',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <AnimatePresence>
            {benefits.map((benefit) => {
              if (benefit.isClose) {
                return null;
              }

              return <BenefitCard key={benefit.key} benefit={benefit} onClose={onCloseBenefit} />;
            })}
          </AnimatePresence>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BannerContainer;
