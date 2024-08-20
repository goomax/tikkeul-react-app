import { SVGProps } from 'react';

const User = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M6 19C6 16.7909 8.68629 15 12 15C15.3137 15 18 16.7909 18 19"
        stroke="#CCCCCC"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
      <path
        d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z"
        stroke="#CCCCCC"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </svg>
  );
};

export default User;
