'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Instagram, Linkedin, Music } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './theme-toggle';
import { useTheme } from '@/lib/theme-context';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  // Determine current language
  const isEnglish = pathname.startsWith('/en') || pathname === '/';
  const isFrench = pathname.startsWith('/fr');

  // Handle language switch
  const switchToLanguage = (lang: 'en' | 'fr') => {
    // Keep the user on the same page but switch language
    let newPath = '';

    if (pathname === '/') {
      newPath = `/${lang}`;
    } else if (pathname.startsWith('/en/') || pathname.startsWith('/fr/')) {
      // Get the path after the language code
      const pathSegments = pathname.split('/');
      pathSegments.splice(1, 1, lang); // Replace language code
      newPath = pathSegments.join('/');
    } else {
      // Fallback for any other path
      newPath = `/${lang}`;
    }

    router.push(newPath);
  };

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { colorScheme } = useTheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'bg-[#ececec]/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="logo">
        <Link href={isEnglish ? '/' : '/fr'} className="font-semibold text-xl tracking-tight">
          Art<span className="font-normal">_</span>Pill
        </Link>
      </div>

      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link
              href={isEnglish ? '/en/archives' : '/fr/archives'}
              className={`nav-link relative ${pathname.includes('/archives') ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' : ''}`}
            >
              {isEnglish ? 'archives' : 'archives'}
            </Link>
          </li>
          <li>
            <Link
              href={isEnglish ? '/en/insights' : '/fr/insights'}
              className={`nav-link relative ${pathname.includes('/insights') ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' : ''}`}
            >
              {isEnglish ? 'insights' : 'aperçus'}
            </Link>
          </li>
          <li>
            <Link
              href={isEnglish ? '/en/contact' : '/fr/contact'}
              className={`nav-link relative ${pathname.includes('/contact') ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-black' : ''}`}
            >
              {isEnglish ? 'contact' : 'contact'}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-6">
        <div className="hidden md:block">
          <div id="based" className="text-xs">
            <div id="basedin">
              {isEnglish ? 'Based in Paris Designing Worldwide' : 'Basé à Paris Conception Mondiale'}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div id="lang" className="text-xs flex items-center space-x-1">
            <div id="selectoren" className={`${isEnglish ? 'font-semibold' : 'opacity-70'} cursor-pointer transition-opacity`}>
              <button onClick={() => switchToLanguage('en')}>EN</button>
            </div>
            <span>|</span>
            <div id="selectorfr" className={`${isFrench ? 'font-semibold' : 'opacity-70'} cursor-pointer transition-opacity`}>
              <button onClick={() => switchToLanguage('fr')}>FR</button>
            </div>
            <ThemeToggle variant="minimal" className="ml-2" />
          </div>
        </div>

        <div className="hidden md:block">
          <div id="worldwide" className="text-xs">
            {isEnglish ? 'Events, Architecture & Objects' : 'Événements, Architecture & Objets'}
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3">
          <a href="https://www.instagram.com/artpill.studio/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <Instagram size={16} />
          </a>
          <a href="https://www.linkedin.com/company/artpillstudio/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <Linkedin size={16} />
          </a>
          <a href="https://open.spotify.com/playlist/45NjO3sf4D0bddrpBpseTC?si=35c0a25ecc314f0f" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
            <Music size={16} />
          </a>
        </div>

        <button
          className="md:hidden flex flex-col justify-center items-center gap-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#ececec] z-40 flex flex-col items-center justify-center transition-transform duration-300 ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <ul className="flex flex-col items-center space-y-6 text-xl">
          <li>
            <Link
              href={isEnglish ? '/en/archives' : '/fr/archives'}
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {isEnglish ? 'archives' : 'archives'}
            </Link>
          </li>
          <li>
            <Link
              href={isEnglish ? '/en/insights' : '/fr/insights'}
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {isEnglish ? 'insights' : 'aperçus'}
            </Link>
          </li>
          <li>
            <Link
              href={isEnglish ? '/en/contact' : '/fr/contact'}
              className="nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {isEnglish ? 'contact' : 'contact'}
            </Link>
          </li>
        </ul>

        <div className="mt-10 flex flex-col items-center space-y-4">
          <div id="based" className="text-sm">
            <div id="basedin">
              {isEnglish ? 'Based in Paris Designing Worldwide' : 'Basé à Paris Conception Mondiale'}
            </div>
          </div>

          <div id="lang" className="text-sm flex items-center space-x-1">
            <div id="selectoren" className={`${isEnglish ? 'font-semibold' : 'opacity-70'} cursor-pointer transition-opacity`}>
              <button onClick={() => switchToLanguage('en')}>EN</button>
            </div>
            <span>|</span>
            <div id="selectorfr" className={`${isFrench ? 'font-semibold' : 'opacity-70'} cursor-pointer transition-opacity`}>
              <button onClick={() => switchToLanguage('fr')}>FR</button>
            </div>
          </div>

          <div id="worldwide" className="text-sm">
            {isEnglish ? 'Events, Architecture & Objects' : 'Événements, Architecture & Objets'}
          </div>

          <div className="flex items-center space-x-6 mt-4">
            <a href="https://www.instagram.com/artpill.studio/" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/artpillstudio/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="https://open.spotify.com/playlist/45NjO3sf4D0bddrpBpseTC?si=35c0a25ecc314f0f" target="_blank" rel="noopener noreferrer">
              <Music size={20} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
