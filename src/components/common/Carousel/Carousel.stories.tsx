import ImageWithSkeleton from '@/components/common/ImageWithSkeleton';
import { Box } from '@mui/material';
import { StoryObj } from '@storybook/react';
import Carousel from '.';

export default {
  title: 'Module/Carousel',
  component: Carousel,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof Carousel> = {
  render: () => {
    return (
      <Box width="400px">
        <Carousel gap="10px">
          {[
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
            'https://picsum.photos/200',
          ].map((src, index) => {
            return (
              <ImageWithSkeleton
                key={index}
                src={src}
                width={240}
                height={160}
                style={{
                  borderRadius: '5px',
                }}
              />
            );
          })}
        </Carousel>
      </Box>
    );
  },
};
