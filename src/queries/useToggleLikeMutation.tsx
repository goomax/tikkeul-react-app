import { getCourseLike, toggleCourseLike } from '@/apis/group';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';

export const useToggleLikeMutation = ({ groupId, courseId }: Parameters<typeof getCourseLike>[0]) => {
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof toggleCourseLike>[0]) => toggleCourseLike(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.LIKE, groupId, courseId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COURSES] });
    },
  });

  return mutation;
};
