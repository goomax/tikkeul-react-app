import { StoryObj } from '@storybook/react';
import Checkbox, { CheckboxProps } from '@/components/common/Checkbox';

export default {
  title: 'Example/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: {
        type: 'radio',
      },
      options: ['primary', 'secondary', 'default'],
    },
  },
};

export const PrimaryCheckbox: StoryObj<CheckboxProps> = {
  args: {
    color: 'primary',
    disabled: false,
    checked: true,
    label: '라벨',
  },
};
