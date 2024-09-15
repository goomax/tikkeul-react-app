import Ticket from '@/components/Ticket';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Module/Ticket',
  component: Ticket,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof Ticket> = {
  render: () => (
    <Ticket.Wrapper>
      <Ticket.Header
        label="열정적인 활동가에게 추천하는"
        title="산에서 한적하게 맛집을 즐기는 휴양 여행"
        description="도심 속에서 시원한 공기와 미식 여행을 할 수 있는 곳"
      />
      <Ticket.Bottom
        images={[
          'https://picsum.photos/80',
          'https://picsum.photos/80',
          'https://picsum.photos/80',
          'https://picsum.photos/80',
          'https://picsum.photos/80',
        ]}
      />
    </Ticket.Wrapper>
  ),
};
