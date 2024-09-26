import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import BenefitCard from '@/components/home/BenefitCard';
import { Search } from '@/components/icons';
import { useInternalRouter } from '@/hooks';
import { GetBenefitResponse } from '@/types/apiResponse';
import { Box, Stack } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Carousel from '../common/Carousel';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { DUMMY_OF_BENEFITS } from '@/constants/dummy';

const BannerContainer = () => {
  const { userData } = useGetUserQuery();
  const [benefits, setBenefits] = useState<(GetBenefitResponse['data'][number] & { isClose: boolean })[]>(
    DUMMY_OF_BENEFITS.map((benefit) => {
      return {
        ...benefit,
        isClose: false,
      };
    }),
  );

  const router = useInternalRouter();

  const onCloseBenefit = (benefitId: string) => {
    setBenefits((prevBenefits) =>
      prevBenefits.map((benefit) => (benefit.id === benefitId ? { ...benefit, isClose: true } : benefit)),
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
            안녕하세요, {userData ? userData.name : '김티끌'}님!
          </Typography>
          <Typography fontSize={14} lineHeight="21px" bold>
            오늘 받으실 수 있는 혜택은{' '}
            <Typography color="primary" inline>
              총 {benefits.filter((benefit) => !benefit.isClose).length}개
            </Typography>
            입니다
          </Typography>
        </Box>
        <Carousel
          gap="20px"
          sx={{
            padding: '20px 14px',
          }}
        >
          <AnimatePresence>
            {benefits.map((benefit) => {
              if (benefit.isClose) {
                return null;
              }

              return (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  onClose={() => {
                    onCloseBenefit(benefit.id);
                  }}
                />
              );
            })}
          </AnimatePresence>
        </Carousel>
      </Stack>
      {/* dd */}
    </Stack>
  );
};

export default BannerContainer;
