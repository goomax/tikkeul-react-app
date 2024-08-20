import { SVGProps } from 'react';

const Location = ({
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
      <path
        d="M12.0362 11.2275C12.4458 11.4778 12.6615 11.7619 12.6615 12.051C12.6615 12.3401 12.4458 12.6241 12.0362 12.8745C11.6267 13.1249 11.0375 13.3328 10.3281 13.4774C9.6187 13.6219 8.81396 13.698 7.99479 13.698C7.17562 13.698 6.37088 13.6219 5.66146 13.4774C4.95204 13.3328 4.36293 13.1249 3.95334 12.8745C3.54375 12.6241 3.32813 12.3401 3.32813 12.051C3.32812 11.7619 3.54375 11.4778 3.95334 11.2275"
        stroke="#CCCCCC"
        strokeWidth="0.8"
        strokeLinecap="round"
        {...pathProps}
      />
      <path
        d="M12.1103 7.38431C12.1103 9.96446 9.46741 11.7581 8.41634 12.3694C8.15182 12.5232 7.83348 12.5232 7.56896 12.3694C6.51789 11.7581 3.875 9.96446 3.875 7.38431C3.875 4.91372 5.87014 3.26666 7.99265 3.26666C10.1887 3.26666 12.1103 4.91372 12.1103 7.38431Z"
        stroke="#CCCCCC"
        strokeWidth="0.8"
        {...pathProps}
      />
      <circle cx="7.99295" cy="7.38431" r="1.89608" stroke="#CCCCCC" strokeWidth="0.6" {...circleProps} />
    </svg>
  );
};

export default Location;
