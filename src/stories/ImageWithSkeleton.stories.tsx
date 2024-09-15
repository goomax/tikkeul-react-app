import ImageWithSkeleton, { ImageProps } from '@/components/common/ImageWithSkeleton';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Example/ImageWithSkeleton',
  component: ImageWithSkeleton,
  tags: ['autodocs'],
};

export const PrimaryImage: StoryObj<ImageProps> = {
  args: {
    variant: 'rectangular',
    src: 'https://picsum.photos/200',
    width: 200,
    height: 200,
    alt: '샘플이미지',
  },
};
