import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import { QUERY_PARAM_KEY } from '@/constants/key';
import { useQueryString } from '@/hooks';

import { useImportQuery } from '@/queries/useImportQuery';
import { Helmet } from 'react-helmet';
import CourseResult from '@/components/CourseResult';

const SharePage = () => {
  const { getParams } = useQueryString();
  const token = getParams(QUERY_PARAM_KEY.TOKEN) ?? '';
  const { shareData } = useImportQuery({ token });

  return (
    <>
      <Helmet>
        <title>{shareData?.name || '공유된 코스'}</title>
        <meta property="og:title" content={`티끌모아강원 | ${shareData?.name}`} />
        <meta property="og:description" content={shareData?.courseDescription || '추천 여행 코스입니다!'} />
        <meta property="og:image" content={shareData?.courseDetails[0]?.photoUrl || '/logo.png'} />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <PageTransformWrapper>{shareData && <CourseResult tourData={shareData} />}</PageTransformWrapper>
    </>
  );
};

export default SharePage;
