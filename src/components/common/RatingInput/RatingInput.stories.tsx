import { StoryObj } from '@storybook/react';
import RatingInput from '.';

export default {
  title: 'Common/RatingInput',
  component: RatingInput,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof RatingInput> = {
  args: {
    label: '선호도',
    helperText: '별점을 선택해주세요',
  },
  render: (args) => <RatingInput {...args} />,
};
