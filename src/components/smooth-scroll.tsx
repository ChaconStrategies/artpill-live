'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { useScroll, useTransform, motion, useSpring, MotionValue } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
  speed?: number;
  enabled?: boolean;
}

export default function SmoothScroll({ children, speed = 1.2, enabled = true }: SmoothScrollProps) {
  // If smooth scroll is disabled, just render children
  if (!enabled) {
    return <>{children}</>;
  }

  return <SmoothScrollImplementation speed={speed}>{children}</SmoothScrollImplementation>;
}

// Separate implementation component to manage all the state
function SmoothScrollImplementation({ children, speed }: Omit<SmoothScrollProps, 'enabled'>) {
  // Refs for scroll container and content
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // State to track dimensions and ensure hydration safety
  const [contentHeight, setContentHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Get scroll progress
  const { scrollY } = useScroll();

  // Update content height on resize/content change
  useEffect(() => {
    setMounted(true);

    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();

    // Update on resize
    window.addEventListener('resize', updateHeight);

    // Create observer to monitor content changes
    const resizeObserver = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      resizeObserver.disconnect();
    };
  }, []);

  // Transform scrollY into smooth scrollY
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 200,
    mass: 0.8
  });

  // Only enable smooth scroll on client-side to avoid hydration issues
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div
      ref={scrollRef}
      style={{ height: contentHeight }}
      className="smooth-scroll-container"
    >
      <motion.div
        ref={contentRef}
        style={{
          y: useTransform(smoothScrollY, (value) => -value * speed),
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0
        }}
        className="smooth-scroll-content"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

// Create a component for scroll-triggered section animations
export function SectionTransition({
  children,
  className = '',
  delay = 0,
  threshold = 0.3,
  direction = 'up',
  duration = 0.7
}: SectionTransitionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasBeenVisible(true);
        } else {
          setIsInView(false);
        }
      },
      {
        root: null,
        threshold,
        rootMargin: '0px 0px -100px 0px' // Trigger a bit before element is fully in view
      }
    );

    observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, [threshold]);

  // Transform direction into motion properties
  const getInitialStyles = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 50 };
      case 'down':
        return { opacity: 0, y: -50 };
      case 'left':
        return { opacity: 0, x: 50 };
      case 'right':
        return { opacity: 0, x: -50 };
      default:
        return { opacity: 0, y: 50 };
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial={getInitialStyles()}
      animate={isInView || hasBeenVisible ? { opacity: 1, x: 0, y: 0 } : getInitialStyles()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier for smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
}

// Parallax scroll effect for backgrounds and decorative elements
export function Parallax({
  children,
  speed = 0.5,
  className = '',
  direction = 'vertical',
  reverse = false
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Adjust speed based on reverse parameter
  const effectiveSpeed = reverse ? -speed : speed;

  // Direction-specific parallax effect
  const transform = direction === 'vertical'
    ? useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * 100}%`])
    : useTransform(scrollYProgress, [0, 1], ["0%", `${effectiveSpeed * 100}%`]);

  const transformProperty = direction === 'vertical' ? 'translateY' : 'translateX';

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          transform: transform.get() === '0%'
            ? 'none'
            : `${transformProperty}(${transform.get()})`,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
