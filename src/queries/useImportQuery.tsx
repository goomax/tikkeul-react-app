import { importCourse } from '@/apis/group';
import { QUERY_KEY } from '@/constants/key';
import { useQuery } from '@tanstack/react-query';

export const useImportQuery = ({ token }: Parameters<typeof importCourse>[0]) => {
  const { data: shareData, ...others } = useQuery({
    queryKey: [QUERY_KEY.IMPORT, token],
    queryFn: () => {
      return importCourse({ token }).then((res) => res.data);
    },
    enabled: !!token,
  });

  return { shareData, ...others };
};
