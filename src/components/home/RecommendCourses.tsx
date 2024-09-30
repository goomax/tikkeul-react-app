import Chip from '@/components/common/Chip';
import Typography from '@/components/common/Typography';
import { Heart, ShoppingCart } from '@/components/icons';
import { Box, IconButton, Stack } from '@mui/material';
import ImageWithSkeleton from '../common/ImageWithSkeleton';
import { useInternalRouter } from '@/hooks';
import { commaizeNumber } from '@/utils/formatter';
import { Course } from '@/schemas/types';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProtectedContents from '../hoc/ProtectedContents';
import { useCourseLikesQueries } from '@/queries/useCourseLikesQueries';
import { useToggleLikeMutation } from '@/queries/useToggleLikeMutation';
interface RecommendCoursesProps {
  courses: Course[];
}

const RecommendCourses = ({ courses }: RecommendCoursesProps) => {
  const { currentGroup, isLogin } = useGetUserQuery();
  const { likeStatusHash } = useCourseLikesQueries(
    courses.map((course) => ({
      courseId: course.id,
      groupId: currentGroup?.groupId ?? 0,
    })),
    isLogin,
  );

  return (
    <Box
      sx={{
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        borderRadius: '12px',
        minHeight: '396px',
        backgroundColor: 'white',
      }}
    >
      {Array.isArray(courses) &&
        courses.map((_course) => {
          const course = { ..._course, like: !!likeStatusHash[_course.id] };
          return <CourseCard key={course.id} course={course} />;
        })}
    </Box>
  );
};

export default RecommendCourses;

const CourseCard = ({ course }: { course: Course & { like: boolean } }) => {
  const router = useInternalRouter();
  const { currentGroup } = useGetUserQuery();

  const onClickCourse = (courseId: number, groupId?: number) => {
    router.push(`/courses/${courseId}?groupId=${groupId}`);
  };

  const { mutate: toggleLike } = useToggleLikeMutation({ courseId: course.id, groupId: currentGroup?.groupId ?? 0 });

  return (
    <Stack
      key={course.id}
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
        onClickCourse(course.id, currentGroup?.groupId);
      }}
    >
      <div style={{ position: 'relative' }}>
        <ImageWithSkeleton
          src={course?.tourSites ? course.tourSites[0].photoUrls[0] : ''}
          width={80}
          height={80}
          alt={course.name}
          style={{ borderRadius: '16px' }}
        />
        <ProtectedContents hide={!currentGroup}>
          <IconButton
            sx={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              color: 'secondary.main',
              padding: 0,
            }}
            onClick={(e) => {
              e.stopPropagation();
              toggleLike({ courseId: course.id, groupId: currentGroup?.groupId ?? 0 });
            }}
          >
            {course.like ? (
              <FavoriteIcon
                sx={{
                  width: '16px',
                  height: '16px',
                }}
              />
            ) : (
              <FavoriteBorderIcon
                sx={{
                  width: '16px',
                  height: '16px',
                }}
              />
            )}
          </IconButton>
        </ProtectedContents>
      </div>
      <Stack
        gap="8px"
        sx={{
          width: '202px',
        }}
      >
        {' '}
        <Stack flexDirection="row" gap="4px">
          <Chip radiusVariant="square" color="default" label={course.courseType} />
        </Stack>
        <Stack gap="1px">
          <Typography fontSize={12} bold noWrap>
            {course.name}
          </Typography>
          <Typography fontSize={10} color="grey" noWrap>
            {course.description}
          </Typography>
        </Stack>
        <Stack flexDirection="row" gap="8px">
          <Stack flexDirection="row" gap="4px">
            <Heart svgProps={{ width: '15px', height: '15px' }} />
            <Typography fontSize={12} color="grey">
              {course.liked}
            </Typography>
          </Stack>
          <Stack flexDirection="row" gap="4px">
            <ShoppingCart svgProps={{ width: '15px', height: '15px' }} pathProps={{ stroke: '#CCCCCC' }} />
            <Typography fontSize={12} color="grey">
              {course.picked}
            </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent="flex-end" alignItems="flex-end">
          <Typography fontSize={10} display="inline-flex" alignItems="center" gap="8px">
            예상 평균 금액{' '}
            <Typography fontSize={14} bold color="secondary" inline>
              {commaizeNumber(course.cost)}원
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
