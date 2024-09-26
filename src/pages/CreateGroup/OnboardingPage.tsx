import Typography from '@/components/common/Typography';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Stack, Tooltip, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetCoursesByGroupQuery } from '@/queries/useGetCoursesByGroupQuery';
import { RecommendCourses } from '@/components/home';
import Button from '@/components/common/Button';

const OnboardingPage = () => {
  const theme = useTheme();
  const { courseList } = useGetCoursesByGroupQuery({ groupId: Number(1), type: 'recommend' });

  return (
    <>
      <Stack sx={{ padding: '28px 14px' }}>
        <Typography fontSize={16} color="secondary" bold>
          김티끌 님의 취향에 따라
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
              expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.background.default }} />} // 원하는 색상으로 변경
              aria-controls="panel1-content"
              id="panel1-header"
            >
              당신은 열정적인 활동가형!
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit
              leo lobortis eget.
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
              열정적인 활동가
            </Typography>
            의 맞춤 코스를 저장하고
          </Typography>
          <Typography fontSize={16} bold>
            나중에 둘러보세요
          </Typography>
        </div>
        <RecommendCourses courses={courseList} />

        <Stack gap="10px">
          <Button>더 많은 코스 둘러보기</Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: theme.palette.background.default,
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
