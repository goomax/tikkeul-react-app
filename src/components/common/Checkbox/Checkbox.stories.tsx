import { StoryObj } from '@storybook/react';
import Checkbox, { CheckboxProps } from '.';

export default {
  title: 'Common/Checkbox',
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
  render: (args) => <Checkbox {...args} />,
};
