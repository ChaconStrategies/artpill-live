'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import { useTheme } from '@/lib/theme-context';
import dynamic from 'next/dynamic';

// Import WebGLScene dynamically to prevent SSR issues
const WebGLScene = dynamic(() => import('@/components/webgl-scene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-[#ececec]"></div>
});

// Archive projects data (mock data for demonstration)
const projectsData = {
  'mischief-restaurant': {
    title: 'MISCHIEF RESTAURANT',
    subtitle: 'Experiential Dining Space',
    description: 'A one-of-a-kind restaurant that combines innovative gastronomy with immersive design. The space features rich, warm tones and carefully crafted lighting to create an intimate atmosphere.',
    client: 'Mischief Group',
    location: 'Paris, France',
    year: '2024',
    services: ['Interior Design', 'Lighting Design', 'Brand Identity'],
    category: 'Interior Design',
    mainImage: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
    images: [
      'https://ext.same-assets.com/2157074176/2730139936.jpeg',
      'https://ext.same-assets.com/2157074176/2491344241.jpeg',
    ]
  },
  'gallery-installation': {
    title: 'LIGHT & SPACE',
    subtitle: 'Gallery Installation',
    description: 'An immersive light installation exploring perception and spatial awareness. This interactive artwork uses light, reflection, and transparency to create spaces that shift as visitors move through them.',
    client: 'Contemporary Art Museum',
    location: 'Berlin, Germany',
    year: '2023',
    services: ['Installation Design', 'Lighting Design', 'Interactive Elements'],
    category: 'Installation',
    mainImage: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
    images: [
      'https://ext.same-assets.com/2157074176/1768823742.jpeg',
    ]
  },
  'retail-experience': {
    title: 'FUTURE RETAIL',
    subtitle: 'Innovative Retail Experience',
    description: 'Reimagining the retail environment with digital integration and personalization. This concept store blends physical and digital touchpoints to create a seamless shopping journey.',
    client: 'Concept Stores Ltd.',
    location: 'London, UK',
    year: '2023',
    services: ['Retail Design', 'Digital Integration', 'Spatial Design'],
    category: 'Retail Design',
    mainImage: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
    images: [
      'https://ext.same-assets.com/2157074176/1533142913.jpeg',
    ]
  },
  'public-sculpture': {
    title: 'URBAN ECHO',
    subtitle: 'Public Installation',
    description: 'A public sculpture that responds to environmental data and human interaction. The installation collects data on air quality, noise levels, and human movement, translating this information into an ever-changing light display.',
    client: 'City of Barcelona',
    location: 'Barcelona, Spain',
    year: '2022',
    services: ['Public Art', 'Data Visualization', 'Urban Design'],
    category: 'Public Art',
    mainImage: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
    images: [
      'https://ext.same-assets.com/2157074176/1087224454.jpeg',
    ]
  },
  'fashion-exhibit': {
    title: 'THREADS',
    subtitle: 'Fashion Exhibition',
    description: 'A retrospective exhibition examining the evolution of sustainable fashion. The exhibition spaces were designed using recycled and biodegradable materials, creating a cohesive narrative around sustainability.',
    client: 'Fashion Institute',
    location: 'Milan, Italy',
    year: '2022',
    services: ['Exhibition Design', 'Environmental Design', 'Content Curation'],
    category: 'Exhibition',
    mainImage: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
    images: [
      'https://ext.same-assets.com/2157074176/580234126.jpeg',
    ]
  },
};

export default function ClientProjectPage({ params }: { params: { slug: string } }) {
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { colorScheme } = useTheme();
  const isDark = colorScheme === 'dark';
  const [showWebGL, setShowWebGL] = useState(true);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // Get project data from the slug
  const projectId = params.slug;
  const project = projectsData[projectId as keyof typeof projectsData];

  if (!project) {
    return (
      <main className={`min-h-screen ${isDark ? 'bg-background' : 'bg-[#ececec]'}`}>
        <Header />
        <div className="pt-32 px-6 text-center">
          <h1 className="text-3xl mb-6">Project Not Found</h1>
          <Link
            href="/en/archives"
            className="px-6 py-3 border border-black/30 dark:border-white/30 hover:bg-[#dcfb44] hover:text-black hover:border-transparent transition-colors"
          >
            Back to Archives
          </Link>
        </div>
      </main>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <main className={`min-h-screen ${isDark ? 'bg-background' : 'bg-[#ececec]'}`}>
      {showWebGL && <WebGLScene />}
      <Header />

      <div className={`pt-24 min-h-screen transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Project Header */}
          <div className="mb-16">
            <Link
              href="/en/archives"
              className="text-sm mb-8 inline-block hover:underline dark:text-white/70 dark:hover:text-white"
            >
              ← Back to Archives
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-3">{project.title}</h1>
            <h2 className="text-xl md:text-2xl font-light">{project.subtitle}</h2>
          </div>

          {/* Project Gallery */}
          <div className="mb-16 relative">
            <div className="w-full aspect-[16/9] relative overflow-hidden">
              <Image
                src={project.images[currentImageIndex]}
                alt={project.title}
                fill
                className="object-cover transition-opacity duration-500"
                crossOrigin="anonymous"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                    aria-label="Next image"
                  >
                    →
                  </button>

                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                        aria-label={`View image ${i + 1}`}
                      ></button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <div>
              <h3 className="text-lg mb-4 font-medium">About the Project</h3>
              <p className="text-base font-light leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="space-y-3">
                <div className="flex">
                  <span className="w-24 font-medium">Client:</span>
                  <span className="font-light">{project.client}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium">Location:</span>
                  <span className="font-light">{project.location}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium">Year:</span>
                  <span className="font-light">{project.year}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-medium">Category:</span>
                  <span className="font-light">{project.category}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg mb-4 font-medium">Services</h3>
              <ul className="space-y-2 font-light">
                {project.services.map((service, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-[#dcfb44] mr-2">•</span>
                    {service}
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <Link
                  href="/en/contact"
                  className="px-6 py-3 border border-black/30 dark:border-white/30 inline-block hover:bg-[#dcfb44] hover:text-black hover:border-transparent transition-colors"
                >
                  Work with us
                </Link>
              </div>
            </div>
          </div>

          {/* Next Projects */}
          <div className="border-t border-black/10 dark:border-white/10 pt-12">
            <h3 className="text-2xl mb-8">Explore Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(projectsData)
                .filter(([id]) => id !== projectId)
                .slice(0, 3)
                .map(([id, project]) => (
                  <Link href={`/en/archives/${id}`} key={id} className="group">
                    <div className="w-full aspect-square relative overflow-hidden mb-4">
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h4 className="text-lg group-hover:text-[#dcfb44] transition-colors">{project.title}</h4>
                    <p className="text-sm font-light">{project.subtitle}</p>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
