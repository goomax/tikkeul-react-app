import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import CourseOverviewContainer from '@/components/mycourse/CourseOverviewContainer';
import CourseDetailContainer from '@/components/mycourse/CourseDetailContainer';

const MyCoursePage = () => {
  return (
    <PageTransformWrapper>
      <CourseOverviewContainer />
      <CourseDetailContainer />
    </PageTransformWrapper>
  );
};

export default MyCoursePage;
