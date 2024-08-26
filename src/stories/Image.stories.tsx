import Image, { ImageProps } from '@/components/common/Image';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Example/Image',
  component: Image,
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
