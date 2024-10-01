import { useState, SyntheticEvent } from 'react';

const useTab = <T,>(initialValue: T) => {
  const [tab, setTab] = useState<T>(initialValue);

  const onChangeTab = (_: SyntheticEvent, newValue: T) => {
    setTab(newValue);
  };

  return { tab, onChangeTab };
};

export default useTab;
