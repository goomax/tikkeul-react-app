import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import { useInternalRouter } from '@/hooks';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { Avatar, Stack, useTheme } from '@mui/material';

const UserOverviewContainer = () => {
  const theme = useTheme();
  const router = useInternalRouter();
  const { userData, currentGroup } = useGetUserQuery();

  const onClickRetest = () => {
    router.push('/headcount-form');
  };

  return (
    <Stack
      sx={{
        backgroundColor: theme.palette.primary.main,
        padding: '19px 14px',
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
              {userData?.name} 님
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
                {currentGroup?.groupName}형
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
  );
};

export default UserOverviewContainer;
