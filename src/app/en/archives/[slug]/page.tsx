import { Metadata } from 'next';
import ClientProjectPage from './client-page';

// Sample projects data for static generation
const projects = [
  {
    slug: 'mischief-restaurant',
    title: 'MISCHIEF RESTAURANT',
    subtitle: 'Experiential Dining Space',
    description: 'A one-of-a-kind restaurant that combines innovative gastronomy with immersive design.',
    client: 'Mischief Group',
    location: 'Paris, France',
    year: '2024',
    category: 'Interior Design',
    heroImage: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
  },
  {
    slug: 'gallery-installation',
    title: 'LIGHT & SPACE',
    subtitle: 'Gallery Installation',
    description: 'An immersive light installation exploring perception and spatial awareness.',
    client: 'Contemporary Art Museum',
    location: 'Berlin, Germany',
    year: '2023',
    category: 'Installation',
    heroImage: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
  },
  {
    slug: 'retail-experience',
    title: 'FUTURE RETAIL',
    subtitle: 'Innovative Retail Experience',
    description: 'Reimagining the retail environment with digital integration and personalization.',
    client: 'Concept Stores Ltd.',
    location: 'London, UK',
    year: '2023',
    category: 'Retail Design',
    heroImage: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
  },
  {
    slug: 'public-sculpture',
    title: 'URBAN ECHO',
    subtitle: 'Public Installation',
    description: 'A public sculpture that responds to environmental data and human interaction.',
    client: 'City of Barcelona',
    location: 'Barcelona, Spain',
    year: '2022',
    category: 'Public Art',
    heroImage: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
  },
  {
    slug: 'fashion-exhibit',
    title: 'THREADS',
    subtitle: 'Fashion Exhibition',
    description: 'A retrospective exhibition examining the evolution of sustainable fashion.',
    client: 'Fashion Institute',
    location: 'Milan, Italy',
    year: '2022',
    category: 'Exhibition',
    heroImage: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
  },
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const project = projects.find(p => p.slug === params.slug);

  if (!project) {
    return {
      title: 'Project Not Found | ArtPill Studio',
      description: 'The requested project could not be found.',
    };
  }

  return {
    title: `${project.title} | ArtPill Studio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'article',
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [project.heroImage],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  return <ClientProjectPage params={params} />;
}
