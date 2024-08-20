import { SVGProps } from 'react';

const Next = ({
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
        d="M7.08808 4.17085C6.86028 4.39866 6.86028 4.76801 7.08808 4.99581L12.0923 10L7.08808 15.0042C6.86028 15.232 6.86028 15.6013 7.08808 15.8291C7.31589 16.057 7.68524 16.057 7.91304 15.8291L13.7422 10L7.91304 4.17085C7.68524 3.94305 7.31589 3.94305 7.08808 4.17085Z"
        fill="#CCCCCC"
        {...pathProps}
      />
    </svg>
  );
};

export default Next;
