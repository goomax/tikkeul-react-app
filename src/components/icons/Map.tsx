import { SVGProps } from 'react';

const Map = ({ svgProps, pathProps }: { svgProps?: SVGProps<SVGSVGElement>; pathProps?: SVGProps<SVGPathElement> }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M15 6V21M15 6L21 3V18L15 21M15 6L9 3M15 21L9 18M9 18L3 21V6L9 3M9 18V3"
        stroke="#CCCCCC"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </svg>
  );
};

export default Map;
