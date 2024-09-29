import Button from '@/components/common/Button';
import PageTransformWrapper from '@/components/common/PageTransformWrapper';
import GroupOverviewContainer from '@/components/profile/GroupOverviewContainer';
import UserOverviewContainer from '@/components/profile/UserOverviewContainer';
import { useLogoutMutation } from '@/queries/useLogoutMutation';
import { useWithdrawMutation } from '@/queries/useWithdrawMutation';
import { ButtonGroup } from '@mui/material';

const ProfilePage = () => {
  const { mutate: logoutMutate } = useLogoutMutation();
  const { mutate: withdrawMutate } = useWithdrawMutation();

  return (
    <PageTransformWrapper>
      <UserOverviewContainer />
      <GroupOverviewContainer />
      <ButtonGroup
        fullWidth
        sx={{
          padding: '10px 14px 100px 14px',
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            logoutMutate();
          }}
        >
          로그아웃
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            withdrawMutate();
          }}
        >
          회원 탈퇴
        </Button>
      </ButtonGroup>
    </PageTransformWrapper>
  );
};

export default ProfilePage;
