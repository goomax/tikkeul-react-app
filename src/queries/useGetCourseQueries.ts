import { getCourseList } from '@/apis/course';
import { QUERY_KEY } from '@/constants/key';
import { useQueries } from '@tanstack/react-query';

export const useGetCourseQueries = ({ groupId }: Pick<Parameters<typeof getCourseList>[0], 'groupId'>) => {
  const queries = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.COURSES, 'recommend', groupId],
        queryFn: () => getCourseList({ type: 'recommend', groupId }).then((res) => res.data.courseList),
      },
      {
        queryKey: [QUERY_KEY.COURSES, 'hot'],
        queryFn: () => getCourseList({ type: 'hot' }).then((res) => res.data.courseList),
      },
      {
        queryKey: [QUERY_KEY.COURSES, 'like', groupId],
        queryFn: () => getCourseList({ type: 'like', groupId }).then((res) => res.data.courseList),
      },
    ],
  });

  return queries;
};
