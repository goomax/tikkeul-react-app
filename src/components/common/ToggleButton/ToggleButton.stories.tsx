import { StoryObj } from '@storybook/react';
import ToggleButton from '.';

export default {
  title: 'Common/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
};

export const PrimaryImage: StoryObj<typeof ToggleButton> = {
  args: {
    children: '토글버튼',
    selected: true,
    color: 'primary',
  },
  render: (args) => <ToggleButton {...args} />,
};
