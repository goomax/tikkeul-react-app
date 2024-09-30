import { getCourseLike } from '@/apis/group';
import { QUERY_KEY } from '@/constants/key';
import { useQueries } from '@tanstack/react-query';

export const useCourseLikesQueries = (courses: Parameters<typeof getCourseLike>[0][], isLogin: boolean) => {
  const queries = useQueries({
    queries: courses.map((course) => ({
      queryKey: [QUERY_KEY.LIKE, course.groupId, course.courseId],
      queryFn: () =>
        getCourseLike({ courseId: course.courseId, groupId: course.groupId }).then((res) => ({
          ...res.data,
          courseId: course.courseId,
        })),
      enabled: isLogin && !!course.groupId,
    })),
  });

  const likeStatusHash = queries.reduce((acc, query, index) => {
    const courseId = courses[index].courseId;
    if (query.isSuccess) {
      acc[courseId] = query.data?.like;
    }
    return acc;
  }, {} as Record<number, boolean | undefined>);

  return { likeStatusHash, ...queries };
};
