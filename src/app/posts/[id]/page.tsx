import { PageWrapper } from "~/components/page-transition-wrapper";
import { api } from "~/trpc/server";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import React from "react";
import PostAnswer from "~/components/ui/post_answer";
import { getServerAuthSession } from "~/server/auth";
import GPTAnswer from "~/components/gpt-answer-generation";

export default async function PostPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const post = await api.post.fetch.query({ id: params.id });
  const allAnswers = await api.ans.fetch.query({ id: params.id });
  const session = await getServerAuthSession();

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
        <GPTAnswer
          question={post.title}
          description={post.description}
          isSignedIn={session !== null}
        />
        <hr className={`my-6`} />
        <PostAnswer isSignedIn={session !== null} postId={params.id} />
        {allAnswers && allAnswers.length > 0
          ? allAnswers.map((answer, index) => (
              <>
                <div
                  key={answer.id}
                  className={`my-6 flex items-center justify-start`}
                >
                  <p className={`mr-4`}>{index + 1}. </p>
                  <div>
                    <p className={``}>{answer.title}</p>
                    <p className={`text-muted-foreground`}>
                      {answer.description}
                    </p>
                  </div>
                </div>
                <hr className={`my-6`} />
              </>
            ))
          : null}
      </div>
    </PageWrapper>
  );
}
