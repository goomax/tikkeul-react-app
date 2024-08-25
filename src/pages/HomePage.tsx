import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import BannerContainer from '@/components/home/BannerContainer';
import HotRecommendContainer from '@/components/home/HotRecommendContainer';
import LocationRecommendContainer from '@/components/home/LocationRecommendContainer';
import UserRecommendContainer from '@/components/home/UserRecommendContainer';

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
