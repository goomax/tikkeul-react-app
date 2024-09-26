import { getCourseList, getHotCourse } from '@/apis/course';
import { QUERY_KEY } from '@/constants/key';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetHotCourseQuery = () => {
  const { data: courseList = [], ...others } = useQuery({
    queryKey: ['hotcourse'],
    queryFn: () => getHotCourse().then((res) => res.data.toursites),
  });

  return { courseList, ...others };
};
