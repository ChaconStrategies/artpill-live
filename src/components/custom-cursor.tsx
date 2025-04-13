'use client';

import { useEffect, useState, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touchDevice, setTouchDevice] = useState(false);
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const lastTouchRef = useRef<{ x: number, y: number } | null>(null);

  // Track if we're on the client-side
  useEffect(() => {
    setMounted(true);

    // Detect touch devices
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    };

    setTouchDevice(isTouchDevice());
  }, []);

  // Update cursor position with a smooth animation
  useEffect(() => {
    if (!mounted) return;

    const mMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mLeave = () => {
      setHidden(true);
    };

    const mDown = () => {
      setClicked(true);
    };

    const mUp = () => {
      setClicked(false);
    };

    // Touch event handlers for mobile
    const tStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        setHidden(false);
        setClicked(true);
      }
    };

    const tMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
        lastTouchRef.current = { x: touch.clientX, y: touch.clientY };
        setHidden(false);
      }
    };

    const tEnd = () => {
      // Keep the cursor visible at the last touch position for a moment
      setTimeout(() => {
        setClicked(false);

        // After a delay, hide the cursor
        setTimeout(() => {
          if (!lastTouchRef.current) setHidden(true);
        }, 1500);
      }, 100);
    };

    // Add mouse events for desktop
    if (!touchDevice) {
      window.addEventListener('mousemove', mMove);
      window.addEventListener('mousedown', mDown);
      window.addEventListener('mouseup', mUp);
      document.addEventListener('mouseleave', mLeave);
    }

    // Add touch events for mobile
    if (touchDevice) {
      window.addEventListener('touchstart', tStart);
      window.addEventListener('touchmove', tMove);
      window.addEventListener('touchend', tEnd);
    }

    // Use requestAnimationFrame for smooth movement
    let rafId: number;

    const updateCursor = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        // Inner cursor follows mouse exactly
        cursorInnerRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;

        // Outer cursor follows with slight delay for smooth effect
        const outerX = parseFloat(cursorOuterRef.current.style.getPropertyValue('--mouse-x') || '0');
        const outerY = parseFloat(cursorOuterRef.current.style.getPropertyValue('--mouse-y') || '0');

        const newX = outerX + (position.x - outerX) * 0.15;
        const newY = outerY + (position.y - outerY) * 0.15;

        cursorOuterRef.current.style.setProperty('--mouse-x', newX.toString());
        cursorOuterRef.current.style.setProperty('--mouse-y', newY.toString());
        cursorOuterRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    // Track links for hover state
    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);

      // For touch devices
      link.addEventListener('touchstart', handleLinkHoverStart);
      link.addEventListener('touchend', handleLinkHoverEnd);
    });

    return () => {
      if (!touchDevice) {
        window.removeEventListener('mousemove', mMove);
        window.removeEventListener('mousedown', mDown);
        window.removeEventListener('mouseup', mUp);
        document.removeEventListener('mouseleave', mLeave);
      }

      if (touchDevice) {
        window.removeEventListener('touchstart', tStart);
        window.removeEventListener('touchmove', tMove);
        window.removeEventListener('touchend', tEnd);
      }

      cancelAnimationFrame(rafId);

      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
        link.removeEventListener('touchstart', handleLinkHoverStart);
        link.removeEventListener('touchend', handleLinkHoverEnd);
      });
    };
  }, [position, mounted, touchDevice]);

  // Responsive size for the cursor based on device size
  const [cursorSize, setCursorSize] = useState({ outer: 10, inner: 2 });

  useEffect(() => {
    if (!mounted) return;

    const updateCursorSize = () => {
      const width = window.innerWidth;
      if (width <= 640) { // sm
        setCursorSize({ outer: 8, inner: 1.5 });
      } else if (width <= 768) { // md
        setCursorSize({ outer: 9, inner: 1.8 });
      } else {
        setCursorSize({ outer: 10, inner: 2 });
      }
    };

    updateCursorSize();
    window.addEventListener('resize', updateCursorSize);

    return () => window.removeEventListener('resize', updateCursorSize);
  }, [mounted]);

  // Don't render anything during SSR
  if (!mounted) return null;

  // On pure touch devices, use a simplified cursor that only appears on touch
  if (touchDevice) {
    return (
      <>
        <div
          ref={cursorOuterRef}
          className={`fixed pointer-events-none z-[9999] rounded-full bg-transparent border border-black/60 transition-all duration-300 -ml-4 -mt-4 ${
            hidden ? 'opacity-0' : 'opacity-50'
          } ${clicked ? 'scale-90' : 'scale-100'} ${
            linkHovered ? 'bg-[#dcfb44]/20 border-[#dcfb44]' : ''
          }`}
          style={{
            '--mouse-x': '0',
            '--mouse-y': '0',
            transform: 'translate(var(--mouse-x), var(--mouse-y))',
            width: `${cursorSize.outer * 0.8}rem`,
            height: `${cursorSize.outer * 0.8}rem`,
          } as React.CSSProperties}
        ></div>
      </>
    );
  }

  return (
    <>
      <div
        ref={cursorOuterRef}
        className={`fixed pointer-events-none z-[9999] rounded-full bg-transparent border border-black/60 transition-[width,height] duration-300 ${
          hidden ? 'opacity-0' : 'opacity-100'
        } ${clicked ? 'scale-90' : 'scale-100'} ${
          linkHovered ? 'w-16 h-16 -ml-8 -mt-8 bg-[#dcfb44]/20 border-[#dcfb44]' : ''
        }`}
        style={{
          '--mouse-x': '0',
          '--mouse-y': '0',
          transform: 'translate(var(--mouse-x), var(--mouse-y))',
          width: linkHovered ? '4rem' : `${cursorSize.outer}rem`,
          height: linkHovered ? '4rem' : `${cursorSize.outer}rem`,
          marginLeft: linkHovered ? '-2rem' : `-${cursorSize.outer / 2}rem`,
          marginTop: linkHovered ? '-2rem' : `-${cursorSize.outer / 2}rem`,
        } as React.CSSProperties}
      ></div>

      <div
        ref={cursorInnerRef}
        className={`fixed pointer-events-none z-[9999] rounded-full bg-black transition-transform duration-300 ${
          hidden ? 'opacity-0' : 'opacity-100'
        } ${clicked ? 'scale-150 bg-[#dcfb44]' : 'scale-100'} ${
          linkHovered ? 'bg-[#dcfb44] scale-200' : ''
        }`}
        style={{
          width: `${cursorSize.inner}rem`,
          height: `${cursorSize.inner}rem`,
          marginLeft: `-${cursorSize.inner / 2}rem`,
          marginTop: `-${cursorSize.inner / 2}rem`,
        }}
      ></div>

      <style jsx global>{`
        body {
          cursor: none;
        }

        a, button, input, textarea, [role="button"] {
          cursor: none;
        }

        @media (max-width: 768px) {
          body, a, button, input, textarea, [role="button"] {
            cursor: auto;
          }
        }
      `}</style>
    </>
  );
}
