import { postUser } from '@/apis/user';
import { useMutation } from '@tanstack/react-query';
import { useInternalRouter } from '@/hooks';

export const usePostUserMutation = () => {
  const router = useInternalRouter();
  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof postUser>[0]) => postUser(data),
    onSuccess: () => {
      router.replace('/');
    },
  });

  return mutation;
};
