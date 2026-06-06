import { SITE_URL as BASE_URL } from '@/lib/site';

/**
 * Emits BreadcrumbList JSON-LD. `items` is an ordered array of { name, path }
 * from the site root down to the current page, e.g.
 *   [{ name: 'Home', path: '/' }, { name: 'Our Fleet', path: '/fleet' }]
 */
export default function BreadcrumbSchema({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
