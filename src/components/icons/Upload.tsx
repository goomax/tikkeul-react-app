import { SVGProps } from 'react';

const Upload = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M6.32813 8.83329L10.4948 4.66663M10.4948 4.66663L10.4948 12.1666M10.4948 4.66663L12.5781 6.74996L14.6615 8.83329"
        stroke="white"
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
      <path
        d="M4.66406 13.8333L4.66406 14.6666C4.66406 15.5871 5.41025 16.3333 6.33073 16.3333L14.6641 16.3333C15.5845 16.3333 16.3307 15.5871 16.3307 14.6666V13.8333"
        stroke="white"
        strokeWidth="1.125"
        strokeLinecap="round"
        {...pathProps}
      />
    </svg>
  );
};

export default Upload;
