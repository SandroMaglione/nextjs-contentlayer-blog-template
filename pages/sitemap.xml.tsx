import { allPosts } from "contentlayer/generated";
import type { GetServerSidePropsContext } from "next/types";

// TODO: Change this with your website URL
const WEBSITE_URL = "https://www.example.com";

// TODO: You could add a custom `priority` and `changefreq` for each page
// https://www.sitemaps.org/protocol.html
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${WEBSITE_URL}</loc></url>
    ${allPosts
      .map(
        ({ url, date }) => `<url>
      <loc>${WEBSITE_URL}${url}</loc>
      <lastmod>${date}</lastmod>
      <priority>1.00</priority>
      <changefreq>monthly</changefreq>
      </url>`
      )
      .join("\n")}
    </urlset>`;

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  if (res) {
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  }

  return { props: {} };
}

const Sitemap: React.FC = () => null;
export default Sitemap;
