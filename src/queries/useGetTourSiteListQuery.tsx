import { getTourSiteList } from '@/apis/course';
import { QUERY_KEY } from '@/constants/key';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetTourSiteListQuery = (params: Parameters<typeof getTourSiteList>[0]) => {
  const { data: tourSiteData = [], ...others } = useSuspenseQuery({
    queryKey: [QUERY_KEY.TOURSITES, params],
    queryFn: () => {
      return getTourSiteList(params).then((res) => res.data.tourSiteList);
    },
  });

  return { tourSiteData, ...others };
};
