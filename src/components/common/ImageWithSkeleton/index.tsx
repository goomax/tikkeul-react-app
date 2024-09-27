import { Box, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: 'circular' | 'rectangular' | 'rounded';
}

const ImageWithSkeleton = ({ src, alt, width, height, variant = 'rounded', ...others }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onLoadImage = () => {
    setIsLoaded(true);
  };

  const onErrorImage = () => {
    setHasError(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        height,
        minWidth: width,
        minHeight: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: hasError ? '#f0f0f0' : 'transparent',
        borderRadius: '5px',
      }}
    >
      {!isLoaded && !hasError && (
        <Skeleton variant={variant} width={width} height={height} sx={{ position: 'absolute', top: 0, left: 0 }} />
      )}
      {hasError || !src ? (
        <Stack justifyContent="center" alignItems="center">
          <BrokenImageIcon sx={{ color: '#999' }} />
          <Typography fontSize={10} sx={{ color: '#999', textAlign: 'center', maxWidth: width }} noWrap>
            {alt}
          </Typography>
        </Stack>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={onLoadImage}
          onError={onErrorImage}
          style={{
            display: isLoaded ? 'block' : 'none',
            objectFit: 'cover',
          }}
          {...others}
        />
      )}
    </Box>
  );
};

export default ImageWithSkeleton;
