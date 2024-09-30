import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';

const SpeechBubble = ({ children, arrow = 'left' }: PropsWithChildren<{ arrow?: 'left' | 'right' }>) => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundColor: 'white',
        padding: '12px 20px',
        borderRadius: '10px',
        maxWidth: '300px',
        width: 'fit-content',
        height: '36px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-5px',
          left: arrow === 'left' ? '10%' : '80%',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid white',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default SpeechBubble;
