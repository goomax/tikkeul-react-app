import { PropsWithChildren, ReactNode } from 'react';

const ProtectedContents = ({ hide, children, alt }: PropsWithChildren<{ hide: boolean; alt?: ReactNode }>) => {
  if (hide && alt === undefined) {
    return null;
  }

  if (hide && alt) {
    return <>{alt}</>;
  }

  return <>{children}</>;
};

export default ProtectedContents;
