// Sample insights data - in a real app this would come from a CMS or API
const articles = [
  { slug: 'designing-retail-experiences' },
  { slug: 'future-of-exhibition-design' },
  { slug: 'sustainability-in-design' },
  { slug: 'immersive-digital-experiences' },
  { slug: 'architecture-as-narrative' },
];

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default generateStaticParams;
