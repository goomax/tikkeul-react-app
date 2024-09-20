import { StoryObj } from '@storybook/react';
import ShoppingCart from '@/components/icons/ShoppingCart';
import IconButton, { IconButtonProps } from '.';

export default {
  title: 'Common/IconButton',
  component: IconButton,
  tags: ['autodocs'],
};

export const PrimaryIconButton: StoryObj<IconButtonProps> = {
  args: {
    disabled: false,
    textBadge: '3',
    children: <ShoppingCart />,
  },

  render: (args) => <IconButton {...args} />,
};
