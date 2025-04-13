'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  lowQualitySrc?: string;
  loadingColor?: string;
  transitionDuration?: number;
  threshold?: number;
}

export default function ProgressiveImage({
  src,
  alt,
  lowQualitySrc,
  loadingColor = '#dcfb44',
  transitionDuration = 0.5,
  threshold = 1.0,
  className = '',
  ...props
}: ProgressiveImageProps) {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imgSrc, setImgSrc] = useState(lowQualitySrc || src);

  // Simulate progressive loading
  useEffect(() => {
    if (!loading) return;

    // Reset loading state when src changes
    if (src !== imgSrc && !lowQualitySrc) {
      setLoading(true);
      setLoadingProgress(0);
    }

    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const increment = Math.random() * 15; // Random progress increment
        const newProgress = Math.min(prev + increment, 95); // Cap at 95% until actual load completes
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loading, imgSrc, src, lowQualitySrc]);

  // Function to handle image loading completion
  const handleImageLoad = () => {
    setLoadingProgress(100);
    setTimeout(() => {
      setLoading(false);
    }, 300);

    // If we started with a low quality image, now show the high quality one
    if (lowQualitySrc && imgSrc !== src) {
      setImgSrc(src);
    }
  };

  return (
    <div className="relative overflow-hidden w-full h-full">
      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imgSrc as string}
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0.7 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: transitionDuration }}
          className="relative w-full h-full"
        >
          <Image
            src={imgSrc}
            alt={alt}
            className={`transition-transform duration-700 ${loading ? 'scale-105 blur-sm' : 'scale-100'} ${className}`}
            onLoad={handleImageLoad}
            onError={() => {
              // On error, set progress to 100 to remove loader
              setLoadingProgress(100);
              setLoading(false);
            }}
            {...props}
          />
        </motion.div>
      </AnimatePresence>

      {/* Loading indicator */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-sm"
          >
            <div className="relative w-12 h-12">
              {/* Loading spinner */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: loadingColor,
                  borderLeftColor: loadingColor,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Progress text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-medium text-black">{Math.round(loadingProgress)}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simpler version for list views and less critical images
export function LazyImage({
  src,
  alt,
  className = '',
  waitForActivity = false,
  ...props
}: ImageProps & { waitForActivity?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!waitForActivity);

  // If waitForActivity is true, we'll wait for user interaction before loading
  useEffect(() => {
    if (waitForActivity && !shouldLoad) {
      const onActivity = () => setShouldLoad(true);
      window.addEventListener('scroll', onActivity, { once: true });
      window.addEventListener('mousemove', onActivity, { once: true });
      window.addEventListener('touchstart', onActivity, { once: true });

      return () => {
        window.removeEventListener('scroll', onActivity);
        window.removeEventListener('mousemove', onActivity);
        window.removeEventListener('touchstart', onActivity);
      };
    }
  }, [waitForActivity, shouldLoad]);

  if (!shouldLoad) {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : '16/9'}}
      />
    );
  }

  return (
    <div className="relative overflow-hidden w-full h-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          className={`transition-transform duration-500 ${loaded ? 'scale-100' : 'scale-105 blur-sm'} ${className}`}
          onLoad={() => setLoaded(true)}
          {...props}
        />
      </motion.div>

      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
