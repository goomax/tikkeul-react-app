import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import GridCard from '@/components/GridCard';
import { useGetCoursesByGroupQuery } from '@/queries/useGetCoursesByGroupQuery';
import { Stack } from '@mui/material';

const FavoritesPage = () => {
  const { courseList } = useGetCoursesByGroupQuery({ groupId: Number(1), type: 'like' });

  return (
    <Stack sx={{ padding: '8px 14px' }}>
      <Typography bold fontSize={16} mb="20px">
        내가 찜한 코스
      </Typography>
      <GridCard.Wrapper>
        {courseList.map((course) => (
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
      </GridCard.Wrapper>
    </Stack>
  );
};

export default FavoritesPage;
