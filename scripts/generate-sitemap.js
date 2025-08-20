/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

// Basic sitemap generator using the static route list.
// Adjust baseUrl to your deployed origin.
const baseUrl = process.env.SITEMAP_BASE_URL || 'https://www.miautozen.com';

// Static public routes; exclude auth-only or guest-only ones unless SEO-friendly
const routes = [
  '/',
  '/ayuda',
  '/recursos',
  '/sobre',
  '/contacto'
];

const urls = routes
  .map((r) => `  <url>\n    <loc>${baseUrl}${r}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.7'}</priority>\n  </url>`) 
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Sitemap written to ${outPath}`);

