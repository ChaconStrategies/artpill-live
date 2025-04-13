'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

// Insights data
const insights = [
  {
    id: 'ai-in-the-creative-industry',
    title: 'AI in the creative industry',
    subtitle: 'Are AI technologies going to repace creative jobs?',
    image: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
  },
  {
    id: 'the-luxury-event-industry-evolution',
    title: 'The luxury event industry evolution',
    subtitle: "Let's take a look at the rapid shift and evolution that the industry is undergoing",
    image: 'https://ext.same-assets.com/2157074176/310819825.jpeg',
  },
  {
    id: 'paris-creative-city-guide',
    title: 'Paris creative city guide',
    subtitle: '20 Parisian spots to find creativity and inspiration',
    image: 'https://ext.same-assets.com/2157074176/2618432853.jpeg',
  },
  {
    id: 'ethics-empathy',
    title: 'Ethics & empathy',
    subtitle: "In today's competitive creative industry, companies must become more ethical and empathetic.",
    image: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
  },
];

export default function InsightsPage() {
  const [loaded, setLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showWebGL, setShowWebGL] = useState(false);

  useEffect(() => {
    setLoaded(true);

    // Show WebGL based on scroll position
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (position > 300) {
        setShowWebGL(true);
      } else {
        setShowWebGL(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#ececec]">
      {showWebGL && <WebGLScene />}

      <Header />

      <div id="insightswrapper" className={`pt-24 min-h-screen px-6 max-w-7xl mx-auto transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-6xl md:text-8xl py-16 md:py-24">Insights</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="insights-item group"
              style={{
                transform: `translateY(${scrollPosition > 300 ? Math.sin(index * 0.5) * 20 : 0}px)`,
                transition: 'transform 0.5s ease-out'
              }}
            >
              <div>
                <Link href={`/en/insights/${insight.id}`}>
                  <div className="w-full h-64 md:h-80 relative overflow-hidden mb-6">
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-xl mb-3 font-medium">{insight.title}</h3>
                  <h2 className="text-2xl md:text-3xl mb-4">{insight.subtitle}</h2>

                  <div className="readmore text-sm font-light group-hover:underline">
                    Read more
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
