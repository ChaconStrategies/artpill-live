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

// Expanded archive projects data
const projects = [
  {
    id: 'mischief-restaurant',
    title: 'MISCHIEF RESTAURANT',
    image: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
    category: 'Interior Design',
    year: '2023',
  },
  {
    id: 'audemars-piguet',
    title: 'Audemars Piguet',
    image: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
    category: 'Exhibition',
    year: '2023',
  },
  {
    id: 'cartier-ww24',
    title: 'Cartier WW24',
    image: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
    category: 'Event Design',
    year: '2024',
  },
  {
    id: 'louis-vuitton-after-show',
    title: 'Louis Vuitton After Show',
    image: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
    category: 'Event Design',
    year: '2023',
  },
  {
    id: 'serie-9-table-lamp',
    title: 'Serie 9 Table Lamp',
    image: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
    category: 'Product Design',
    year: '2022',
  },
  {
    id: 'montblanc',
    title: 'Montblanc',
    image: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
    category: 'Exhibition',
    year: '2023',
  },
  {
    id: 'ferragamo',
    title: 'Ferragamo',
    image: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
    category: 'Installation',
    year: '2023',
  },
  {
    id: 'nyt-cooking-dinner',
    title: 'NYT Cooking Dinner',
    image: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
    category: 'Event Design',
    year: '2024',
  },
  {
    id: 'hermes-window-display',
    title: 'Hermès Window Display',
    image: 'https://ext.same-assets.com/2157074176/310819825.jpeg',
    category: 'Retail Design',
    year: '2023',
  },
  {
    id: 'dior-pop-up',
    title: 'Dior Pop-Up',
    image: 'https://ext.same-assets.com/2157074176/2618432853.jpeg',
    category: 'Retail Design',
    year: '2024',
  },
];

export default function ArchivesPage() {
  const [scrollPos, setScrollPos] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [showWebGL, setShowWebGL] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);
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

  // Filter projects by category
  const filteredProjects = filter
    ? projects.filter(project => project.category === filter)
    : projects;

  // Get unique categories for filter
  const categories = Array.from(new Set(projects.map(project => project.category)));

  // Subtle animation for projects on scroll
  const getProjectTransform = (index: number) => {
    const baseTransform = -scrollPos * 0.05;
    const staggeredOffset = index * 15;
    const waveEffect = Math.sin(scrollPos * 0.001 + index * 0.3) * 8;

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

          <div className="filters text-center mb-8">
            <div className="inline-flex flex-wrap justify-center gap-3 px-4">
              <button
                className={`px-4 py-2 rounded-full text-sm transition-colors ${filter === null ? 'bg-[#dcfb44] text-black' : 'bg-black/5 hover:bg-black/10'}`}
                onClick={() => setFilter(null)}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${filter === category ? 'bg-[#dcfb44] text-black' : 'bg-black/5 hover:bg-black/10'}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="scrolltodiscover text-center mb-8">
            <div className="text-sm opacity-0 animate-fade-in animation-delay-150">Scroll to Discover</div>
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
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`portfolio-item relative group ${activeProject === project.id ? 'scale-105' : 'scale-100'} transition-transform duration-300`}
                style={getProjectTransform(index)}
                onMouseEnter={() => handleProjectHover(project.id)}
                onMouseLeave={handleProjectLeave}
                onTouchStart={() => handleProjectTouch(project.id)}
              >
                <Link href={`/en/archives/${project.id}`}>
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
                    <div className="flex flex-col">
                      <div className={`archivetit text-2xl md:text-3xl lg:text-4xl transition-all duration-300 ${activeProject === project.id ? 'text-black translate-x-2' : 'text-black/90'}`}>
                        {project.title}
                      </div>
                      <div className="mt-2 text-sm text-black/70 flex gap-4">
                        <span>{project.category}</span>
                        <span>{project.year}</span>
                      </div>
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
