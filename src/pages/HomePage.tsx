import FixedBottomCTA from '@/components/common/FixedBottomCTA';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import ProtectedContents from '@/components/hoc/ProtectedContents';
import {
  BannerContainer,
  HotRecommendContainer,
  LocationRecommendContainer,
  UserRecommendContainer,
} from '@/components/home';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useInternalRouter, useQueryString } from '@/hooks';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { useEffect } from 'react';

const HomePage = () => {
  const { userData, hasGroup, isLogin } = useGetUserQuery();
  const { getParams, setParams } = useQueryString();
  const groupId = getParams(QUERY_PARAM_KEY.GROUP_ID);
  const router = useInternalRouter();

  useEffect(() => {
    if (!groupId && hasGroup && userData?.groups) {
      const lastGroupIndex = userData.groups.length - 1;

      setParams(QUERY_PARAM_KEY.GROUP_ID, String(userData.groups[lastGroupIndex].groupId));
    }
  }, [groupId, userData, isLogin, hasGroup]);

  return (
    <PageTransformWrapper>
      <BannerContainer />
      <ProtectedContents
        hide={!hasGroup}
        alt={
          isLogin ? (
            <FixedBottomCTA
              fullWidth
              onClick={() => {
                router.push('/headcount-form');
              }}
            >
              그룹 생성하러가기
            </FixedBottomCTA>
          ) : null
        }
      >
        <UserRecommendContainer />
      </ProtectedContents>
      <HotRecommendContainer />
      <LocationRecommendContainer />
    </PageTransformWrapper>
  );
};

export default HomePage;
