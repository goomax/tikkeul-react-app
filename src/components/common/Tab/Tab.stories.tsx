import { StoryObj } from '@storybook/react';
import { Stack } from '@mui/material';
import Tab from '.';
import { useTab } from '@/hooks';

const TABS = [
  { label: '숙소', value: 'lodging' },
  { label: '음식점', value: 'restaurant' },
  { label: '명소', value: 'activity' },
] as const;

type TabValue = (typeof TABS)[number]['value'];

export default {
  title: 'Common/Tab',
  component: Tab.Wrapper,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof Tab.Wrapper> = {
  render: () => {
    const { tab: currentTab, onChangeTab } = useTab<TabValue>(TABS[0].value);

    return (
      <Stack gap="16px">
        <Tab.Wrapper value={currentTab} onChange={onChangeTab}>
          {TABS.map((tab) => (
            <Tab.Item key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tab.Wrapper>
      </Stack>
    );
  },
};
