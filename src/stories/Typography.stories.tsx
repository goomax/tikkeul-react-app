import Typography from '@/components/common/Typography';
import { Divider } from '@mui/material';

export default {
  title: 'Common/Typography',
  component: Typography,
  tags: ['autodocs'],
};

const colors = ['primary', 'secondary', 'dark', 'grey', 'white'] as const;
const bolds = [true, false] as const;

export const AllTypography: React.FC = () => {
  return (
    <div>
      {colors.map((color) =>
        bolds.map((bold, index) => (
          <div
            key={`${color}-${bold}-${index}`}
            style={{ marginBottom: '8px', ...(color === 'white' ? { backgroundColor: 'black' } : {}) }}
          >
            <Typography fontSize={26} color={color} bold={bold}>
              {`Typography: color-${color}, bold-${bold}, fontSize-26`}
            </Typography>
          </div>
        )),
      )}
      <Divider sx={{ margin: '20px 0' }} />

      {colors.map((color) => (
        <div
          key={`${color}`}
          style={{ marginBottom: '8px', ...(color === 'white' ? { backgroundColor: '#777' } : {}) }}
        >
          <Typography color="dark" fontSize={20}>
            Typography Inline Example:{' '}
            <Typography inline bold color={color}>
              color-{color}, bold-true, fontSize-20
            </Typography>
          </Typography>
        </div>
      ))}
    </div>
  );
};
