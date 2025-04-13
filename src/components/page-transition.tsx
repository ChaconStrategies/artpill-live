'use client';

import { useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type PageTransitionProps = {
  children: ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [showBackgroundCircle, setShowBackgroundCircle] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Background circle visibility
  useEffect(() => {
    if (!isMounted) return;

    if (pathname !== '/') {
      setShowBackgroundCircle(true);
    } else {
      setShowBackgroundCircle(false);
    }
  }, [pathname, isMounted]);

  // Handle transitions when children change
  useEffect(() => {
    if (!isMounted) return;

    if (children !== displayChildren) {
      setTransitionStage('fadeOut');

      // Set a small timeout to allow for the fade-out to complete
      const fadeOutTimeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionStage('fadeIn');
      }, 500);

      return () => clearTimeout(fadeOutTimeout);
    }
  }, [children, displayChildren, pathname, isMounted]);

  // Don't apply transitions during SSR
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <div
      className={`transition-opacity duration-500 ease-in-out ${
        transitionStage === 'fadeIn' ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Yellow Circle Background for Inner Pages */}
      {showBackgroundCircle && (
        <div
          className="fixed bottom-0 left-0 right-0 w-full h-[800px] rounded-t-full bg-[#dcfb44] -z-10 transition-transform duration-1000"
          style={{
            transform: 'translateY(80%)',
          }}
        ></div>
      )}

      {displayChildren}
    </div>
  );
}
