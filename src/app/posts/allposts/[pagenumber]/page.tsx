import { api } from "~/trpc/server";
import { PageWrapper } from "~/components/page-transition-wrapper";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { howLongAgo } from "~/lib/utils";

export default async function PostsPage({
  params,
}: {
  params: { pagenumber: string };
}) {
  const pagenumber = parseInt(params.pagenumber ?? 0);
  const posts = await api.post.fetchAll.query({
    skip: pagenumber * 10,
    take: 10,
  });

  return (
    <PageWrapper className={`pt-16`}>
      <div className={`p-6`}>
        <h1 className={`mb-6 text-xl font-bold`}>Recent Posts</h1>
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}/`}>
            <div
              className={`mb-4 rounded-xl border p-6 transition-all duration-300 ease-in-out hover:cursor-pointer hover:border-primary`}
            >
              <div className={`mb-3 flex items-center justify-between`}>
                <h2 className={`font-bold`}>{post.title}</h2>
                <p className={`text-end text-sm text-muted-foreground`}>
                  {howLongAgo(post.createdAt)}
                </p>
              </div>
              <p className={`mb-2 line-clamp-3 text-muted-foreground`}>
                {post.description}
              </p>

              <div className={`space-x-2`}>
                {post.categories.length > 0 ? (
                  post.categories.map((category, index) => (
                    <Badge key={index} variant="outline">
                      {category}
                    </Badge>
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 ? (
          <div className={`flex min-h-[80dvh] items-center justify-center`}>
            <p className={`font-semibold text-muted-foreground`}>
              No more posts to show.
            </p>
          </div>
        ) : (
          <div className={`flex justify-center`}>
            <Link href={`/posts/allposts/${pagenumber - 1}`}>
              <Button className={`${pagenumber === 0 ? "hidden" : ""} mr-4`}>
                Previous
              </Button>
            </Link>
            <Link href={`/posts/allposts/${pagenumber + 1}`}>
              <Button>Next</Button>
            </Link>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
