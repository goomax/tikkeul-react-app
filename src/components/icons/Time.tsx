import { SVGProps } from 'react';

const Time = ({
  svgProps,
  pathProps,
  circleProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
  circleProps?: SVGProps<SVGCircleElement>;
}) => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <circle cx="8" cy="8.59998" r="4.65" stroke="#CCCCCC" strokeWidth="0.7" {...circleProps} />
      <path
        d="M8 5.59998V8.59998L10 9.59998"
        stroke="#CCCCCC"
        strokeWidth="0.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </svg>
  );
};

export default Time;
