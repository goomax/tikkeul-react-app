import { SVGProps } from 'react';

const Add = ({ svgProps, pathProps }: { svgProps?: SVGProps<SVGSVGElement>; pathProps?: SVGProps<SVGPathElement> }) => {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path d="M7 1V13" stroke="#666666" strokeLinecap="round" {...pathProps} />
      <path d="M13 7L1 7" stroke="#666666" strokeLinecap="round" {...pathProps} />
    </svg>
  );
};

export default Add;
