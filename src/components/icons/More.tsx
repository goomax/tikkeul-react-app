import { SVGProps } from 'react';

const More = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.49905 4.75253C9.36237 4.61585 9.14076 4.61585 9.00408 4.75253L6.00156 7.75505L2.99905 4.75253C2.86237 4.61585 2.64076 4.61585 2.50408 4.75253C2.36739 4.88922 2.36739 5.11082 2.50408 5.24751L6.00156 8.745L9.49905 5.24751C9.63573 5.11082 9.63573 4.88922 9.49905 4.75253Z"
        fill="#5498FF"
        {...pathProps}
      />
    </svg>
  );
};

export default More;
