import { SITE_URL as BASE_URL } from '@/lib/site';

export default function sitemap() {
  const lastModified = new Date();

  const routes = [
    { path: '', changeFrequency: 'weekly', priority: 1.0 },
    { path: 'services', changeFrequency: 'monthly', priority: 0.8 },
    { path: 'book', changeFrequency: 'monthly', priority: 0.8 },
    { path: 'fleet', changeFrequency: 'monthly', priority: 0.8 },
    { path: 'areas', changeFrequency: 'monthly', priority: 0.7 },
    { path: 'how-it-works', changeFrequency: 'monthly', priority: 0.6 },
    { path: 'why-us', changeFrequency: 'monthly', priority: 0.6 },
    { path: 'gallery', changeFrequency: 'monthly', priority: 0.6 },
    { path: 'faq', changeFrequency: 'monthly', priority: 0.6 },
    { path: 'about', changeFrequency: 'monthly', priority: 0.6 },
    { path: 'contact', changeFrequency: 'monthly', priority: 0.6 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path ? `${BASE_URL}/${path}` : BASE_URL,
    lastModified,
    changeFrequency,
    priority,
  }));
}
