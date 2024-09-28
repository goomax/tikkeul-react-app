import { Ref, forwardRef } from 'react';

import Button, { ButtonProps } from '@/components/common/Button';
import { GlobalPortal } from '@/GlobalProtal';
import { Box } from '@mui/material';

const FixedBottomCTA = forwardRef(function FixedBottomCTA(props: ButtonProps, forwardedRef: Ref<HTMLButtonElement>) {
  return (
    <GlobalPortal.Consumer>
      <Box
        sx={{
          position: 'fixed',
          left: 0,
          bottom: 60,
          width: '100%',
        }}
      >
        <Box
          sx={{
            padding: '0 20px 18px',
          }}
        >
          <Button {...props} ref={forwardedRef} data-testid="cta" />
        </Box>
      </Box>
    </GlobalPortal.Consumer>
  );
});

export default FixedBottomCTA;
