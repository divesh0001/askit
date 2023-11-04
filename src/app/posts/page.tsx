import { api } from "~/trpc/server";
import { PageWrapper } from "~/components/page-transition-wrapper";

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

export default async function PostsPage() {
  const posts = await api.post.fetch.query();

  return (
    <PageWrapper className={`pt-16`}>
      <div className={`p-6`}>
        <h1 className={`mb-6 text-xl font-bold`}>Recent Posts</h1>
        {posts.map((post) => (
          <div
            key={post.id}
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
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
