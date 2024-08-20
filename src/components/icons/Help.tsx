import { SVGProps } from 'react';

const Help = ({
  svgProps,
  pathProps,
}: {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
}) => {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...svgProps}>
      <path
        d="M6.09766 6.14905C6.21152 5.79819 6.4201 5.48595 6.70052 5.2463C6.98094 5.00665 7.32253 4.84916 7.68685 4.79136C8.05117 4.73356 8.42415 4.77757 8.76497 4.91866C9.1058 5.05975 9.40097 5.29247 9.61784 5.59086C9.83471 5.88925 9.96459 6.24168 9.99358 6.60942C10.0226 6.97715 9.94923 7.34584 9.78179 7.67452C9.61436 8.0032 9.35958 8.27897 9.04507 8.47172C8.73056 8.66447 8.36888 8.76649 8 8.76649V9.43346M8 14.1C4.68629 14.1 2 11.4137 2 8.09998C2 4.78627 4.68629 2.09998 8 2.09998C11.3137 2.09998 14 4.78627 14 8.09998C14 11.4137 11.3137 14.1 8 14.1ZM8.0332 11.4333V11.5L7.9668 11.5001V11.4333H8.0332Z"
        stroke="#CCCCCC"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...pathProps}
      />
    </svg>
  );
};

export default Help;
