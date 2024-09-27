import { getGroup } from '@/apis/group';
import { QUERY_KEY } from '@/constants/key';
import { Group } from '@/schemas/types';
import { useQuery } from '@tanstack/react-query';

export const useGetGroupQuery = ({ groupId }: Parameters<typeof getGroup>[0]) => {
  const { data: groupData, ...others } = useQuery({
    queryKey: [QUERY_KEY.GROUP, groupId],
    queryFn: () => {
      return getGroup({ groupId }).then((res) => res.data);
    },
    enabled: !!groupId,
    select: (data) => {
      const groupedDetails = data.courseDetails.reduce(
        (acc: Record<number, Group['courseDetails'][number][]>, detail) => {
          if (!acc[detail.day]) acc[detail.day] = [];
          acc[detail.day].push(detail);
          return acc;
        },
        {},
      );

      const sortedDetails = Object.keys(groupedDetails)
        .sort((a, b) => Number(a) - Number(b))
        .map((day) => groupedDetails[Number(day)]);

      return { ...data, courseDetails: sortedDetails };
    },
  });

  return { groupData, ...others };
};
