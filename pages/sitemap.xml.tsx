import { allPosts } from "contentlayer/generated";
import type { GetServerSidePropsContext } from "next/types";

const WEBSITE_URL = "https://www.example.com";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>${WEBSITE_URL}</loc></url>
    ${allPosts
      .map(({ url }) => `<url><loc>${WEBSITE_URL}${url}</loc></url>`)
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
