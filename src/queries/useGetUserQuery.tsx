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

  const findGroupById = (id: number) => {
    return userData?.groups.find((group) => group.groupId === id);
  };

  return {
    userData,
    isLogin: !!userData,
    hasGroup: userData?.groups && userData?.groups.length > 0,
    findGroupById,
    currentGroup: userData?.groups[userData?.groups.length - 1],
    ...others,
  };
};
