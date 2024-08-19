import { StoryObj } from '@storybook/react';
import TextField, { TextFieldProps } from '@/components/common/TextField';

export default {
  title: 'Example/TextField',
  component: TextField,
  tags: ['autodocs'],
};

export const PrimaryButton: StoryObj<TextFieldProps> = {
  args: {
    label: '인원을 입력해 주세요',
    variant: 'standard',
    fullWidth: true,
    helperText: '미입력시 다음 단계로 넘어갈 수 없습니다.',
    error: false,
  },
};
