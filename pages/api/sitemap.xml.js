import { create } from 'xmlbuilder2';
import Storyblok from '../../storyblok-config';

const siteUrl = process.env.NEXT_PUBLIC_HOSTNAME;

export default async function handler(req, res) {
  console.log("Starting to fetch data from Storyblok...");
  try {
    const response = await Storyblok.get('cdn/links', {
      version: 'published',
      cv: Date.now()
    });

    const links = response.data.links;

    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });

    Object.values(links).filter(link => 
      link.published && !link.is_folder && 
      !link.slug.startsWith('global/') &&
      link.slug !== 'page404' &&
      !(link.slug.match(/\/home$/) && link.slug.split('/').length === 2)
    ).forEach(link => {
      // Trata 'home' para apontar para a raiz do site
      const loc = link.slug === 'home' ? `${siteUrl}/faq/` : `${siteUrl}${link.slug}`;
      const lastmod = link.published_at ? new Date(link.published_at).toISOString().split('T')[0] : undefined;

      console.log("Adding URL:", loc);
      const url = root.ele('url');
      url.ele('loc').txt(loc); // Ensure URLs are added as text content inside <loc> tags
      if (lastmod) {
        url.ele('lastmod').txt(lastmod);
      }
      url.ele('changefreq').txt('month');
    });

    const xml = root.end({ prettyPrint: true });

    res.setHeader('Content-Type', 'application/xml');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Failed to generate sitemap:', error);
    res.status(500).send('Internal Server Error. Check server logs for details.');
  }
}
