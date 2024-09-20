import { getCourseList } from '@/apis/course';
import { QUERY_KEY } from '@/constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetCourseQuery = ({ groupId, type }: Parameters<typeof getCourseList>[0]) => {
  const { data: courseList = [], ...others } = useSuspenseQuery({
    queryKey: [QUERY_KEY.COURSES, type, groupId],
    queryFn: () => getCourseList({ type, groupId }).then((res) => res.data.courseList),
  });

  return { courseList, ...others };
};
