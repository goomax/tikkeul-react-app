import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import { Box, Stack } from '@mui/material';
import ImageWithSkeleton from '../common/ImageWithSkeleton';
import { useInternalRouter } from '@/hooks';
import { commaizeNumber } from '@/utils/formatter';
import { Course } from '@/apis/course';

interface RecommendCoursesProps {
  courses: Course[];
}

const RecommendCourses = ({ courses }: RecommendCoursesProps) => {
  const router = useInternalRouter();

  const onClickCourse = (courseId: number) => {
    router.push(`/courses/${courseId}`);
  };
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
            key={course.courseId}
            flexDirection="row"
            alignItems="center"
            gap="12px"
            sx={{
              height: '100%',
              padding: '8px 14px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            onClick={() => {
              onClickCourse(course.courseId);
            }}
          >
            <ImageWithSkeleton
              src={course.thumbnails[0]}
              width={80}
              height={80}
              alt={course.title}
              style={{ borderRadius: '16px' }}
            />
            <Stack
              gap="8px"
              sx={{
                width: '202px',
              }}
            >
              {' '}
              <Stack flexDirection="row" gap="4px">
                {course.tags.map((tag) => {
                  return <Chip key={tag} radiusVariant="square" color="default" label={tag} />;
                })}
              </Stack>
              <Stack gap="1px">
                <Typography fontSize={12} bold noWrap>
                  {course.title}
                </Typography>
                <Typography fontSize={10} color="grey" noWrap>
                  {course.description}
                </Typography>
              </Stack>
              <Stack flexDirection="row" gap="8px">
                <Stack flexDirection="row" gap="4px">
                  <Heart svgProps={{ width: '15px', height: '15px' }} />
                  <Typography fontSize={12} color="grey">
                    {course.likeCount}
                  </Typography>
                </Stack>
                <Stack flexDirection="row" gap="4px">
                  <ShoppingCart svgProps={{ width: '15px', height: '15px' }} pathProps={{ stroke: '#CCCCCC' }} />
                  <Typography fontSize={12} color="grey">
                    {course.cartCount}
                  </Typography>
                </Stack>
              </Stack>
              <Stack justifyContent="flex-end" alignItems="flex-end">
                <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
                  예상 평균 금액{' '}
                  <Typography fontSize={14} bold color="secondary" inline>
                    {commaizeNumber(course.price)}원
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
