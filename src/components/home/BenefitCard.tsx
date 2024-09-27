import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import Chip from '../common/Chip';
import IconButton from '../common/IconButton';
import { Close } from '../icons';
import Button from '../common/Button';
import { formatTimeRemaining } from '@/utils/dateHelper';
import Typography from '../common/Typography';
import { useRequestAnimationFrame } from '@/hooks';
import { motion } from 'framer-motion';
import { DUMMY_OF_BENEFITS } from '@/constants/dummy';

interface BenefitCardProps {
  benefit: (typeof DUMMY_OF_BENEFITS)[number];
  onClose: (benefitId: string) => void;
}

const BenefitCard = ({ benefit, onClose }: BenefitCardProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useRequestAnimationFrame(() => {
    if (!benefit.isClear) {
      setTimeRemaining(formatTimeRemaining(benefit.deadline));
    }
  }, [benefit.isClear]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Box
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
            <Chip radiusVariant="square" color="default" label={benefit.type} />
            <IconButton
              onClick={() => {
                onClose(benefit.id);
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
            <Typography fontSize={12} bold noWrap>
              {benefit.title}
            </Typography>
            <Typography fontSize={10} color="grey">
              {benefit.description}
            </Typography>
          </Stack>
          <Button sx={{ height: '34px' }} disabled={benefit.isClear}>
            {benefit.isClear ? '참여 완료' : `${timeRemaining} 남음`}
          </Button>
        </Stack>
      </Box>
    </motion.div>
  );
};

export default BenefitCard;
