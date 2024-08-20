import { SVGProps } from 'react';

const Close = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1248 4.12996C13.307 3.94772 13.307 3.65224 13.1248 3.47C12.9425 3.28775 12.6471 3.28775 12.4648 3.47L8.29466 7.64014L4.12477 3.47026C3.94253 3.28801 3.64705 3.28801 3.46481 3.47026C3.28256 3.6525 3.28256 3.94798 3.46481 4.13022L7.63469 8.30011L3.46481 12.47C3.28256 12.6522 3.28256 12.9477 3.46481 13.13C3.64705 13.3122 3.94253 13.3122 4.12477 13.13L8.29466 8.96008L12.4648 13.1302C12.6471 13.3125 12.9425 13.3125 13.1248 13.1302C13.307 12.948 13.307 12.6525 13.1248 12.4703L8.95463 8.30011L13.1248 4.12996Z"
        fill="#999999"
        {...pathProps}
      />
    </svg>
  );
};

export default Close;
