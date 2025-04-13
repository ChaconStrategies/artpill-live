'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

// Sample insights articles data in French
const articles = [
  {
    id: 'designing-retail-experiences',
    title: 'Concevoir des expériences de vente au détail pour l\'ère post-COVID',
    excerpt: 'Comment les espaces commerciaux évoluent pour répondre aux nouvelles attentes des consommateurs dans un monde en mutation.',
    category: 'Design Retail',
    date: '12 Mai 2024',
    image: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
  },
  {
    id: 'sustainable-materials',
    title: 'Matériaux durables dans la conception d\'événements',
    excerpt: 'Explorer comment l\'utilisation de matériaux écologiques peut créer des expériences événementielles plus significatives et respectueuses de l\'environnement.',
    category: 'Durabilité',
    date: '3 Avril 2024',
    image: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
  },
  {
    id: 'architectural-lighting',
    title: 'L\'art de l\'éclairage architectural',
    excerpt: 'Comment l\'éclairage transforme l\'expérience spatiale et crée des ambiances distinctes dans l\'architecture moderne.',
    category: 'Architecture',
    date: '18 Mars 2024',
    image: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
  },
  {
    id: 'future-of-exhibitions',
    title: 'L\'avenir des expositions : Fusion du physique et du numérique',
    excerpt: 'Les tendances émergentes qui façonnent la façon dont nous concevons et expérimentons les expositions dans un monde de plus en plus connecté.',
    category: 'Expositions',
    date: '24 Février 2024',
    image: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
  },
];

export default function InsightsPage() {
  const [showWebGL, setShowWebGL] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(new Set(articles.map(article => article.category)));

  // Filter articles by category
  const filteredArticles = activeCategory
    ? articles.filter(article => article.category === activeCategory)
    : articles;

  return (
    <main className="min-h-screen">
      {showWebGL && <WebGLScene />}

      <Header />

      <div className="container mx-auto pt-32 pb-20 px-4 md:px-8">
        <h1 className="text-5xl md:text-7xl text-center mb-4">
          Aperçus
        </h1>
        <p className="text-center text-lg mb-16 max-w-2xl mx-auto">
          Nos réflexions sur le design, l'architecture, les événements et plus encore.
        </p>

        <div className="filters mb-12 flex flex-wrap justify-center gap-3">
          <button
            className={`px-4 py-2 rounded-full text-sm transition-colors ${activeCategory === null ? 'bg-[#dcfb44] text-black' : 'bg-black/5 hover:bg-black/10'}`}
            onClick={() => setActiveCategory(null)}
          >
            Tout
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${activeCategory === category ? 'bg-[#dcfb44] text-black' : 'bg-black/5 hover:bg-black/10'}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="bg-white/50 backdrop-blur-sm hover:bg-white transition-all duration-300 group">
              <Link href={`/fr/insights/${article.id}`}>
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4 bg-[#dcfb44] px-3 py-1 text-xs font-medium">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-black/60 mb-2">{article.date}</div>
                  <h2 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-[#dcfb44]/80 transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-black/70 mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-sm font-medium group-hover:text-[#dcfb44] transition-colors">
                    Lire la suite <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-black/50 italic">
            Abonnez-vous à notre newsletter pour recevoir les derniers aperçus directement dans votre boîte de réception.
          </p>
          <div className="mt-4 flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre adresse e-mail"
              className="flex-grow p-3 border border-black/10 focus:border-black/50 focus:outline-none bg-white/50"
            />
            <button className="px-6 py-3 bg-black text-white hover:bg-[#dcfb44] hover:text-black transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
