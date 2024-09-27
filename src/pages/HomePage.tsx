import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import ProtectedContents from '@/components/hoc/ProtectedContents';
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
  const { userData, hasGroup, isLogin } = useGetUserQuery();
  const { getParams, setParams } = useQueryString();
  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);

  useEffect(() => {
    if (!groupId && userData?.groups[0]) {
      setParams(QUERY_PARAM_KEY.GROUP_ID, String(userData.groups[0].groupId));
    }
  }, [groupId, userData, isLogin]);

  return (
    <PageTransformWrapper>
      <BannerContainer />
      <ProtectedContents hide={!hasGroup}>
        <UserRecommendContainer />
      </ProtectedContents>
      <HotRecommendContainer />
      <LocationRecommendContainer />
    </PageTransformWrapper>
  );
};

export default HomePage;
