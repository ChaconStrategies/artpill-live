import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/lib/theme-context';
import ClientBody from './ClientBody';

export const metadata: Metadata = {
  title: 'ArtPill Studio - Global Design Studio',
  description: 'ArtPill is a global design studio blending creativity, strategy, and design. We imagine impactful stories for architecture, events, and objects.',
  keywords: 'design studio, architecture, creative design, art direction, events',
  openGraph: {
    title: 'ArtPill Studio - Global Design Studio',
    description: 'ArtPill is a global design studio blending creativity, strategy, and design.',
    url: 'https://artpill.com',
    siteName: 'ArtPill Studio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts/fonts.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <ThemeProvider>
        <ClientBody>
          {children}
        </ClientBody>
      </ThemeProvider>
    </html>
  );
}
