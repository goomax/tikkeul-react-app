import { getHotCourse } from '@/apis/course';
import { QUERY_KEY } from '@/constants/key';
import { useQuery } from '@tanstack/react-query';

export const useGetHotCourseQuery = ({ count }: Parameters<typeof getHotCourse>[0]) => {
  const { data: courseList = [], ...others } = useQuery({
    queryKey: [QUERY_KEY.COURSES, 'hot'],
    queryFn: () =>
      getHotCourse({ count }).then((res) => {
        return res.data.courseList;
      }),
  });

  return { courseList, ...others };
};
