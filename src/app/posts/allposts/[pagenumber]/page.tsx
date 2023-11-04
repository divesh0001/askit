import { api } from "~/trpc/server";
import { PageWrapper } from "~/components/page-transition-wrapper";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import { Button } from "~/components/ui/button";

function howLongAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;

  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;

  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;

  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;

  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;

  if (seconds > 0) return `${seconds} second${seconds > 1 ? "s" : ""} ago`;

  return "just now";
}

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
            <p className={`text-muted-foreground`}>No more posts to show.</p>
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
