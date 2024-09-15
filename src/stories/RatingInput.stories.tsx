import RatingInput from '@/components/RatingInput';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Module/RatingInput',
  component: RatingInput,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof RatingInput> = {
  render: () => <RatingInput label="선호도" helperText="별점을 선택해주세요" />,
};
