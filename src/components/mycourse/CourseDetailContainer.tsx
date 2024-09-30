import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import { useGetGroupQuery } from '@/queries/useGetGroupQuery';
import { Divider, Stack } from '@mui/material';
import { useInternalRouter, useToggle } from '@/hooks';
import { Fragment, useEffect } from 'react';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { mockArray } from '@/utils/generator';
import ProtectedContents from '@/components/hoc/ProtectedContents';
import { QUERY_PARAM_KEY } from '@/constants/key';
import Course from '@/components/mycourse/Course';

const CourseDetailContainer = () => {
  const router = useInternalRouter();
  const { currentGroup } = useGetUserQuery();

  const { groupData, refetch } = useGetGroupQuery({ groupId: Number(currentGroup?.groupId) });
  const { value: isEditMode, toggle } = useToggle({ initialValue: false });

  useEffect(() => {
    if (currentGroup?.groupId) {
      refetch();
    }
  }, [isEditMode, currentGroup?.groupId]);

  return (
    <Stack>
      <Stack flexDirection="row" justifyContent="flex-end" alignItems="center" sx={{ padding: '10px 14px ' }}>
        <Button variant="text" sx={{ fontSize: '10px' }} onClick={toggle}>
          {isEditMode ? '돌아가기 >' : '편집하기 >'}
        </Button>
      </Stack>
      {mockArray(groupData?.duration ?? 0).map((_, index) => {
        const day = index + 1;
        const dayCourse = groupData?.courseDetails.filter((detail) => detail.day === day);

        return (
          <Fragment key={day}>
            <Stack sx={{ padding: '8px 14px' }}>
              <Typography fontSize={12}>{day}일차</Typography>
              <Stack gap="12px">
                {isEditMode ? (
                  <Course.Editor day={day} dayCourse={dayCourse ?? []} />
                ) : (
                  <Course.Viewer day={day} dayCourse={dayCourse ?? []} />
                )}
              </Stack>
              <ProtectedContents hide={isEditMode}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    router.push(
                      `/search-form?${QUERY_PARAM_KEY.TARGET_ID}=${currentGroup?.groupId}&${QUERY_PARAM_KEY.TARGET_DAY}=${day}`,
                    );
                  }}
                >
                  장소 추가하기
                </Button>
              </ProtectedContents>
            </Stack>
            <ProtectedContents hide={day === groupData?.duration}>
              <Divider />
            </ProtectedContents>
          </Fragment>
        );
      })}

      <Stack sx={{ padding: '12px 14px 100px 14px' }}>
        <ProtectedContents hide={isEditMode}>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: '45px' }}
            onClick={() => {
              router.push(`/my-course-result?${QUERY_PARAM_KEY.DAY}=1`);
            }}
          >
            이대로 여행 시작하기
          </Button>
        </ProtectedContents>
      </Stack>
    </Stack>
  );
};

export default CourseDetailContainer;
