import { SVGProps } from 'react';

const ArrowTop = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.397739 8.32107L9.03977 0.366117C9.57009 -0.122038 10.4299 -0.122038 10.9602 0.366117L19.6023 8.32107C20.1326 8.80922 20.1326 9.60068 19.6023 10.0888C19.0719 10.577 18.2121 10.577 17.6818 10.0888L11.358 4.26777L11.358 20H8.64204L8.64204 4.26777L2.31819 10.0888C1.78787 10.577 0.928057 10.577 0.397739 10.0888C-0.13258 9.60068 -0.13258 8.80922 0.397739 8.32107Z"
        fill="white"
        {...pathProps}
      />
    </svg>
  );
};

export default ArrowTop;
