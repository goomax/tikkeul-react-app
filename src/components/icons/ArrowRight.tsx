import { SVGProps } from 'react';

const ArrowRight = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00736 0.238643L11.7803 5.42386C12.0732 5.74205 12.0732 6.25794 11.7803 6.57614L7.00736 11.7614C6.71447 12.0795 6.23959 12.0795 5.9467 11.7614C5.65381 11.4432 5.65381 10.9273 5.9467 10.6091L9.43934 6.81478H0V5.18522H9.43934L5.9467 1.39091C5.65381 1.07272 5.65381 0.556834 5.9467 0.238643C6.23959 -0.0795478 6.71447 -0.0795478 7.00736 0.238643Z"
        fill="white"
        {...pathProps}
      />
    </svg>
  );
};

export default ArrowRight;
