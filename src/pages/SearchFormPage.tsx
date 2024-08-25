import Button from '@/components/common/Button';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import TextField from '@/components/common/TextField';
import Typography from '@/components/common/Typography';
import { Search } from '@/components/icons';
import { Box, Stack, useTheme } from '@mui/material';

const SearchFormPage = () => {
  const theme = useTheme();
  return (
    <PageTransformWrapper>
      <Stack gap="16px">
        <Box sx={{ padding: '19px 14px' }}>
          <TextField
            focused={true}
            variant="outlined"
            placeholder="여행지 정보를 찾고 계신가요? 검색해 보세요"
            aria-label="여행지 정보 검색"
            fullWidth
            InputProps={{
              startAdornment: <Search />,
              sx: {
                height: '36px',
              },
            }}
          />
        </Box>
        <Stack>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ padding: '8px 14px' }}>
            <Typography fontSize={14} bold>
              최근 검색어
            </Typography>
            <Button variant="text" color="inherit" sx={{ color: theme.palette.grey[500] }}>
              전체 삭제
            </Button>
          </Stack>
          <Stack flexDirection="row" gap="12px" flexWrap="wrap" sx={{ padding: '8px 14px' }}>
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              열정적인 활동가
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              양양 맛집
            </Button>{' '}
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              로컬 맛집
            </Button>{' '}
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              분위기 좋은 속초 카페
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <Stack flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ padding: '8px 14px' }}>
            <Typography fontSize={14} bold>
              추천 검색어
            </Typography>
            <Button variant="text" color="inherit" sx={{ color: theme.palette.grey[500] }}>
              전체 삭제
            </Button>
          </Stack>
          <Stack flexDirection="row" gap="12px" flexWrap="wrap" sx={{ padding: '8px 14px' }}>
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              열정적인 활동가
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              양양 맛집
            </Button>{' '}
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              로컬 맛집
            </Button>{' '}
            <Button
              variant="outlined"
              color="inherit"
              shape="circle"
              sx={{
                color: theme.palette.grey[500],
                border: `1px solid ${theme.palette.grey[500]}`,
                width: 'fit-content',
              }}
            >
              분위기 좋은 속초 카페
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </PageTransformWrapper>
  );
};

export default SearchFormPage;
