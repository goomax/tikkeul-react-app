import { StoryObj } from '@storybook/react';
import Button, { ButtonProps } from '@/components/common/Button';

export default {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'radio',
      },
      options: ['contained', 'text', 'outlined'],
    },
  },
};

export const PrimaryButton: StoryObj<ButtonProps> = {
  args: {
    variant: 'contained',
    color: 'primary',
    disabled: false,
    children: '여행 시작하기',
  },
};
