import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import {
  BannerContainer,
  HotRecommendContainer,
  LocationRecommendContainer,
  UserRecommendContainer,
} from '@/components/home';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useQueryString } from '@/hooks';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { useEffect } from 'react';

const HomePage = () => {
  const { userData } = useGetUserQuery();
  const { getParams, setParams } = useQueryString();
  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);

  useEffect(() => {
    if (!groupId && userData?.groupList[0]) {
      setParams(QUERY_PARAM_KEY.GROUP_ID, String(userData.groupList[0].groupId));
    }
  }, [groupId, userData]);

  return (
    <PageTransformWrapper>
      <BannerContainer />
      <UserRecommendContainer />
      <HotRecommendContainer />
      <LocationRecommendContainer />
    </PageTransformWrapper>
  );
};

export default HomePage;
