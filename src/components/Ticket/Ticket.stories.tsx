import Ticket from '@/components/Ticket';
import { StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default {
  title: 'Module/Ticket',
  component: Ticket,
  tags: ['autodocs'],
};

export const Basic: StoryObj<typeof Ticket> = {
  render: () => (
    <QueryClientProvider client={new QueryClient()}>
      <Ticket.Wrapper>
        <Ticket.Header
          label="열정적인 활동가에게 추천하는"
          title="산에서 한적하게 맛집을 즐기는 휴양 여행"
          description="도심 속에서 시원한 공기와 미식 여행을 할 수 있는 곳"
          coordinates={[
            { lat: 37.1507494904, lng: 129.2062296318 },
            { lat: 37.7726505813, lng: 128.9473504054 },
            { lat: 37.7071731576, lng: 128.7188396792 },
            { lat: 37.3664313199, lng: 128.3949124655 },
            { lat: 38.2188863049, lng: 128.5916575733 },
          ]}
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
    </QueryClientProvider>
  ),
};
