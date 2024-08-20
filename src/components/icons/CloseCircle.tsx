import { SVGProps } from 'react';

const CloseCircle = ({
  svgProps,
  pathProps,
  circleProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
  circleProps?: SVGProps<SVGCircleElement>;
}) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <circle cx="8" cy="8" r="8" fill="#999999" {...circleProps} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9174 5.4812C11.0275 5.37112 11.0275 5.19264 10.9174 5.08256C10.8074 4.97248 10.6289 4.97248 10.5188 5.08256L8 7.60136L5.4812 5.08256C5.37112 4.97248 5.19264 4.97248 5.08256 5.08256C4.97248 5.19264 4.97248 5.37112 5.08256 5.4812L7.60136 8L5.08256 10.5188C4.97248 10.6289 4.97248 10.8074 5.08256 10.9174C5.19264 11.0275 5.37112 11.0275 5.4812 10.9174L8 8.39864L10.5188 10.9174C10.6289 11.0275 10.8074 11.0275 10.9174 10.9174C11.0275 10.8074 11.0275 10.6289 10.9174 10.5188L8.39864 8L10.9174 5.4812Z"
        fill="white"
        {...pathProps}
      />
    </svg>
  );
};

export default CloseCircle;
