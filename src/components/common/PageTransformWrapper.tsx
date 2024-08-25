import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

const PageTransformWrapper = ({ children }: PropsWithChildren) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};

export default PageTransformWrapper;
