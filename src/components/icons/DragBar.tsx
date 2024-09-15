import { SVGProps } from 'react';

const DragBar = ({
  svgProps,
  rectProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  rectProps?: SVGProps<SVGRectElement>;
}) => {
  return (
    <svg width="40" height="4" viewBox="0 0 40 4" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <rect width="40" height="4" rx="2" fill="#CCCCCC" {...rectProps} />
    </svg>
  );
};

export default DragBar;
