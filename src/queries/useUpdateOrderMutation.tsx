import { updateCourseOrder } from '@/apis/group';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';

export const useUpdateOrderMutation = ({ groupId }: { groupId: number }) => {
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof updateCourseOrder>[0]) => updateCourseOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GROUP, groupId] });
    },
  });

  return mutation;
};
