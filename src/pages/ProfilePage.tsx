import Button from '@/components/common/Button';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import Typography from '@/components/common/Typography';
import { useInternalRouter } from '@/hooks';
import { Avatar, Stack, useTheme } from '@mui/material';

const ProfilePage = () => {
  const theme = useTheme();
  const router = useInternalRouter();

  const onClickRetest = () => {
    router.push('/headcount-form');
  };

  return (
    <PageTransformWrapper>
      <Stack
        sx={{
          backgroundColor: theme.palette.primary.main,
          padding: '19px 14px ',
          borderRadius: '0 0 10px 10px',
        }}
      >
        <Typography bold fontSize={16} color="white" mb="20px">
          마이페이지
        </Typography>
        <Stack gap="12px" alignItems="space-between">
          <Stack
            height="125px"
            gap="16px"
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: '4px', padding: '12px 14px' }}
          >
            <Stack>
              <Typography fontSize={16} bold>
                김티끌님
              </Typography>
              <Typography fontSize={10} bold color="grey">
                ticklemoa@naver.com
              </Typography>
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                padding: '8.5px 14px',
                backgroundColor: theme.palette.grey[100],
                borderRadius: '4px',
              }}
            >
              <Stack flexDirection="row" alignItems="center" gap="4px">
                <Avatar sx={{ width: '24px', height: '24px' }} />
                <Typography fontSize={12} bold color="grey">
                  열정적인 활동가형
                </Typography>
              </Stack>
              <Button
                shape="circle"
                color="secondary"
                sx={{
                  width: '90px',
                  height: '26px',
                  fontSize: '10px',
                  padding: 0,
                }}
                onClick={onClickRetest}
              >
                다시 테스트하기
              </Button>
            </Stack>
          </Stack>
          <Stack
            height="45px"
            sx={{ backgroundColor: theme.palette.background.default, borderRadius: '4px', padding: '12px 14px' }}
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography fontSize={14}>나의 모든 리워드</Typography>
            <Typography fontSize={14} bold>
              3200p
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          padding: '28px 14px',
        }}
      >
        <Stack
          alignItems="center"
          bgcolor={theme.palette.background.default}
          sx={{
            borderRadius: '4px',
            boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
          }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            sx={{
              padding: '12px 14px',
            }}
          >
            <Typography bold fontSize={14}>
              참여 그룹
            </Typography>
            <Button variant="outlined" shape="circle" sx={{ fontSize: '10px' }}>
              편집하기 &gt;
            </Button>
          </Stack>
          <Stack width="100%">
            {['바다를 사랑하는 대문자 E의 모임', '먹기 위한 여행을 즐기는 여행가들'].map((group) => {
              return (
                <Stack
                  key={group}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="12px"
                  sx={{
                    padding: '10px 14px',
                  }}
                  width="100%"
                >
                  <Avatar sx={{ width: '40x', height: '40px' }} />
                  <Typography fontSize={12} color="grey">
                    {group}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <Button
          disabled
          variant="outlined"
          sx={{
            marginTop: '40px',
          }}
        >
          회원 탈퇴
        </Button>
      </Stack>
    </PageTransformWrapper>
  );
};

export default ProfilePage;
