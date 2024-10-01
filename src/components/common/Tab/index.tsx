import { Tab, TabProps, Tabs, TabsProps, useTheme } from '@mui/material';

interface TabItemProps extends Omit<TabProps, 'label'> {
  label: string;
}

const TabWrapper = ({ children, sx, ...others }: TabsProps) => {
  const theme = useTheme();

  return (
    <Tabs
      centered
      textColor="inherit"
      sx={{
        height: '36px',
        maxHeight: '36px',
        minHeight: '36px',

        backgroundColor: theme.palette.grey[200],
        borderRadius: '20px',
        padding: '3.5px 0',

        '& .Mui-selected': {
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '20px',
        },

        '& .MuiTabs-indicator': {
          display: 'none',
        },
        ...sx,
      }}
      {...others}
    >
      {children}
    </Tabs>
  );
};

const TabItem = ({ label, sx, ...others }: TabItemProps) => {
  return <Tab label={label} sx={{ minHeight: '28px', height: '28px', ...sx }} {...a11yProps(label)} {...others} />;
};

function a11yProps(label: string) {
  return {
    id: `simple-tab-${label}`,
    'aria-controls': `simple-tabpanel-${label}`,
  };
}

export default {
  Wrapper: TabWrapper,
  Item: TabItem,
};
