'use client';

import { useEffect, ReactNode } from 'react';
import { useTheme } from '@/lib/theme-context';
import PageTransition from '@/components/page-transition';
import ClientCursorWrapper from '@/components/client-cursor-wrapper';

export default function ClientBody({ children }: { children: ReactNode }) {
  const { colorScheme } = useTheme();

  // Remove any extension-added classes during hydration
  useEffect(() => {
    document.body.classList.remove('dark', 'light', 'antialiased');

    // Apply antialiasing
    document.body.classList.add('antialiased');
  }, []);

  return (
    <body
      className={`${colorScheme === 'dark' ? 'bg-[#121212] text-[#f5f5f5]' : 'bg-[#ececec] text-[#121212]'}
                  min-h-screen font-sans transition-colors duration-300`}
      suppressHydrationWarning
    >
      <ClientCursorWrapper>
        <PageTransition>
          {children}
        </PageTransition>
      </ClientCursorWrapper>
    </body>
  );
}
