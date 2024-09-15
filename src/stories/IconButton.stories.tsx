import { StoryObj } from '@storybook/react';
import IconButton, { IconButtonProps } from '@/components/common/IconButton';
import ShoppingCart from '@/components/icons/ShoppingCart';

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
};
