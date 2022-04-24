import { allPosts, Post } from "contentlayer/generated";
import type {
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[] }>
> {
  return { props: { posts: allPosts } };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <div>
      <Head>
        <title>NextJs Content Layer Blog Template</title>
      </Head>

      {posts.map((post, idx) => (
        <div key={idx}>
          <Link href={post.url}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
