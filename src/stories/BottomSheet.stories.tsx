import type { Meta, StoryObj } from '@storybook/react';

import { GlobalPortal } from '@/GlobalProtal';
import { BottomSheet } from '@/components/BottomSheet';
import Typography from '@/components/common/Typography';
import Button from '@/components/common/Button';

const meta: Meta<typeof BottomSheet> = {
  title: 'Module/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
};

export default meta;

export const Basic: StoryObj<typeof BottomSheet> = {
  args: {
    open: true,
    header: '제목',
    children: (
      <>
        <Typography>내용</Typography>
        <Button fullWidth={true}>확인</Button>
      </>
    ),
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <div style={{ height: '500px' }}>
        <BottomSheet {...args}>{args.children}</BottomSheet>
      </div>
    </GlobalPortal.Provider>
  ),
};
