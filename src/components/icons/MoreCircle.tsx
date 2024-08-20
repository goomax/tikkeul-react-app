import { SVGProps } from 'react';

const MoreCircle = ({
  svgProps,
  pathProps,
  circleProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
  circleProps?: SVGProps<SVGCircleElement>;
}) => {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <circle cx="6" cy="6.59998" r="5.75" stroke="#999999" strokeWidth="0.5" {...circleProps} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.3301 5.835C8.23897 5.74388 8.09123 5.74388 8.00011 5.835L5.99844 7.83668L3.99676 5.835C3.90564 5.74388 3.7579 5.74388 3.66678 5.835C3.57566 5.92612 3.57566 6.07386 3.66678 6.16498L5.99844 8.49664L8.3301 6.16498C8.42122 6.07386 8.42122 5.92612 8.3301 5.835Z"
        fill="#999999"
        {...pathProps}
      />
    </svg>
  );
};

export default MoreCircle;
