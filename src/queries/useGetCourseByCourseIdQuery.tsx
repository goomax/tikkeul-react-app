import { getCourse } from '@/apis/course';
import { QUERY_KEY } from '@/constants/key';
import { useQuery } from '@tanstack/react-query';

export const useGetCourseByCourseIdQuery = ({ courseId }: Parameters<typeof getCourse>[0]) => {
  const { data: courseData, ...others } = useQuery({
    queryKey: [QUERY_KEY.COURSES, courseId],
    queryFn: () => getCourse({ courseId }).then((res) => res.data),
  });

  return { courseData, ...others };
};
