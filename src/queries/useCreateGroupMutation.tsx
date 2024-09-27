import { createGroup } from '@/apis/group';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';
import { useInternalRouter } from '@/hooks';

export const useCreateGroupMutation = () => {
  const router = useInternalRouter();

  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof createGroup>[0]) => createGroup(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] }).then(() => {
        router.replace(`/onboarding?groupId=${data.data.id}`);
      });
    },
  });

  return mutation;
};
