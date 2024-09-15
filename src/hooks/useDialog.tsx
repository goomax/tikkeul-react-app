import { useState } from 'react';

const useDialog = (defaultValue = false) => {
  const [open, setOpen] = useState(defaultValue);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    onOpen,
    onClose,
  };
};

export default useDialog;
