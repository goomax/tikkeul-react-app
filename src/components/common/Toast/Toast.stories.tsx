import type { Meta, StoryObj } from '@storybook/react';
import Toast from '.';

const meta: Meta<typeof Toast> = {
  title: 'Common/Toast',
  component: Toast,
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

export const Basic: StoryObj<typeof Toast> = {
  args: {
    message: '토스트 메시지입니다',
    type: 'success',
  },
  render: (args) => <Toast {...args} />,
};
