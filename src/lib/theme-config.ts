/**
 * Theme Configuration for ArtPill Studio
 *
 * This file contains theme-related constants and configurations
 * to maintain consistent styling across the application.
 */

// Color Palette
export const colors = {
  // Base colors
  primary: {
    light: '#dcfb44', // ArtPill signature green
    dark: '#b5cc30',
  },
  background: {
    light: '#ececec', // Light mode background
    dark: '#121212', // Dark mode background
  },
  text: {
    light: {
      primary: '#000000',
      secondary: '#444444',
      tertiary: 'rgba(0, 0, 0, 0.6)',
    },
    dark: {
      primary: '#ffffff',
      secondary: '#cccccc',
      tertiary: 'rgba(255, 255, 255, 0.6)',
    }
  },
  accent: {
    light: '#dc2626', // Red accent for highlights
    dark: '#ef4444',
  },
  neutral: {
    100: '#ffffff',
    200: '#f8f8f8',
    300: '#ececec',
    400: '#d1d1d1',
    500: '#b4b4b4',
    600: '#767676',
    700: '#5c5c5c',
    800: '#353535',
    900: '#121212',
  }
};

// Font configuration
export const fonts = {
  sans: 'var(--font-pp-neue-montreal), sans-serif',
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '4rem',    // 64px
    '7xl': '5rem',    // 80px
    '8xl': '6rem',    // 96px
  }
};

// Spacing scale
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index values
export const zIndex = {
  behind: -1,
  base: 0,
  raised: 1,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  overlay: 1700,
  cursor: 9999,
};

// Transitions
export const transitions = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    extraSlow: '800ms',
  },
  easing: {
    ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
    easeIn: 'cubic-bezier(0.42, 0, 1.0, 1.0)',
    easeOut: 'cubic-bezier(0, 0, 0.58, 1.0)',
    easeInOut: 'cubic-bezier(0.42, 0, 0.58, 1.0)',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

// Borders & Shadows
export const borders = {
  radius: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
  width: {
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

// Theme configurations
export type ThemeMode = 'light' | 'dark';

export const themeConfig = {
  defaultMode: 'light' as ThemeMode,
  storageKey: 'artpill-theme',
  animationDuration: 400, // ms
};
