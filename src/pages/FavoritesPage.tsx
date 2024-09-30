import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import GridCard from '@/components/GridCard';
import { useGetCoursesByGroupQuery } from '@/queries/useGetCoursesByGroupQuery';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { useToggleLikeMutation } from '@/queries/useToggleLikeMutation';
import { Course } from '@/schemas/types';
import { Stack } from '@mui/material';

const FavoritesPage = () => {
  const { currentGroup } = useGetUserQuery();
  const { courseList } = useGetCoursesByGroupQuery({ groupId: Number(currentGroup?.groupId), type: 'like' });

  return (
    <Stack sx={{ padding: '8px 14px' }}>
      <Typography bold fontSize={16} mb="20px">
        내가 찜한 코스
      </Typography>
      <GridCard.Wrapper>
        {courseList.map((course) => (
          <FavoriteCard key={course.id} course={course} />
        ))}
      </GridCard.Wrapper>
    </Stack>
  );
};

export default FavoritesPage;

const FavoriteCard = ({ course }: { course: Course }) => {
  const { currentGroup } = useGetUserQuery();

  const { mutate: toggleLike } = useToggleLikeMutation({ courseId: course.id, groupId: currentGroup?.groupId ?? 0 });

  return (
    <GridCard.Item
      key={course.id}
      thumbnail={course.tourSites[0].photoUrls[0]}
      title={course.name}
      tag={course.tourSites[0].type}
      price={course.cost}
      bottom={
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          sx={{
            height: '26px',
            marginTop: '6px',
          }}
          onClick={() => {
            toggleLike({ courseId: course.id, groupId: Number(currentGroup?.groupId) });
          }}
        >
          삭제
        </Button>
      }
    />
  );
};
