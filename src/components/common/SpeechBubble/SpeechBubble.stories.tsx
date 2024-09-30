import { StoryObj } from '@storybook/react';
import SpeechBubble from '.';
import Typography from '../Typography';

export default {
  title: 'Common/SpeechBubble',
  component: SpeechBubble,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof SpeechBubble> = {
  args: {
    arrow: 'left',
    children: (
      <Typography color="primary" fontSize={12}>
        여행온 이상 숙소에서 잠만 자는 타입
      </Typography>
    ),
  },
  render: (args) => <SpeechBubble {...args} />,
};
