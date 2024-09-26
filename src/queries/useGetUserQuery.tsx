import { getUser } from '@/apis/user';
import { QUERY_KEY } from '@/constants/key';
import { useQuery } from '@tanstack/react-query';

export const useGetUserQuery = () => {
  const { data: userData, ...others } = useQuery({
    queryKey: [QUERY_KEY.USER],
    queryFn: () => {
      return getUser().then((res) => res.data);
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { userData, ...others };
};
