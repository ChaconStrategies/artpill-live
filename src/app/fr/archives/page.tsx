'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/header';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

// Archive projects data with French titles
const projects = [
  {
    id: 'mischief-restaurant',
    title: 'RESTAURANT MISCHIEF',
    image: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
  },
  {
    id: 'audemars-piguet',
    title: 'Audemars Piguet',
    image: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
  },
  {
    id: 'cartier-ww24',
    title: 'Cartier WW24',
    image: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
  },
  {
    id: 'louis-vuitton-after-show',
    title: 'Louis Vuitton Après-Défilé',
    image: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
  },
  {
    id: 'serie-9-table-lamp',
    title: 'Lampe de table Serie 9',
    image: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
  },
  {
    id: 'montblanc',
    title: 'Montblanc',
    image: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
  },
  {
    id: 'ferragamo',
    title: 'Ferragamo',
    image: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
  },
];

export default function ArchivesPage() {
  const [scrollPos, setScrollPos] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showWebGL, setShowWebGL] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hover effect for projects
  const handleProjectHover = (id: string) => {
    setActiveProject(id);
  };

  const handleProjectLeave = () => {
    setActiveProject(null);
  };

  // Handle touch interactions for mobile
  const handleProjectTouch = (id: string) => {
    if (isMobile) {
      if (activeProject === id) {
        setActiveProject(null);
      } else {
        setActiveProject(id);
      }
    }
  };

  useEffect(() => {
    setLoaded(true);

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPos(position);

      if (position > 300) {
        setShowWebGL(true);
      } else {
        setShowWebGL(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle animation for projects on scroll
  const getProjectTransform = (index: number) => {
    const baseTransform = -scrollPos * 0.1;
    const staggeredOffset = index * 20;
    const waveEffect = Math.sin(scrollPos * 0.001 + index * 0.5) * 10;

    return {
      transform: `translateY(${baseTransform + staggeredOffset + waveEffect}px)`,
      transition: 'transform 0.5s ease-out'
    };
  };

  return (
    <main className="min-h-screen bg-[#ececec]">
      {showWebGL && <WebGLScene />}

      <Header />

      <div id="archivewrapper" className="pt-24 min-h-screen">
        <div id="archivestatic" className="relative z-10 py-12 md:py-24">
          <h1 className="text-6xl md:text-8xl text-center mb-8 opacity-0 animate-fade-in">Archives</h1>

          <div className="scrolltodiscover text-center mb-16">
            <div className="text-sm opacity-0 animate-fade-in animation-delay-150">Faire Défiler Pour Découvrir</div>
          </div>
        </div>

        <div
          id="archivecarousel"
          className={`relative z-10 px-6 max-w-7xl mx-auto transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          ref={carouselRef}
        >
          <div
            id="archivecarouselin"
            className="space-y-20 md:space-y-32"
          >
            {projects.map((project, index) => (
              <div
                key={index}
                className={`portfolio-item relative group ${activeProject === project.id ? 'scale-105' : 'scale-100'} transition-transform duration-300`}
                style={getProjectTransform(index)}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={handleProjectLeave}
                onTouchStart={() => handleProjectTouch(project.id)}
              >
                <Link href={`/fr/archives/${project.id}`}>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div
                      className="w-full md:w-64 h-64 relative overflow-hidden"
                      style={{ backgroundColor: '#f7f7f7' }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover transition-all duration-700 ${activeProject === project.id ? 'scale-110' : 'scale-100'}`}
                      />
                      <div
                        className={`absolute inset-0 bg-[#dcfb44] mix-blend-multiply opacity-0 transition-opacity duration-300 ${activeProject === project.id ? 'opacity-20' : ''}`}
                      ></div>
                    </div>
                    <div className={`archivetit text-2xl md:text-3xl lg:text-4xl transition-all duration-300 ${activeProject === project.id ? 'text-black translate-x-2' : 'text-black/90'}`}>
                      {project.title}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 text-center text-sm text-black/50">
        © ArtPill Studio {new Date().getFullYear()}
      </div>
    </main>
  );
}
