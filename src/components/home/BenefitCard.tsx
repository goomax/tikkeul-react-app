import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Chip from '../common/Chip';
import IconButton from '../common/IconButton';
import { Close } from '../icons';
import Button from '../common/Button';
import { GetBenefitResponse } from '@/types/apiResponse';
import { formatTimeRemaining } from '@/utils/dateHelper';

interface BenefitCardProps {
  benefit: GetBenefitResponse['data'][number] & { isClose: boolean };
  onClose: (benefitId: string) => void;
}

const BenefitCard = ({ benefit, onClose }: BenefitCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    let animationFrameId: number;

    const updateTimer = () => {
      setTimeRemaining(formatTimeRemaining(benefit.deadline));
      animationFrameId = requestAnimationFrame(updateTimer);
    };

    updateTimer();

    return () => cancelAnimationFrame(animationFrameId);
  }, [benefit]);

  return (
    <Box
      key={benefit.key}
      sx={{
        minWidth: '188px',
        height: '135px',
        padding: '8px 14px',
        boxShadow: '0 6px 10px 0 rgba(0, 0, 0, 0.12)',
        backgroundColor: 'white',
        borderRadius: '8px',
      }}
    >
      <Stack gap="16px">
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
          <Chip
            radiusVariant="square"
            color="default"
            sx={{
              width: '56px',
              height: '19px',
              fontSize: '10px',
              '& .MuiChip-label': {
                padding: '1px',
              },
            }}
            label={benefit.type}
          />
          <IconButton
            onClick={() => {
              onClose(benefit.key);
            }}
            sx={{
              height: '20px',
              width: '20px',
              padding: 0,
            }}
          >
            <Close />
          </IconButton>
        </Stack>
        <Stack gap="4px" height="34px">
          <Typography
            fontSize="12px"
            fontWeight="bold"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {benefit.title}
          </Typography>
          <Typography fontSize="10px">{benefit.description}</Typography>
        </Stack>
        <Button sx={{ height: '34px' }} disabled={benefit.isClear}>
          {benefit.isClear ? '참여 완료' : `${timeRemaining} 남음`}
        </Button>
      </Stack>
    </Box>
  );
};

export default BenefitCard;
