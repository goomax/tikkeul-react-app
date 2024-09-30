import { useState } from 'react';

const useDraggable = () => {
  const [isDraggable, setIsDraggable] = useState(false);

  const onDraggable = () => setIsDraggable(true);
  const onDisDraggable = () => setIsDraggable(false);

  return { isDraggable, onDraggable, onDisDraggable };
};

export default useDraggable;
