import { PropsWithChildren } from 'react';

const ProtectedContents = ({ hide, children }: PropsWithChildren<{ hide: boolean }>) => {
  if (hide) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedContents;
