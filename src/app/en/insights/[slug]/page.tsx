import { Metadata } from 'next';
import ClientInsightArticle from './client-page';

// Sample articles data for static generation
const articles = [
  {
    slug: 'designing-retail-experiences',
    title: 'Designing Retail Experiences for the Post-COVID Era',
    excerpt: 'How retail spaces are evolving to meet new consumer expectations in a changing world.',
    date: 'May 12, 2024',
    readTime: '8 min read',
    category: 'Retail Design',
    author: 'Sophie Laurent',
    heroImage: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
  },
  {
    slug: 'future-of-exhibition-design',
    title: 'The Future of Exhibition Design',
    excerpt: 'New approaches to creating engaging and immersive exhibition experiences.',
    date: 'April 25, 2024',
    readTime: '6 min read',
    category: 'Exhibition Design',
    author: 'Jean Pascal',
    heroImage: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
  },
  {
    slug: 'sustainability-in-design',
    title: 'Sustainability in Design',
    excerpt: 'How designers are integrating sustainable practices into their work.',
    date: 'March 18, 2024',
    readTime: '5 min read',
    category: 'Sustainability',
    author: 'Marie Dubois',
    heroImage: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
  },
  {
    slug: 'immersive-digital-experiences',
    title: 'Creating Immersive Digital Experiences',
    excerpt: 'The intersection of physical spaces and digital technology.',
    date: 'February 5, 2024',
    readTime: '7 min read',
    category: 'Digital Design',
    author: 'Antoine Lefèvre',
    heroImage: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
  },
  {
    slug: 'architecture-as-narrative',
    title: 'Architecture as Narrative',
    excerpt: 'How architectural spaces can tell compelling stories.',
    date: 'January 20, 2024',
    readTime: '9 min read',
    category: 'Architecture',
    author: 'Sophie Laurent',
    heroImage: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
  },
];

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = articles.find(a => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Article Not Found | ArtPill Studio',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: `${article.title} | ArtPill Studio`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.heroImage],
    },
  };
}

export default function InsightArticlePage({ params }: { params: { slug: string } }) {
  return <ClientInsightArticle params={params} />;
}
