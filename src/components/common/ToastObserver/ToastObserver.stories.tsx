import type { Meta, StoryObj } from '@storybook/react';
import { GlobalPortal } from '@/GlobalProtal';
import Button from '@/components/common/Button';
import ToastsObserver from '.';
import { notifyToast } from '@/utils/subject';

const meta: Meta<typeof ToastsObserver> = {
  title: 'Common/ToastsObserver',
  component: ToastsObserver,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['success', 'error'],
    },
    message: {
      control: 'text',
      defaultValue: '토스트 메시지',
    },
  },
};

export default meta;

export const Basic: StoryObj<Parameters<typeof notifyToast>[0]> = {
  args: {
    message: '토스트 메시지입니다',
    type: 'success',
  },
  render: (args) => (
    <GlobalPortal.Provider>
      <div style={{ height: '500px' }}>
        <Button
          onClick={() =>
            notifyToast({
              message: args.message,
              type: args.type,
            })
          }
        >
          트리거
        </Button>
        <ToastsObserver />
      </div>
    </GlobalPortal.Provider>
  ),
};
