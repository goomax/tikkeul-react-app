import { Box, Skeleton } from '@mui/material';
import { useState } from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'circular' | 'rectangular' | 'rounded';
}

const ImageWithSkeleton = ({ src, alt, width, height, variant = 'rounded', ...others }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const onLoadImage = () => {
    setIsLoaded(true);
  };

  return (
    <Box sx={{ position: 'relative', width, height }}>
      {!isLoaded && (
        <Skeleton variant={variant} width={width} height={height} sx={{ position: 'absolute', top: 0, left: 0 }} />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoad={onLoadImage}
        style={{
          display: isLoaded ? 'block' : 'none',
          objectFit: 'cover',
        }}
        {...others}
      />
    </Box>
  );
};

export default ImageWithSkeleton;
