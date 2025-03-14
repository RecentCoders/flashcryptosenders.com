import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * Dynamic sitemap generator that runs on a cron schedule
 * Generates XML sitemaps for the main site, images, and news (if applicable)
 */
export async function GET(request: Request) {
  // Basic auth check - would be more robust in production
  const authHeader = request.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  
  try {
    // Generate the main sitemap
    await generateMainSitemap();
    
    // Generate image sitemap (if needed)
    await generateImageSitemap();
    
    // Generate news sitemap (if applicable)
    await generateNewsSitemap();
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      message: 'Sitemaps generated successfully'
    });
  } catch (error) {
    console.error('Error generating sitemaps:', error);
    return new NextResponse('Error generating sitemaps', { status: 500 });
  }
}

/**
 * Generate the main sitemap.xml file
 */
async function generateMainSitemap() {
  // In a production environment, this would dynamically fetch all pages
  // For this example, we'll use a static list
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'weekly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' },
    { url: '/faq', priority: 0.6, changefreq: 'monthly' },
    // In production, would dynamically fetch blog posts, products, etc.
  ];
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flashcryptosenders.com';
  const currentDate = new Date().toISOString();
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add each page to the sitemap
  pages.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
    sitemap += `    <lastmod>${currentDate}</lastmod>\n`;
    sitemap += `    <changefreq>${page.changefreq}</changefreq>\n`;
    sitemap += `    <priority>${page.priority}</priority>\n`;
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  // Write the sitemap to the public directory
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
}

/**
 * Generate image sitemap for better image SEO
 */
async function generateImageSitemap() {
  // In production, would dynamically fetch all images
  const images = [
    { 
      pageUrl: '/', 
      images: [
        { 
          url: '/images/hero.jpg',
          caption: 'Flash Crypto Senders Home Banner',
          title: 'Fast and Secure Crypto Transfer'
        }
      ]
    },
    { 
      pageUrl: '/about', 
      images: [
        { 
          url: '/images/team.jpg',
          caption: 'Our Expert Team',
          title: 'Flash Crypto Senders Team'
        }
      ]
    }
  ];
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flashcryptosenders.com';
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  // Add each page with images to the sitemap
  images.forEach(page => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${page.pageUrl}</loc>\n`;
    
    // Add each image for this page
    page.images.forEach(image => {
      sitemap += '    <image:image>\n';
      sitemap += `      <image:loc>${baseUrl}${image.url}</image:loc>\n`;
      if (image.caption) sitemap += `      <image:caption>${image.caption}</image:caption>\n`;
      if (image.title) sitemap += `      <image:title>${image.title}</image:title>\n`;
      sitemap += '    </image:image>\n';
    });
    
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  // Write the image sitemap to the public directory
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'image-sitemap.xml'), sitemap);
}

/**
 * Generate news sitemap for news/blog articles
 */
async function generateNewsSitemap() {
  // In production, would dynamically fetch all news/blog posts
  const newsArticles = [
    { 
      url: '/blog/latest-crypto-trends-2023',
      title: 'Latest Crypto Trends in 2023',
      publicationDate: '2023-11-01T08:00:00+00:00',
      publicationName: 'Flash Crypto Senders Blog'
    },
    { 
      url: '/blog/secure-transfer-methods',
      title: 'Top Secure Transfer Methods for Cryptocurrencies',
      publicationDate: '2023-10-15T10:30:00+00:00',
      publicationName: 'Flash Crypto Senders Blog'
    }
  ];
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://flashcryptosenders.com';
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  sitemap += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';
  
  // Add each news article to the sitemap
  newsArticles.forEach(article => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${article.url}</loc>\n`;
    sitemap += '    <news:news>\n';
    sitemap += `      <news:publication>\n`;
    sitemap += `        <news:name>${article.publicationName}</news:name>\n`;
    sitemap += `        <news:language>en</news:language>\n`;
    sitemap += `      </news:publication>\n`;
    sitemap += `      <news:publication_date>${article.publicationDate}</news:publication_date>\n`;
    sitemap += `      <news:title>${article.title}</news:title>\n`;
    sitemap += '    </news:news>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  // Write the news sitemap to the public directory
  const publicDir = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicDir, 'news-sitemap.xml'), sitemap);
}
