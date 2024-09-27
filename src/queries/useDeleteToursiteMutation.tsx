import { useMutation } from '@tanstack/react-query';
import { deleteToursite } from '@/apis/group';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';

export const useDeleteToursiteMutation = ({ onSuccess, groupId }: { onSuccess?: () => void; groupId: number }) => {
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof deleteToursite>[0]) => deleteToursite(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GROUP, groupId] });
      if (onSuccess) {
        onSuccess();
      }
    },
  });

  return mutation;
};
