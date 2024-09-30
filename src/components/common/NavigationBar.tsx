import { SVGProps, MouseEvent } from 'react';
import { Box, Dialog, DialogContent, Stack, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Heart, Home, Map, User } from '../icons';
import Typography from './Typography';
import { useGetUserQuery } from '@/queries/useGetUserQuery';
import { useDialog, useInternalRouter } from '@/hooks';
import Button from './Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
const navItems = [
  {
    path: '/',
    icon: Home,
    label: '홈',
    withAuth: false,
  },
  {
    path: '/favorites',
    icon: Heart,
    label: '찜',
    withAuth: true,
  },
  {
    path: '/my-course',
    icon: Map,
    label: '내 코스',
    withAuth: true,
  },
  {
    path: '/profile',
    icon: User,
    label: '마이',
    withAuth: true,
  },
] as const;

const NavigationBar = () => {
  const router = useInternalRouter();
  const { isLogin, hasGroup } = useGetUserQuery();
  const { open: openAuth, onClose: onCloseAuth, onOpen: onOpenAuth } = useDialog(false);
  const { open: openGroup, onClose: onCloseGroup, onOpen: onOpenGroup } = useDialog(false);

  const onClickNav = (navItem: (typeof navItems)[number]) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (navItem.withAuth && !isLogin) {
      e.preventDefault();
      onOpenAuth();
    } else if (isLogin && !hasGroup) {
      e.preventDefault();
      onOpenGroup();
    } else {
      router.push(navItem.path);
    }
  };

  return (
    <>
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '68px',
          backgroundColor: '#ffffff',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        {navItems.map((navItem) => {
          return (
            <NavLink
              key={navItem.label}
              to={navItem.path}
              onClick={onClickNav(navItem)}
              children={({ isActive }) => <NavItem label={navItem.label} Icon={navItem.icon} isActive={isActive} />}
            />
          );
        })}
      </Box>
      <Dialog open={openAuth} onClose={onCloseAuth}>
        <DialogContent>
          <Stack justifyContent="center" alignItems="center" gap="8px">
            <img src="/login.png" width={147} height={147} alt="earth" />
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize={14} bold>
                간단하게 회원가입하고
              </Typography>
              <Typography fontSize={14} bold>
                나에게 맞는 맞춤 코스를 확인해보세요!
              </Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize={10} color="grey">
                취향 유형 검사를 통해 내 여행 유형을 분석 받아보고
              </Typography>
              <Typography fontSize={10} color="grey">
                더욱 나에게 맞는 여행을 경험해 보실 수 있어요:)
              </Typography>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap="2px">
              <InfoOutlinedIcon
                sx={{
                  color: 'grey.400',
                  width: '12px',
                }}
              />
              <Typography fontSize={10} color="grey">
                가입하지 않으시면 제공 중인 서비스를 이용하실 수 없어요
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <Stack
          justifyContent="center"
          alignItems="center"
          gap="8px"
          sx={{
            marginBottom: '20px',
          }}
        >
          <Button
            onClick={() => {
              router.push('/login');
              onCloseAuth();
            }}
          >
            맞춤 여행하러 가기
          </Button>
        </Stack>
      </Dialog>
      <Dialog open={openGroup} onClose={onCloseGroup}>
        <DialogContent>
          <Stack justifyContent="center" alignItems="center" gap="8px">
            <img src="/login.png" width={147} height={147} alt="earth" />
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize={14} bold>
                그룹이 없어요!
              </Typography>
              <Typography fontSize={14} bold>
                그룹을 만들어야 코스를 생성할 수 있어요
              </Typography>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
              <Typography fontSize={10} color="grey">
                취향 유형 검사를 통해 내 여행 유형을 분석 받아보고
              </Typography>
              <Typography fontSize={10} color="grey">
                더욱 나에게 맞는 여행을 경험해 보실 수 있어요:)
              </Typography>
            </Stack>

            <Stack flexDirection="row" alignItems="center" gap="2px">
              <InfoOutlinedIcon
                sx={{
                  color: 'grey.400',
                  width: '12px',
                }}
              />
              <Typography fontSize={10} color="grey">
                그룹 생성 후에 이용 가능한 서비스입니다
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <Stack
          justifyContent="center"
          alignItems="center"
          gap="8px"
          sx={{
            marginBottom: '20px',
          }}
        >
          <Button
            onClick={() => {
              router.push('/headcount-form');
              onCloseGroup();
            }}
          >
            그룹 만들러 가기
          </Button>
        </Stack>
      </Dialog>
    </>
  );
};

export default NavigationBar;

const NavItem = ({
  label,
  Icon,
  isActive,
}: {
  label: string;
  Icon: (props: { pathProps?: SVGProps<SVGPathElement> }) => JSX.Element;
  isActive: boolean;
}) => {
  const theme = useTheme();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        ...(isActive ? { color: theme.palette.primary.main } : { color: '#CCCCCC' }),
      }}
    >
      <Icon
        pathProps={{
          ...(isActive ? { stroke: theme.palette.primary.main } : {}),
        }}
      />
      <Typography fontSize={12} {...(isActive ? { bold: true, color: 'primary' } : { color: 'grey' })}>
        {label}
      </Typography>
    </Stack>
  );
};
