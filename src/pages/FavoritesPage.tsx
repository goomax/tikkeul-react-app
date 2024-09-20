import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import GridCard from '@/components/GridCard';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useQueryString } from '@/hooks';
import { useGetCourseQuery } from '@/queries/useGetCourseQueries';
import { mockArray } from '@/utils/generator';
import { Grid, Skeleton, Stack } from '@mui/material';
import { Suspense } from 'react';

const FavoritesPage = () => {
  return (
    <Stack sx={{ padding: '8px 14px' }}>
      <Typography bold fontSize={16} mb="20px">
        내가 찜한 코스
      </Typography>

      <GridCard.Wrapper>
        <Suspense
          fallback={mockArray(4).map((_, index) => (
            <Grid item xs={6} key={index}>
              <Skeleton variant="rounded" height={211} width={157} />
            </Grid>
          ))}
        >
          <AsyncGridCards />
        </Suspense>
      </GridCard.Wrapper>
    </Stack>
  );
};

export default FavoritesPage;

const AsyncGridCards = () => {
  const { getParams } = useQueryString();
  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const { courseList } = useGetCourseQuery({ groupId: Number(groupId), type: 'like' });

  return (
    <>
      {courseList.map((course) => (
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
                marginTop: '6px',
              }}
            >
              삭제
            </Button>
          }
        />
      ))}
    </>
  );
};
