import { pickCourseToGroup } from '@/apis/group';
import { useInternalRouter } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './queryClient';
import { QUERY_KEY } from '@/constants/key';

export const usePickCourseToGroup = ({ groupId }: { groupId: number }) => {
  const router = useInternalRouter();

  const mutation = useMutation({
    mutationFn: (data: Parameters<typeof pickCourseToGroup>[0]) => pickCourseToGroup(data).then((res) => res.data),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: [QUERY_KEY.GROUP, groupId],
        })
        .then(() => {
          router.push(`/my-course`);
        });
    },
  });

  return mutation;
};
