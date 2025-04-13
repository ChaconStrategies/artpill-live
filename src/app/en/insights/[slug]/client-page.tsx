'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import dynamic from 'next/dynamic';
import SocialShare from '@/components/social-share';
import { useTheme } from '@/lib/theme-context';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

// Sample data for insights articles
const articles: Record<string, any> = {
  'designing-retail-experiences': {
    title: 'Designing Retail Experiences for the Post-COVID Era',
    excerpt: 'How retail spaces are evolving to meet new consumer expectations in a changing world.',
    date: 'May 12, 2024',
    readTime: '8 min read',
    category: 'Retail Design',
    author: 'Sophie Laurent',
    heroImage: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
    content: [
      {
        type: 'text',
        content: "The retail landscape has undergone a seismic shift in recent years, accelerated by the global pandemic. As we emerge into this new era, retail design faces unprecedented challenges and opportunities. This article explores how physical retail spaces are being reimagined to thrive in the post-COVID world, balancing safety concerns with the fundamental human desire for connection and experience.",
      },
      {
        type: 'heading',
        content: 'The Evolution of Retail Spaces',
      },
      {
        type: 'text',
        content: "For decades, retail design was driven by a single goal: maximize sales per square foot. Today, this metric alone is insufficient. Modern retail spaces must now balance efficiency with experience, safety with socialization, and digital integration with tactile discovery. The most successful retail environments now act as brand embassies rather than mere transaction points.",
      },
      {
        type: 'image',
        src: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
        alt: 'Modern retail space with spacious layout',
        caption: 'Spacious layouts with natural materials create a sense of safety and well-being',
      },
      {
        type: 'heading',
        content: 'Hygiene as a Design Feature',
      },
      {
        type: 'text',
        content: "What began as temporary safety measures have evolved into core design principles. Touchless interactions, antimicrobial surfaces, and advanced air purification systems are now expected features rather than premium additions. The challenge for designers lies in integrating these elements seamlessly without creating spaces that feel clinical or sterile.",
      },
      {
        type: 'heading',
        content: 'Blending Digital and Physical',
      },
      {
        type: 'text',
        content: "The line between e-commerce and physical retail continues to blur. Smart fitting rooms, augmented reality displays, and mobile integration points are becoming standard features of forward-thinking retail spaces. The most successful designs use technology to enhance rather than replace the physical experience, recognizing that digital tools work best when they solve real friction points in the customer journey.",
      },
      {
        type: 'quote',
        content: "The future of retail is not physical or digital—it's a harmonious blend of both, creating experiences that can't be replicated online while embracing the convenience that technology provides.",
        author: 'Marc Dubois, Retail Innovation Director',
      },
      {
        type: 'image',
        src: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
        alt: 'Interactive digital display in retail setting',
        caption: 'Interactive displays enhance product exploration while minimizing physical contact',
      },
      {
        type: 'heading',
        content: 'Flexibility and Adaptability',
      },
      {
        type: 'text',
        content: "Perhaps the most important lesson from recent years is the value of adaptability. Retail spaces that can quickly transform to meet changing needs and circumstances demonstrate resilience. Modular fixtures, movable partitions, and multi-purpose areas allow retailers to pivot quickly—whether for social distancing requirements, seasonal changes, or special events.",
      },
      {
        type: 'text',
        content: "At ArtPill Studio, we're working with brands to create retail environments that embrace these principles while maintaining strong aesthetic vision and brand identity. The result is spaces that feel both contemporary and timeless—ready for today's challenges and tomorrow's opportunities.",
      },
      {
        type: 'heading',
        content: 'Looking Forward',
      },
      {
        type: 'text',
        content: "The retailers who will thrive in this new landscape are those who view recent disruptions not as temporary inconveniences but as catalysts for meaningful innovation. By embracing human-centered design principles, thoughtful technology integration, and flexible spatial concepts, brands can create retail experiences that resonate deeply with post-pandemic consumers.",
      },
    ],
    relatedArticles: [
      'sustainability-in-design',
      'future-of-exhibition-design',
    ],
  },
  'future-of-exhibition-design': {
    title: 'The Future of Exhibition Design',
    excerpt: 'New approaches to creating engaging and immersive exhibition experiences.',
    date: 'April 25, 2024',
    readTime: '6 min read',
    category: 'Exhibition Design',
    author: 'Jean Pascal',
    heroImage: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
    content: [
      {
        type: 'text',
        content: "Exhibition design is undergoing a revolutionary transformation as digital technologies create new possibilities for engagement, education, and immersion. The traditional boundaries between physical installations and digital experiences are dissolving, giving rise to hybrid exhibitions that offer the best of both worlds.",
      },
      {
        type: 'text',
        content: "This article examines how these emerging approaches are reshaping visitor experiences and offering designers unprecedented creative freedom.",
      },
    ],
    relatedArticles: [
      'designing-retail-experiences',
      'immersive-digital-experiences',
    ],
  },
  'sustainability-in-design': {
    title: 'Sustainability in Design',
    excerpt: 'How designers are integrating sustainable practices into their work.',
    date: 'March 18, 2024',
    readTime: '5 min read',
    category: 'Sustainability',
    author: 'Marie Dubois',
    heroImage: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
    content: [
      {
        type: 'text',
        content: "In an era of increasing environmental awareness, design is undergoing a profound transformation. Sustainable materials and practices are no longer just a nice-to-have feature but a central consideration in creating meaningful, responsible experiences. This shift represents both a challenge and an opportunity for designers to innovate while minimizing environmental impact.",
      },
      {
        type: 'heading',
        content: 'Beyond Greenwashing',
      },
      {
        type: 'text',
        content: "True sustainability in design goes far beyond token gestures. It requires a holistic approach that considers the entire lifecycle of materials—from sourcing and manufacturing to use, reuse, and eventual disposal. This comprehensive perspective is essential for creating designs that genuinely reflect environmental values rather than merely projecting an eco-friendly image.",
      },
    ],
    relatedArticles: [
      'designing-retail-experiences',
      'architecture-as-narrative',
    ],
  },
  'immersive-digital-experiences': {
    title: 'Creating Immersive Digital Experiences',
    excerpt: 'The intersection of physical spaces and digital technology.',
    date: 'February 5, 2024',
    readTime: '7 min read',
    category: 'Digital Design',
    author: 'Antoine Lefèvre',
    heroImage: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
    content: [
      {
        type: 'text',
        content: "Digital technology has transformed how we interact with physical spaces. From augmented reality overlays to interactive installations, the boundaries between digital and physical experiences continue to blur. This article explores the latest innovations in creating immersive digital experiences that engage, inspire, and transform.",
      },
    ],
    relatedArticles: [
      'future-of-exhibition-design',
      'architecture-as-narrative',
    ],
  },
  'architecture-as-narrative': {
    title: 'Architecture as Narrative',
    excerpt: 'How architectural spaces can tell compelling stories.',
    date: 'January 20, 2024',
    readTime: '9 min read',
    category: 'Architecture',
    author: 'Sophie Laurent',
    heroImage: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
    content: [
      {
        type: 'text',
        content: "Architecture has always been more than just a functional arrangement of spaces; it's a medium for storytelling. The best architectural designs convey narratives through their form, materials, and the way they guide people through space. This article explores how contemporary architects are approaching their work as narrative designers, creating buildings that communicate stories, emotions, and ideas.",
      },
    ],
    relatedArticles: [
      'sustainability-in-design',
      'immersive-digital-experiences',
    ],
  },
};

export default function ClientInsightArticle({ params }: { params: { slug: string } }) {
  const [showWebGL, setShowWebGL] = useState(true);
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const { slug } = params;
  const articleData = articles[slug];

  if (!articleData) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto pt-32 pb-20 px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-4xl mb-6">Article Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/en/insights" className="px-6 py-3 bg-black text-white hover:bg-[#dcfb44] hover:text-black transition-colors">
            Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen ${isDark ? 'bg-background' : 'bg-[#ececec]'}`}>
      {showWebGL && <WebGLScene />}

      <Header />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link
            href="/en/insights"
            className="inline-flex items-center mb-8 text-black/70 hover:text-black transition-colors dark:text-white/70 dark:hover:text-white"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Insights
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">{articleData.title}</h1>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <time className="text-sm text-foreground/70">
                <Calendar size={14} className="inline mr-1" /> {articleData.date}
              </time>
              <span className="text-sm text-foreground/70">
                <Clock size={14} className="inline mr-1" /> {articleData.readTime}
              </span>
              <span className="text-sm bg-primary/20 px-2 py-0.5 rounded">
                <Tag size={14} className="inline mr-1" /> {articleData.category}
              </span>
            </div>
            <SocialShare
              url={`/en/insights/${params.slug}`}
              title={articleData.title}
              summary={articleData.excerpt}
            />
          </div>

          <div className="relative h-[400px] md:h-[500px] mb-12 overflow-hidden">
            <Image
              src={articleData.heroImage}
              alt={articleData.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="content space-y-8">
            {articleData.content.map((block: any, index: number) => {
              if (block.type === 'text') {
                return <p key={index} className="text-lg">{block.content}</p>;
              } else if (block.type === 'heading') {
                return <h2 key={index} className="text-2xl md:text-3xl font-medium mt-12 mb-6">{block.content}</h2>;
              } else if (block.type === 'image') {
                return (
                  <figure key={index} className="my-10">
                    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                      <Image
                        src={block.src}
                        alt={block.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-2 text-center text-sm text-black/70 dark:text-white/70 italic">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              } else if (block.type === 'quote') {
                return (
                  <blockquote key={index} className="border-l-4 border-[#dcfb44] pl-6 py-2 my-8 text-xl italic">
                    <p>{block.content}</p>
                    {block.author && (
                      <footer className="mt-2 text-black/70 dark:text-white/70 text-base not-italic">
                        — {block.author}
                      </footer>
                    )}
                  </blockquote>
                );
              }
              return null;
            })}
          </div>

          {articleData.relatedArticles && articleData.relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-black/10 dark:border-white/10">
              <h3 className="text-xl mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articleData.relatedArticles.map((relatedSlug: string) => {
                  const relatedArticle = articles[relatedSlug];
                  if (!relatedArticle) return null;

                  return (
                    <Link
                      key={relatedSlug}
                      href={`/en/insights/${relatedSlug}`}
                      className="group"
                    >
                      <div className="relative h-40 overflow-hidden mb-3">
                        <Image
                          src={relatedArticle.heroImage}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-opacity"></div>
                      </div>
                      <h4 className="text-lg font-medium group-hover:text-[#dcfb44] transition-colors">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-sm text-black/70 dark:text-white/70 mt-1">
                        {relatedArticle.date} · {relatedArticle.readTime}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
