// Sample projects data - in a real app this would come from a CMS or API
const projects = [
  { slug: 'gallery-installation' },
  { slug: 'retail-experience' },
  { slug: 'public-sculpture' },
  { slug: 'fashion-exhibit' },
  { slug: 'interactive-space' },
];

export function generateStaticParams() {
  return [
    { slug: 'mischief-restaurant' },
    { slug: 'audemars-piguet' },
    { slug: 'cartier-ww24' },
    { slug: 'louis-vuitton-after-show' },
    { slug: 'serie-9-table-lamp' },
    { slug: 'montblanc' },
    { slug: 'ferragamo' },
  ].concat(projects.map((project) => ({
    slug: project.slug,
  })));
}
