/**
 * OptimizedImage Component
 * Automatically serves WebP with fallback, implements lazy loading, and responsive images
 */

import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean; // For LCP images
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  sizes = '100vw',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Generate WebP version and responsive sizes
  const getImageSources = (imageSrc: string) => {
    const ext = imageSrc.split('.').pop();
    const basePath = imageSrc.replace(`.${ext}`, '');
    
    return {
      webp: `${basePath}.webp`,
      webpSrcset: `${basePath}-640.webp 640w, ${basePath}-1024.webp 1024w, ${basePath}.webp 1920w`,
      fallback: imageSrc,
      fallbackSrcset: `${basePath}-640.${ext} 640w, ${basePath}-1024.${ext} 1024w, ${basePath}.${ext} 1920w`,
    };
  };

  const sources = getImageSources(src);

  return (
    <picture>
      {/* WebP source with responsive images */}
      <source
        type="image/webp"
        srcSet={sources.webpSrcset}
        sizes={sizes}
      />
      
      {/* Fallback source */}
      <source
        type={`image/${src.split('.').pop()}`}
        srcSet={sources.fallbackSrcset}
        sizes={sizes}
      />
      
      {/* Main image */}
      <img
        src={sources.fallback}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
}
