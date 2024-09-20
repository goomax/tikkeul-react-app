import { StoryObj } from '@storybook/react';
import Chip, { ChipProps } from '.';

export default {
  title: 'Common/Chip',
  component: Chip,
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

export const PrimaryChip: StoryObj<ChipProps> = {
  args: {
    color: 'primary',
    label: '2.8km',
    radiusVariant: 'half',
  },
};
