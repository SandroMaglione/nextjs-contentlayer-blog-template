import { allPosts, Post } from "contentlayer/generated";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Head from "next/head";
import Link from "next/link";

// Generate static paths for all posts
export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
}

// Find post with matching slug and return it as props to the page
export async function getStaticProps({
  params,
}: GetStaticPropsContext): Promise<GetStaticPropsResult<{ post: Post }>> {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === params?.slug
  );

  // Redirect to homepage if post not found
  return typeof post === "undefined"
    ? {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    : {
        props: {
          post,
        },
      };
}

const PostLayout: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  // Get MDX component for post
  const Component = useMDXComponent(post.body.code);
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <article>
        {/* Link back to homepage */}
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>
        </div>

        {/* Display parsed markdown content */}
        <div>
          <h1>{post.title}</h1>
          <time dateTime={post.date}>{post.date}</time>
        </div>

        <Component />
      </article>
    </>
  );
};

export default PostLayout;
