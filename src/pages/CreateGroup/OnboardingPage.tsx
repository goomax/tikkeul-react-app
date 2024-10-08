import Typography from '@/components/common/Typography';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  CircularProgress,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetCoursesByGroupQuery } from '@/queries/useGetCoursesByGroupQuery';
import { RecommendCourses } from '@/components/home';
import Button from '@/components/common/Button';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { useInternalRouter } from '@/hooks';
import SpeechBubble from '@/components/common/SpeechBubble';

const OnboardingPage = () => {
  const theme = useTheme();
  const router = useInternalRouter();
  const { userData, isLoading: getUserLoading, currentGroup } = useGetUserQuery();

  const { courseList, isLoading: getCoursesLoading } = useGetCoursesByGroupQuery({
    groupId: Number(currentGroup?.groupId),
    type: 'recommend',
  });

  if (getUserLoading || getCoursesLoading) {
    return (
      <Stack sx={{ padding: '28px 14px' }}>
        <Typography fontSize={16} color="secondary" bold>
          간편하고 쉬운 여행의 시작
        </Typography>
        <Typography fontSize={16}>맞춤 코스를 찾는 중입니다</Typography>
        <Typography fontSize={12} sx={{ marginBottom: '50px' }} color="grey">
          조금만 기다려 주세요:)
        </Typography>
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress color="secondary" />
        </Stack>
      </Stack>
    );
  }

  return (
    <>
      <Stack sx={{ padding: '28px 14px' }}>
        <Typography fontSize={16} color="secondary" bold>
          {userData?.name} 님의 취향에 따라
        </Typography>
        <Typography fontSize={16}>맞춤 코스를 찾아 왔어요!</Typography>
        <Typography fontSize={12} sx={{ marginBottom: '50px' }} color="grey">
          입력하신 취향에 기반한 유형별 맞춤 코스 입니다.
        </Typography>
        <Tooltip
          title="누르고 유형 설명 보기"
          placement="top-start"
          open
          arrow
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, -4],
                  },
                },
              ],
            },
            tooltip: {
              sx: {
                backgroundColor: theme.palette.grey[400],
              },
            },
            arrow: {
              sx: {
                color: theme.palette.grey[400],
              },
            },
          }}
        >
          <Accordion
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.background.default }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              당신은 {currentGroup?.groupName}!
            </AccordionSummary>
            <AccordionDetails>
              <Stack justifyContent="center" alignItems="center" gap="20px">
                <Stack justifyContent="center" alignItems="center">
                  <Typography color="white" fontSize={12}>
                    {userData?.name} 님의 취향 테스트 결과
                  </Typography>
                  <Typography color="white" fontSize={16} bold>
                    해가 뜨나 달이 뜨나
                  </Typography>
                  <Typography color="white" fontSize={16} bold>
                    {currentGroup?.groupName.split(' ')[0]} 타입
                  </Typography>
                </Stack>
                <Stack gap={'15px'} width="100%" justifyContent="center" alignItems="center">
                  <SpeechBubble>
                    <Typography color="primary" fontSize={12}>
                      여행온 이상 숙소에서 잠만 자는 타입
                    </Typography>
                  </SpeechBubble>
                  <SpeechBubble arrow="right">
                    <Typography color="primary" fontSize={12}>
                      식당 찾아 삼만리도 괜찮은 타입
                    </Typography>
                  </SpeechBubble>
                  <SpeechBubble>
                    <Typography color="primary" fontSize={12}>
                      밖에 나가지 않고 못 견디는 타입
                    </Typography>
                  </SpeechBubble>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Tooltip>
      </Stack>
      <Stack
        gap="16px"
        sx={{ padding: '28px 14px 100px 14px', backgroundColor: alpha(theme.palette.primary.light, 0.1) }}
      >
        <div>
          <Typography fontSize={16} bold>
            <Typography inline color="secondary">
              {currentGroup?.groupName}
            </Typography>
            의 맞춤 코스를 저장하고
          </Typography>
          <Typography fontSize={16} bold>
            나중에 둘러보세요
          </Typography>
        </div>
        <RecommendCourses courses={courseList} />

        <Stack gap="10px">
          <Button
            onClick={() => {
              router.replace(`/?groupId=${currentGroup?.groupId}`);
            }}
          >
            더 많은 코스 둘러보기
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.background.default,
            }}
            onClick={() => {
              router.replace('/headcount-form');
            }}
          >
            다시 선택하기
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default OnboardingPage;
