import { PageWrapper } from "~/components/page-transition-wrapper";
import { api } from "~/trpc/server";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import React from "react";
import GPTAnswer from "~/components/gpt-answer-generation";

export default async function PostPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await api.post.fetch.query({ id: params.id });

  if (!post) {
    return (
      <PageWrapper className={`flex min-h-screen items-center justify-center`}>
        <div>
          <h1 className={`mb-2 text-center text-2xl font-bold`}>
            Post not found
          </h1>
          <p>
            Maybe the id is wrong? 🤔
            <Link href={`/posts/`} className={`ml-4 underline`}>
              Go back
            </Link>
          </p>
        </div>
      </PageWrapper>
    );
  }

  const user = await api.user.fetch.query({ id: post.authorId ?? "" });

  return (
    <PageWrapper className={`pt-16`}>
      <div className={`p-10`}>
        <div className={`flex`}>
          {user?.name && (
            <div className={`px-6  pt-2`}>
              <Avatar>
                {user.image ? (
                  <AvatarImage src={user.image} />
                ) : (
                  <AvatarFallback className={`hover:border`}>
                    {user.name.charAt(0) + user.name.charAt(1)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
          )}
          <div>
            <h1 className={`mb-6 text-2xl font-bold`}>{post.title}</h1>
            <p className={"whitespace-pre-line"}>{post.description}</p>
          </div>
        </div>
        <GPTAnswer question={post.title} description={post.description} />

        <hr className={`my-6`} />
      </div>
    </PageWrapper>
  );
}
