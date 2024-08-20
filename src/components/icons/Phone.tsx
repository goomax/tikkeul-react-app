import { SVGProps } from 'react';

const Phone = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M6.61248 4.29843C6.44374 3.87659 6.03518 3.59998 5.58084 3.59998H4.05263C3.47128 3.59998 3 4.07114 3 4.65249C3 9.59399 7.00599 13.6 11.9475 13.6C12.5288 13.6 13 13.1287 13 12.5473L13.0003 11.0188C13.0003 10.5645 12.7237 10.156 12.3019 9.98727L10.8372 9.40161C10.4583 9.25004 10.0268 9.31825 9.7133 9.57952L9.33529 9.89479C8.89381 10.2627 8.24424 10.2334 7.83789 9.82708L6.77346 8.76167C6.3671 8.35532 6.33707 7.70627 6.70497 7.2648L7.02018 6.88681C7.28145 6.57328 7.35027 6.14173 7.1987 5.7628L6.61248 4.29843Z"
        stroke="#CCCCCC"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </svg>
  );
};

export default Phone;
