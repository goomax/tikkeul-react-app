import { getGroup } from '@/apis/group';
import { QUERY_KEY } from '@/constants/key';
import { useQuery } from '@tanstack/react-query';

export const useGetGroupQuery = ({ groupId }: Parameters<typeof getGroup>[0]) => {
  const { data: groupData, ...others } = useQuery({
    queryKey: [QUERY_KEY.GROUP, groupId],
    queryFn: () => {
      return getGroup({ groupId }).then((res) => res.data);
    },
    enabled: !!groupId,
  });

  return { groupData, ...others };
};
