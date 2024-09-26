import { createGroup } from '@/apis/group';
import { useMutation } from '@tanstack/react-query';

export const useCreateGroupMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof createGroup>[0]) => createGroup(data),
  });

  return mutation;
};
