import { SVGProps } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Heart, Home, Map, User } from '../icons';

const navItems = [
  {
    path: '/',
    icon: Home,
    label: '홈',
  },
  {
    path: '/favorites',
    icon: Heart,
    label: '찜',
  },
  {
    path: '/my-course',
    icon: Map,
    label: '내 코스',
  },
  {
    path: '/profile',
    icon: User,
    label: '마이',
  },
];

const NavigationBar = () => {
  return (
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
            children={({ isActive }) => <NavItem label={navItem.label} Icon={navItem.icon} isActive={isActive} />}
          />
        );
      })}
    </Box>
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
      {label}
    </Stack>
  );
};
