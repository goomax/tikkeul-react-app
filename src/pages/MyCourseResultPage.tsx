import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import { useGetGroupQuery } from '@/queries/useGetGroupQuery';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import CourseResult from '@/components/CourseResult';

const MyCourseResultPage = () => {
  const { currentGroup } = useGetUserQuery();
  const { groupData } = useGetGroupQuery({ groupId: Number(currentGroup?.groupId) });

  return <PageTransformWrapper>{groupData && <CourseResult tourData={groupData} />}</PageTransformWrapper>;
};

export default MyCourseResultPage;
