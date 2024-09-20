import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import GridCard from '@/components/GridCard';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useQueryString } from '@/hooks';
import { useGetCourseQueries } from '@/queries/useGetCourseQueries';
import { Stack } from '@mui/material';

const FavoritesPage = () => {
  const { getParams } = useQueryString();
  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const [, , likedCourses] = useGetCourseQueries({ groupId: Number(groupId) ?? 1111 });

  return (
    <Stack sx={{ padding: '8px 14px' }}>
      <Typography bold fontSize={16} mb="20px">
        내가 찜한 코스
      </Typography>

      <GridCard.Wrapper>
        {likedCourses.data &&
          likedCourses.data.map((course) => (
            <GridCard.Card
              key={course.courseId}
              thumbnail={course.thumbnails[0]}
              title={course.title}
              tag={course.tags[0]}
              price={course.price}
              bottom={
                <Button
                  fullWidth
                  variant="outlined"
                  disabled
                  sx={{
                    height: '26px',
                  }}
                >
                  삭제
                </Button>
              }
            />
          ))}
      </GridCard.Wrapper>
    </Stack>
  );
};

export default FavoritesPage;
