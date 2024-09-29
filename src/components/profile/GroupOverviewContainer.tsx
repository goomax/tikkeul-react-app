import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { Avatar, Box, Stack, useTheme } from '@mui/material';

const GroupOverviewContainer = () => {
  const theme = useTheme();
  const { userData } = useGetUserQuery();

  return (
    <Box
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
          padding: '12px 14px',
        }}
      >
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" width="100%" sx={{}}>
          <Typography bold fontSize={14}>
            참여 그룹
          </Typography>
          <Button variant="outlined" shape="circle" sx={{ fontSize: '10px' }}>
            편집하기 &gt;
          </Button>
        </Stack>
        <Stack width="100%">
          {userData?.groups.map((group) => {
            return (
              <Stack
                key={group.groupId}
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
                  {group.groupName}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );
};

export default GroupOverviewContainer;
