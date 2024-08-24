// Icons.stories.tsx
import * as Icons from '@/components/icons';

export default {
  title: 'Example/Icons',
  component: Icons.Add,
};

export const AllIcons = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
      {Object.keys(Icons).map((iconName) => {
        const IconComponent = Icons[iconName as keyof typeof Icons];

        return (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
            }}
          >
            <IconComponent pathProps={{ stroke: '#CCCCCC' }} circleProps={{ stroke: '#CCCCCC' }} />
            <span>{iconName}</span>
          </div>
        );
      })}
    </div>
  );
};