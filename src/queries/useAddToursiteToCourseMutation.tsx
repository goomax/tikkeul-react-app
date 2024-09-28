import { addToursiteToCourse } from '@/apis/group';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';
import { useInternalRouter } from '@/hooks';

export const useAddToursiteToCourseMutation = ({ groupId }: { groupId?: number }) => {
  const router = useInternalRouter();
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof addToursiteToCourse>[0]) => addToursiteToCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GROUP, groupId] }).then(() => {
        router.goBack();
      });
    },
  });

  return mutation;
};
