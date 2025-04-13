'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import Scanner from '@/components/scanner';
import ClickToStart from '@/components/click-to-start';
import dynamic from 'next/dynamic';
import { SectionTransition, Parallax } from '@/components/smooth-scroll';
import ProgressiveImage from '@/components/image-loader';
import { motion, AnimatePresence } from 'framer-motion';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showStartScreen, setShowStartScreen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showWebGL, setShowWebGL] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [userLanguage, setUserLanguage] = useState<'en' | 'fr'>('en');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate gradual content loading
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 200);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(loadingInterval);
    };
  }, []);

  useEffect(() => {
    // Determine user's preferred language
    if (typeof window !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.split('-')[0];
      if (browserLang === 'fr') {
        setUserLanguage('fr');
      }
    }
  }, []);

  useEffect(() => {
    // Finish loading when progress reaches 100
    if (loadingProgress >= 100) {
      // Complete loading with a small delay for smooth transition
      setTimeout(() => {
        setLoading(false);
        setShowStartScreen(true);
      }, 500);
    }
  }, [loadingProgress]);

  const handleStartClick = () => {
    setShowStartScreen(false);
    setShowContent(true);
    setShowWebGL(true);
  };

  // Handle touch events for sections
  const handleTouch = (index: number) => {
    if (sectionsRef.current[index] && !sectionsRef.current[index].classList.contains('in-view')) {
      sectionsRef.current[index].classList.add('in-view');
    }
  };

  useEffect(() => {
    if (showContent) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        sectionsRef.current.forEach((section) => {
          if (!section) return;

          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + scrollY;

          if (scrollY > sectionTop - windowHeight * 0.7) {
            section.classList.add('in-view');
          }
        });
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showContent]);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  // Content translation
  const content = {
    en: {
      global: 'Global',
      design: 'Design',
      studio: 'Studio',
      blends: 'That blends',
      creativity: 'Creativity, Strategy',
      and_design: 'and Design',
      imagine: 'To imagine',
      stories: 'impactful stories',
      for_architecture: 'For architecture,',
      events_objects: 'events and objects',
      composed_by: 'Composed by',
      creatives: '6 creatives',
      creative_director: 'Creative Director',
      strategist: 'Strategist',
      set_designer: 'Set Designer',
      graphic_designer: 'Graphic Designer',
      three_d_designer: '3D Designer',
      motion_designer: 'Motion Designer',
      deliver: 'To deliver a 360º',
      approach: 'project approach',
      lets_imagine: 'Let\'s imagine',
      together: 'Together',
      company: 'Company',
      message: 'Message',
      send: 'Send',
      website_made_by: 'Website made by'
    },
    fr: {
      global: 'Studio de',
      design: 'Design',
      studio: 'Global',
      blends: 'Qui mélange',
      creativity: 'Créativité, Stratégie',
      and_design: 'et Design',
      imagine: 'Pour imaginer',
      stories: 'des histoires percutantes',
      for_architecture: 'Pour l\'architecture,',
      events_objects: 'les événements et les objets',
      composed_by: 'Composé de',
      creatives: '6 créatifs',
      creative_director: 'Directeur Créatif',
      strategist: 'Stratège',
      set_designer: 'Set Designer',
      graphic_designer: 'Designer Graphique',
      three_d_designer: 'Designer 3D',
      motion_designer: 'Motion Designer',
      deliver: 'Pour offrir une approche',
      approach: 'à 360º du projet',
      lets_imagine: 'Imaginons',
      together: 'Ensemble',
      company: 'Entreprise',
      message: 'Message',
      send: 'Envoyer',
      website_made_by: 'Site web réalisé par'
    }
  }[userLanguage];

  return (
    <main className="min-h-screen">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Scanner onComplete={() => setLoading(false)} />
          </motion.div>
        )}

        {showStartScreen && (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <ClickToStart onClick={handleStartClick} />
          </motion.div>
        )}
      </AnimatePresence>

      {showWebGL && <WebGLScene />}

      <Header />

      {showContent && (
        <motion.div
          id="homewrapper"
          className="pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <section
            className="section flex items-center justify-center min-h-screen transition-opacity duration-1000"
            ref={(el) => addToRefs(el, 0)}
            onTouchStart={() => handleTouch(0)}
          >
            <div className="text-center px-4">
              <h1 className="text-5xl md:text-7xl flex flex-col items-center space-y-6">
                <motion.div
                  id="global"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {content.global}
                </motion.div>
                <motion.div
                  id="design"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  {content.design}
                </motion.div>
                <motion.div
                  id="studio"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  {content.studio}
                </motion.div>
              </h1>
            </div>
          </section>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.2}
            direction="up"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center">
              {content.blends}<br />{content.creativity}<br />{content.and_design}
            </h2>
          </SectionTransition>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.3}
            direction="up"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center">
              {content.imagine}<br />{content.stories}
            </h2>
          </SectionTransition>

          <SectionTransition
            className="section bg-[#dcfb44] py-16 md:py-24"
            delay={0.2}
            direction="left"
          >
            <Parallax speed={0.15}>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 p-8 md:p-16">
                {/* Yellow circle background section with parallax */}
                <div className="absolute inset-0 rounded-full bg-[#dcfb44]/20 -z-10"></div>
              </div>
            </Parallax>
          </SectionTransition>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.2}
            direction="up"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center">
              {content.for_architecture}<br />{content.events_objects}
            </h2>
          </SectionTransition>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.3}
            direction="up"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center">
              {content.composed_by}<br />{content.creatives}
            </h2>
          </SectionTransition>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.3}
            direction="right"
          >
            <div id="shadows" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 p-4 md:p-8">
              <motion.div className="shadow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="teamitem p-4 border border-black/10 hover:bg-[#dcfb44]/20 transition-colors duration-300">
                  <div className="teamname">{content.creative_director}</div>
                </div>
              </motion.div>
              <motion.div className="shadow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="teamitem p-4 border border-black/10 hover:bg-[#dcfb44]/20 transition-colors duration-300">
                  <div className="teamname">{content.strategist}</div>
                </div>
              </motion.div>
              <motion.div className="shadow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="teamitem p-4 border border-black/10 hover:bg-[#dcfb44]/20 transition-colors duration-300">
                  <div className="teamname">{content.set_designer}</div>
                </div>
              </motion.div>
              <motion.div className="shadow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="teamitem p-4 border border-black/10 hover:bg-[#dcfb44]/20 transition-colors duration-300">
                  <div className="teamname">{content.graphic_designer}</div>
                </div>
              </motion.div>
              <motion.div className="shadow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="teamitem p-4 border border-black/10 hover:bg-[#dcfb44]/20 transition-colors duration-300">
                  <div className="teamname">{content.three_d_designer}</div>
                </div>
              </motion.div>
              <motion.div className="shadow" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <div className="teamitem p-4 border border-black/10 hover:bg-[#dcfb44]/20 transition-colors duration-300">
                  <div className="teamname">{content.motion_designer}</div>
                </div>
              </motion.div>
            </div>
          </SectionTransition>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.2}
            direction="up"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-center">
              {content.deliver}<br />{content.approach}
            </h2>
          </SectionTransition>

          <SectionTransition
            className="section px-4 py-16 md:py-24"
            delay={0.2}
            direction="up"
            id="contactSection"
          >
            <div className="max-w-2xl mx-auto px-4">
              <div id="footertit" className="mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-center">{content.lets_imagine}</h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-center relative">
                  {content.together}
                  <motion.span
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#dcfb44] rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration:.8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    :)
                  </motion.span>
                </h2>
              </div>

              <div id="formulario" className="w-full">
                <form className="space-y-6">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <input
                      placeholder={content.company}
                      type="text"
                      name="company"
                      className="w-full p-2 border-b border-black/30 bg-transparent focus:outline-none focus:border-black"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <textarea
                      name="message"
                      placeholder={content.message}
                      required
                      className="w-full p-2 border-b border-black/30 bg-transparent focus:outline-none focus:border-black min-h-[100px]"
                    ></textarea>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex justify-end"
                  >
                    <motion.button
                      type="submit"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#dcfb44",
                        color: "#000",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="btn px-6 py-2 border border-black/30 transition-colors duration-300"
                    >
                      {content.send}
                    </motion.button>
                  </motion.div>
                </form>
              </div>

              <motion.div
                className="silencio mt-24 text-xs text-center text-black/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {content.website_made_by} <a href="https://silencio.es" target="_blank" className="underline">SILENCIO</a>.
              </motion.div>
            </div>
          </SectionTransition>
        </motion.div>
      )}

      <style jsx>{`
        .section.in-view {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .section {
            padding-top: 3rem;
            padding-bottom: 3rem;
          }

          /* Add specific mobile-friendly animations and transitions */
          .animate-fade-in-up {
            animation-duration: 0.8s;
          }
        }
      `}</style>
    </main>
  );
}
