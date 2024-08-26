import { GetRecommendedCoursesResponse } from '@/types/apiResponse';
import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import { Box, Stack } from '@mui/material';
import Image from '../common/Image';

interface RecommendCoursesProps {
  courses: GetRecommendedCoursesResponse['data'];
}

const RecommendCourses = ({ courses }: RecommendCoursesProps) => {
  return (
    <Box
      sx={{
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        borderRadius: '12px',
        minHeight: '396px',
      }}
    >
      {courses.map((course) => {
        return (
          <Stack
            key={course.key}
            flexDirection="row"
            alignItems="center"
            gap="12px"
            sx={{ height: '100%', padding: '8px 14px' }}
          >
            <Image src={course.image} width={80} height={80} alt={course.title} style={{ borderRadius: '16px' }} />
            <Stack
              gap="8px"
              sx={{
                width: '202px',
              }}
            >
              <Chip
                radiusVariant="square"
                color="default"
                sx={{
                  width: '56px',
                  height: '19px',
                  '& .MuiChip-label': {
                    padding: '1px',
                    fontSize: '10px',
                  },
                }}
                label={course.type}
              />
              <Stack gap="1px">
                <Typography fontSize={12} bold noWrap>
                  {course.title}
                </Typography>
                <Typography fontSize={10} color="grey">
                  {course.desc}
                </Typography>
              </Stack>
              <Stack flexDirection="row" gap="8px">
                <Stack flexDirection="row" gap="4px">
                  <Heart svgProps={{ width: '15px', height: '15px' }} />
                  <Typography fontSize={12} color="grey">
                    {course.heart}
                  </Typography>
                </Stack>
                <Stack flexDirection="row" gap="4px">
                  <ShoppingCart svgProps={{ width: '15px', height: '15px' }} pathProps={{ stroke: '#CCCCCC' }} />
                  <Typography fontSize={12} color="grey">
                    {course.cart}
                  </Typography>
                </Stack>
              </Stack>
              <Stack justifyContent="flex-end" alignItems="flex-end">
                <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
                  예상 평균 금액{' '}
                  <Typography fontSize={14} bold color="secondary" inline>
                    {course.price}원
                  </Typography>
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
};

export default RecommendCourses;
