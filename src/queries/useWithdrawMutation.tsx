import { postWithdraw } from '@/apis/user';
import { useMutation } from '@tanstack/react-query';
import { useInternalRouter } from '@/hooks';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';

export const useWithdrawMutation = () => {
  const router = useInternalRouter();
  const mutation = useMutation({
    mutationFn: () => postWithdraw(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEY.USER] });

      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USER] }).then(() => {
        router.replace('/');
      });
    },
  });

  return mutation;
};
