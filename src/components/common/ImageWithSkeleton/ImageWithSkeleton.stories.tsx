import { StoryObj } from '@storybook/react';
import ImageWithSkeleton, { ImageProps } from '.';

export default {
  title: 'Common/ImageWithSkeleton',
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
  render: (args) => <ImageWithSkeleton {...args} />,
};
