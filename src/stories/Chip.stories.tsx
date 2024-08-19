import Chip, { ChipProps } from '@/components/common/Chip';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Example/Chip',
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
