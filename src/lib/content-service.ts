/**
 * Content Service - Simulates a Headless CMS API
 * In a real application, this would connect to an actual CMS like Contentful, Sanity, or Strapi
 */

export interface Author {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface ArticleBlock {
  type: 'text' | 'heading' | 'subheading' | 'image' | 'quote' | 'list' | 'video';
  content: string;
  caption?: string;
  author?: string;
  items?: string[];
  alt?: string;
  src?: string;
  width?: number;
  height?: number;
}

export interface ArticleMetadata {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  heroImage: string;
  featured?: boolean;
  tags?: string[];
}

export interface Article extends ArticleMetadata {
  content: ArticleBlock[];
  relatedArticles: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  client?: string;
  year: string;
  category: string;
  location?: string;
  mainImage: string;
  gallery: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  description: string;
  challenge?: string;
  solution?: string;
  teamMembers?: string[];
  technologies?: string[];
  externalUrl?: string;
  relatedProjects?: string[];
  featured?: boolean;
}

// Mock authors data
const authors: Author[] = [
  {
    id: 'sophie-laurent',
    name: 'Sophie Laurent',
    role: 'Design Director',
    avatar: 'https://ext.same-assets.com/2157074176/3112358940.jpeg'
  },
  {
    id: 'thomas-renaud',
    name: 'Thomas Renaud',
    role: 'Creative Strategist',
    avatar: 'https://ext.same-assets.com/2157074176/3994874011.jpeg'
  },
  {
    id: 'claire-fontaine',
    name: 'Claire Fontaine',
    role: 'Lighting Designer',
    avatar: 'https://ext.same-assets.com/2157074176/2397584072.jpeg'
  },
  {
    id: 'jean-michel-dubois',
    name: 'Jean-Michel Dubois',
    role: 'Exhibition Designer',
    avatar: 'https://ext.same-assets.com/2157074176/3049481759.jpeg'
  }
];

// Mock categories data
const categories: Category[] = [
  {
    id: 'retail-design',
    name: 'Retail Design',
    slug: 'retail-design',
    description: 'Creating meaningful retail environments and experiences'
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    slug: 'sustainability',
    description: 'Sustainable practices and materials in design'
  },
  {
    id: 'architecture',
    name: 'Architecture',
    slug: 'architecture',
    description: 'Architectural concepts, projects, and innovations'
  },
  {
    id: 'exhibitions',
    name: 'Exhibitions',
    slug: 'exhibitions',
    description: 'Exhibition design and visitor experiences'
  },
  {
    id: 'event-design',
    name: 'Event Design',
    slug: 'event-design',
    description: 'Designing memorable events and experiences'
  },
  {
    id: 'product-design',
    name: 'Product Design',
    slug: 'product-design',
    description: 'Innovative product design and development'
  },
  {
    id: 'interior-design',
    name: 'Interior Design',
    slug: 'interior-design',
    description: 'Interior spaces and environments'
  },
  {
    id: 'installation',
    name: 'Installation',
    slug: 'installation',
    description: 'Art and design installations'
  }
];

// Mock articles data - simulating CMS content
const articles: Article[] = [
  {
    id: 'designing-retail-experiences',
    slug: 'designing-retail-experiences',
    title: 'Designing Retail Experiences for the Post-COVID Era',
    excerpt: 'How retail spaces are evolving to meet new consumer expectations in a changing world.',
    date: 'May 12, 2024',
    readTime: '8 min read',
    category: 'retail-design',
    author: 'sophie-laurent',
    heroImage: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
    featured: true,
    tags: ['retail', 'post-covid', 'design', 'experience'],
    content: [
      {
        type: 'text',
        content: "The retail landscape has undergone a seismic shift in recent years, accelerated by the global pandemic. As we emerge into this new era, retail design faces unprecedented challenges and opportunities. This article explores how physical retail spaces are being reimagined to thrive in the post-COVID world, balancing safety concerns with the fundamental human desire for connection and experience."
      },
      {
        type: 'heading',
        content: 'The Evolution of Retail Spaces'
      },
      {
        type: 'text',
        content: "For decades, retail design was driven by a single goal: maximize sales per square foot. Today, this metric alone is insufficient. Modern retail spaces must now balance efficiency with experience, safety with socialization, and digital integration with tactile discovery. The most successful retail environments now act as brand embassies rather than mere transaction points."
      },
      {
        type: 'image',
        content: '',
        src: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
        alt: 'Modern retail space with spacious layout',
        caption: 'Spacious layouts with natural materials create a sense of safety and well-being'
      },
      {
        type: 'heading',
        content: 'Hygiene as a Design Feature'
      },
      {
        type: 'text',
        content: "What began as temporary safety measures have evolved into core design principles. Touchless interactions, antimicrobial surfaces, and advanced air purification systems are now expected features rather than premium additions. The challenge for designers lies in integrating these elements seamlessly without creating spaces that feel clinical or sterile."
      },
      {
        type: 'heading',
        content: 'Blending Digital and Physical'
      },
      {
        type: 'text',
        content: "The line between e-commerce and physical retail continues to blur. Smart fitting rooms, augmented reality displays, and mobile integration points are becoming standard features of forward-thinking retail spaces. The most successful designs use technology to enhance rather than replace the physical experience, recognizing that digital tools work best when they solve real friction points in the customer journey."
      },
      {
        type: 'quote',
        content: "The future of retail is not physical or digital—it's a harmonious blend of both, creating experiences that can't be replicated online while embracing the convenience that technology provides.",
        author: 'Marc Dubois, Retail Innovation Director'
      },
      {
        type: 'image',
        content: '',
        src: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
        alt: 'Interactive digital display in retail setting',
        caption: 'Interactive displays enhance product exploration while minimizing physical contact'
      },
      {
        type: 'heading',
        content: 'Flexibility and Adaptability'
      },
      {
        type: 'text',
        content: "Perhaps the most important lesson from recent years is the value of adaptability. Retail spaces that can quickly transform to meet changing needs and circumstances demonstrate resilience. Modular fixtures, movable partitions, and multi-purpose areas allow retailers to pivot quickly—whether for social distancing requirements, seasonal changes, or special events."
      },
      {
        type: 'text',
        content: "At ArtPill Studio, we're working with brands to create retail environments that embrace these principles while maintaining strong aesthetic vision and brand identity. The result is spaces that feel both contemporary and timeless—ready for today's challenges and tomorrow's opportunities."
      },
      {
        type: 'heading',
        content: 'Looking Forward'
      },
      {
        type: 'text',
        content: "The retailers who will thrive in this new landscape are those who view recent disruptions not as temporary inconveniences but as catalysts for meaningful innovation. By embracing human-centered design principles, thoughtful technology integration, and flexible spatial concepts, brands can create retail experiences that resonate deeply with post-pandemic consumers."
      }
    ],
    relatedArticles: [
      'sustainable-materials',
      'future-of-exhibitions'
    ]
  },
  {
    id: 'sustainable-materials',
    slug: 'sustainable-materials',
    title: 'Sustainable Materials in Event Design',
    excerpt: 'Exploring how the use of eco-friendly materials can create more meaningful and environmentally responsible event experiences.',
    date: 'April 3, 2024',
    readTime: '6 min read',
    category: 'sustainability',
    author: 'thomas-renaud',
    heroImage: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
    tags: ['sustainability', 'events', 'materials', 'eco-friendly'],
    content: [
      {
        type: 'text',
        content: "In an era of increasing environmental awareness, event design is undergoing a profound transformation. Sustainable materials are no longer just a nice-to-have feature but a central consideration in creating meaningful, responsible experiences. This shift represents both a challenge and an opportunity for designers to innovate while minimizing environmental impact."
      },
      {
        type: 'heading',
        content: 'Beyond Greenwashing'
      },
      {
        type: 'text',
        content: "True sustainability in event design goes far beyond token gestures. It requires a holistic approach that considers the entire lifecycle of materials—from sourcing and manufacturing to use, reuse, and eventual disposal. This comprehensive perspective is essential for creating events that genuinely reflect environmental values rather than merely projecting an eco-friendly image."
      },
      {
        type: 'heading',
        content: 'Material Innovations'
      },
      {
        type: 'text',
        content: "The range of sustainable materials available to event designers has expanded dramatically in recent years. From biodegradable structures to recycled fabrics and compostable signage, the options for creating low-impact experiences continue to grow. These innovations allow designers to maintain high aesthetic standards while significantly reducing environmental footprint."
      },
      {
        type: 'image',
        content: '',
        src: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
        alt: 'Sustainable materials display',
        caption: 'Innovative sustainable materials create visual impact while minimizing environmental harm'
      },
      {
        type: 'text',
        content: "At ArtPill Studio, we're continually exploring and integrating these materials into our event designs, finding that sustainability often leads to more creative, distinctive solutions rather than limiting our options."
      }
    ],
    relatedArticles: [
      'designing-retail-experiences',
      'architectural-lighting'
    ]
  },
  {
    id: 'architectural-lighting',
    slug: 'architectural-lighting',
    title: 'The Art of Architectural Lighting',
    excerpt: 'How lighting transforms spatial experience and creates distinctive atmospheres in modern architecture.',
    date: 'March 18, 2024',
    readTime: '7 min read',
    category: 'architecture',
    author: 'claire-fontaine',
    heroImage: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
    tags: ['architecture', 'lighting', 'design', 'atmosphere'],
    content: [
      {
        type: 'text',
        content: "Architectural lighting stands at the fascinating intersection of technical precision and artistic expression. Far more than mere illumination, thoughtful lighting design has the power to completely transform how we perceive and experience space, influencing everything from our emotional response to our understanding of spatial dimensions and architectural intent."
      },
      {
        type: 'text',
        content: "This article explores how contemporary lighting design is shaping modern architecture, examining both the technical advancements and the creative approaches that define excellence in this field."
      }
    ],
    relatedArticles: [
      'sustainable-materials',
      'future-of-exhibitions'
    ]
  },
  {
    id: 'future-of-exhibitions',
    slug: 'future-of-exhibitions',
    title: 'The Future of Exhibitions: Blending Physical and Digital',
    excerpt: 'Emerging trends shaping how we design and experience exhibitions in an increasingly connected world.',
    date: 'February 24, 2024',
    readTime: '9 min read',
    category: 'exhibitions',
    author: 'jean-michel-dubois',
    heroImage: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
    featured: true,
    tags: ['exhibitions', 'digital', 'technology', 'hybrid'],
    content: [
      {
        type: 'text',
        content: "Exhibition design is undergoing a revolutionary transformation as digital technologies create new possibilities for engagement, education, and immersion. The traditional boundaries between physical installations and digital experiences are dissolving, giving rise to hybrid exhibitions that offer the best of both worlds."
      },
      {
        type: 'text',
        content: "This article examines how these emerging approaches are reshaping visitor experiences and offering designers unprecedented creative freedom."
      }
    ],
    relatedArticles: [
      'designing-retail-experiences',
      'architectural-lighting'
    ]
  },
  {
    id: 'luxury-hospitality-design',
    slug: 'luxury-hospitality-design',
    title: 'Redefining Luxury in Hospitality Design',
    excerpt: 'How the concept of luxury is evolving in hospitality spaces to meet changing expectations and values.',
    date: 'January 15, 2024',
    readTime: '10 min read',
    category: 'interior-design',
    author: 'sophie-laurent',
    heroImage: 'https://ext.same-assets.com/2157074176/2618432853.jpeg',
    featured: false,
    tags: ['hospitality', 'luxury', 'design', 'experience'],
    content: [
      {
        type: 'text',
        content: "The definition of luxury is undergoing a profound transformation in hospitality design. This evolution reflects broader shifts in consumer values, with an increasing emphasis on authentic experiences, sustainability, wellness, and meaningful connection."
      }
    ],
    relatedArticles: [
      'designing-retail-experiences',
      'architectural-lighting'
    ]
  }
];

// Mock projects data
const projects: Project[] = [
  {
    id: 'mischief-restaurant',
    slug: 'mischief-restaurant',
    title: 'MISCHIEF RESTAURANT',
    subtitle: 'A playful fine dining experience',
    client: 'Mischief Group',
    year: '2023',
    category: 'interior-design',
    location: 'Paris, France',
    mainImage: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
        alt: 'Mischief Restaurant Interior',
        width: 1200,
        height: 800
      },
      {
        src: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
        alt: 'Mischief Restaurant Dining Area',
        width: 1200,
        height: 800
      }
    ],
    description: 'A revolutionary dining concept that blends playful aesthetics with serious culinary craftsmanship. Our design creates unexpected moments of delight throughout the customer journey.',
    challenge: 'To create a space that embodies the playful spirit of the Mischief brand while maintaining the elegance expected in fine dining.',
    solution: 'We developed a concept based on contrasts—serious craftsmanship with whimsical presentation, traditional techniques with surprising twists. The space features custom furniture and lighting designed to create moments of surprise and delight.',
    teamMembers: ['Sophie Laurent', 'Thomas Renaud'],
    technologies: ['Custom furniture', 'Specialized lighting', 'Interactive elements'],
    featured: true
  },
  {
    id: 'audemars-piguet',
    slug: 'audemars-piguet',
    title: 'Audemars Piguet',
    subtitle: 'Horological Excellence Exhibition',
    client: 'Audemars Piguet',
    year: '2023',
    category: 'exhibitions',
    location: 'Geneva, Switzerland',
    mainImage: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
        alt: 'Audemars Piguet Exhibition',
        width: 1200,
        height: 800
      }
    ],
    description: 'An immersive exhibition celebrating the heritage and innovation of Swiss luxury watchmaker Audemars Piguet.',
    featured: true
  },
  {
    id: 'cartier-ww24',
    slug: 'cartier-ww24',
    title: 'Cartier WW24',
    subtitle: 'Watches & Wonders 2024',
    client: 'Cartier',
    year: '2024',
    category: 'event-design',
    location: 'Geneva, Switzerland',
    mainImage: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/1768823742.jpeg',
        alt: 'Cartier Watches & Wonders Booth',
        width: 1200,
        height: 800
      }
    ],
    description: 'A luxurious pavilion designed for Cartier's presence at Watches & Wonders 2024, blending brand heritage with contemporary design.',
    featured: false
  },
  {
    id: 'louis-vuitton-after-show',
    slug: 'louis-vuitton-after-show',
    title: 'Louis Vuitton After Show',
    subtitle: 'FW24 Collection Celebration',
    client: 'Louis Vuitton',
    year: '2023',
    category: 'event-design',
    location: 'Paris, France',
    mainImage: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/2730139936.jpeg',
        alt: 'Louis Vuitton After Show Event',
        width: 1200,
        height: 800
      }
    ],
    description: 'An exclusive after-show celebration following Louis Vuitton's Fall/Winter 2024 runway presentation.',
    featured: false
  },
  {
    id: 'serie-9-table-lamp',
    slug: 'serie-9-table-lamp',
    title: 'Serie 9 Table Lamp',
    subtitle: 'Sculptural lighting design',
    year: '2022',
    category: 'product-design',
    mainImage: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/2717469035.jpeg',
        alt: 'Serie 9 Table Lamp',
        width: 1200,
        height: 800
      }
    ],
    description: 'A minimalist table lamp that explores the relationship between light, material, and form.',
    featured: false
  },
  {
    id: 'montblanc',
    slug: 'montblanc',
    title: 'Montblanc',
    subtitle: 'Collection Launch Exhibition',
    client: 'Montblanc',
    year: '2023',
    category: 'exhibitions',
    location: 'Hamburg, Germany',
    mainImage: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/1533142913.jpeg',
        alt: 'Montblanc Exhibition',
        width: 1200,
        height: 800
      }
    ],
    description: 'An exhibition space designed to showcase Montblanc's heritage and craftsmanship through an immersive journey.',
    featured: true
  },
  {
    id: 'ferragamo',
    slug: 'ferragamo',
    title: 'Ferragamo',
    subtitle: 'Milan Design Week Installation',
    client: 'Ferragamo',
    year: '2023',
    category: 'installation',
    location: 'Milan, Italy',
    mainImage: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/1087224454.jpeg',
        alt: 'Ferragamo Installation',
        width: 1200,
        height: 800
      }
    ],
    description: 'A striking installation for Milan Design Week that explores the intersection of fashion and design through Ferragamo's lens.',
    featured: false
  },
  {
    id: 'hermes-window-display',
    slug: 'hermes-window-display',
    title: 'Hermès Window Display',
    subtitle: 'Seasonal window concept',
    client: 'Hermès',
    year: '2023',
    category: 'retail-design',
    location: 'Global',
    mainImage: 'https://ext.same-assets.com/2157074176/310819825.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/310819825.jpeg',
        alt: 'Hermès Window Display',
        width: 1200,
        height: 800
      }
    ],
    description: 'A globally implemented window display concept for Hermès that celebrates the brand's seasonal theme through sculptural storytelling.',
    featured: true
  },
  {
    id: 'dior-pop-up',
    slug: 'dior-pop-up',
    title: 'Dior Pop-Up',
    subtitle: 'Resort collection showcase',
    client: 'Dior',
    year: '2024',
    category: 'retail-design',
    location: 'Miami, USA',
    mainImage: 'https://ext.same-assets.com/2157074176/2618432853.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/2618432853.jpeg',
        alt: 'Dior Pop-Up Store',
        width: 1200,
        height: 800
      }
    ],
    description: 'A temporary retail environment created to showcase Dior's resort collection in a fresh, immersive context.',
    featured: false
  },
  {
    id: 'nyt-cooking-dinner',
    slug: 'nyt-cooking-dinner',
    title: 'NYT Cooking Dinner',
    subtitle: 'Experiential dining event',
    client: 'The New York Times',
    year: '2024',
    category: 'event-design',
    location: 'New York, USA',
    mainImage: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
    gallery: [
      {
        src: 'https://ext.same-assets.com/2157074176/580234126.jpeg',
        alt: 'NYT Cooking Dinner Event',
        width: 1200,
        height: 800
      }
    ],
    description: 'An experiential dining event that brings the NYT Cooking platform to life through carefully designed environments and touchpoints.',
    featured: true
  }
];

// Content service that mimics a real CMS API
class ContentService {
  // Articles methods
  async getAllArticles(): Promise<ArticleMetadata[]> {
    // In a real app, this would fetch from an API
    return articles.map(article => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      date: article.date,
      readTime: article.readTime,
      category: article.category,
      author: article.author,
      heroImage: article.heroImage,
      featured: article.featured,
      tags: article.tags
    }));
  }

  async getArticleBySlug(slug: string): Promise<Article | null> {
    // In a real app, this would fetch from an API
    const article = articles.find(article => article.slug === slug);
    return article || null;
  }

  async getFeaturedArticles(): Promise<ArticleMetadata[]> {
    // In a real app, this would fetch from an API
    return articles
      .filter(article => article.featured)
      .map(article => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        date: article.date,
        readTime: article.readTime,
        category: article.category,
        author: article.author,
        heroImage: article.heroImage,
        featured: article.featured,
        tags: article.tags
      }));
  }

  async getArticlesByCategory(categorySlug: string): Promise<ArticleMetadata[]> {
    // In a real app, this would fetch from an API
    return articles
      .filter(article => article.category === categorySlug)
      .map(article => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        date: article.date,
        readTime: article.readTime,
        category: article.category,
        author: article.author,
        heroImage: article.heroImage,
        featured: article.featured,
        tags: article.tags
      }));
  }

  // Projects methods
  async getAllProjects(): Promise<Project[]> {
    // In a real app, this would fetch from an API
    return projects;
  }

  async getProjectBySlug(slug: string): Promise<Project | null> {
    // In a real app, this would fetch from an API
    const project = projects.find(project => project.slug === slug);
    return project || null;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    // In a real app, this would fetch from an API
    return projects.filter(project => project.featured);
  }

  async getProjectsByCategory(categorySlug: string): Promise<Project[]> {
    // In a real app, this would fetch from an API
    return projects.filter(project => project.category === categorySlug);
  }

  // Authors methods
  async getAuthorById(id: string): Promise<Author | null> {
    // In a real app, this would fetch from an API
    const author = authors.find(author => author.id === id);
    return author || null;
  }

  async getAllAuthors(): Promise<Author[]> {
    // In a real app, this would fetch from an API
    return authors;
  }

  // Categories methods
  async getAllCategories(): Promise<Category[]> {
    // In a real app, this would fetch from an API
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    // In a real app, this would fetch from an API
    const category = categories.find(category => category.slug === slug);
    return category || null;
  }

  // Helper to simulate API latency
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create and export a singleton instance of the ContentService
const contentService = new ContentService();
export default contentService;
