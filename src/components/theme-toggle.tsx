'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '@/lib/theme-context';
import { motion } from 'framer-motion';
import { Moon, Sun, Monitor } from 'lucide-react';

const THEME_ICONS = {
  light: Sun,
  dark: Moon,
  system: Monitor
};

interface ThemeToggleProps {
  className?: string;
  variant?: 'icon' | 'button' | 'minimal';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({
  className = '',
  variant = 'icon',
  showLabel = false,
  size = 'md'
}: ThemeToggleProps) {
  const { theme, colorScheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={`w-9 h-9 ${className}`} />;
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const buttonSizes = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-1.5 px-3',
    lg: 'text-base py-2 px-4'
  };

  // Function to cycle through themes
  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Current icon based on theme
  const ThemeIcon = THEME_ICONS[theme];

  // Icon color based on color scheme (actual appearance)
  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';

  if (variant === 'button') {
    return (
      <button
        onClick={cycleTheme}
        className={`flex items-center space-x-2 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors ${buttonSizes[size]} ${className}`}
        aria-label="Toggle theme"
      >
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ThemeIcon size={iconSizes[size]} color={iconColor} />
        </motion.div>

        {showLabel && (
          <motion.span
            key={`${theme}-text`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="capitalize"
          >
            {theme}
          </motion.span>
        )}
      </button>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        onClick={cycleTheme}
        className={`p-2 ${className}`}
        aria-label="Toggle theme"
      >
        <motion.div
          key={theme}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ThemeIcon size={iconSizes[size]} color={iconColor} />
        </motion.div>
      </button>
    );
  }

  // Default: icon variant
  return (
    <motion.button
      onClick={cycleTheme}
      className={`relative h-9 w-9 rounded-full flex items-center justify-center ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: theme === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.05)'
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        key={theme}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
      >
        <ThemeIcon size={iconSizes[size]} color={iconColor} />
      </motion.div>
    </motion.button>
  );
}
