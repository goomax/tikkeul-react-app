import { getCourseList } from '@/apis/course';
import { getCoursesByGroup } from '@/apis/group';
import { QUERY_KEY } from '@/constants/key';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export const useGetCoursesByGroupQuery = ({ groupId, type }: Parameters<typeof getCoursesByGroup>[0]) => {
  const { data: courseList = [], ...others } = useQuery({
    queryKey: [QUERY_KEY.COURSES, type, groupId],
    queryFn: () => getCoursesByGroup({ type, groupId }).then((res) => res.data.toursites),
  });

  return { courseList, ...others };
};
