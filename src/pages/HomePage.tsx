import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import {
  BannerContainer,
  HotRecommendContainer,
  LocationRecommendContainer,
  UserRecommendContainer,
} from '@/components/home';

const HomePage = () => {
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
