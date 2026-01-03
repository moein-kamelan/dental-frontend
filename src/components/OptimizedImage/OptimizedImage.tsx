import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  aspectRatio?: string;
}

/**
 * OptimizedImage Component
 * 
 * Automatically serves WebP images with fallback to original format
 * Includes lazy loading and proper sizing to prevent layout shifts
 * 
 * Usage:
 * <OptimizedImage 
 *   src="/images/banner.png" 
 *   alt="Banner" 
 *   width={1920} 
 *   height={1080}
 *   loading="eager"
 *   fetchPriority="high"
 * />
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  fetchPriority = 'auto',
  aspectRatio
}) => {
  // Generate WebP source from original image path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Build style object for aspect ratio if provided
  const style = aspectRatio ? { aspectRatio } : {};

  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        style={style}
      />
    </picture>
  );
};

export default OptimizedImage;
