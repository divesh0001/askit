import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import SignoutButton from "~/components/signout-button";
import { PageWrapper } from "~/components/page-transition-wrapper";
import AskQuestion from "~/components/ask-question";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <PageWrapper>
      <main className="flex min-h-screen flex-col items-center justify-center space-y-6">
        <div className={`text-center`}>
          <h1 className="mb-2 flex items-center justify-center text-4xl font-bold">
            Askit
          </h1>
          <h2 className="text-base">Got any questions? Just Askit!</h2>
        </div>
        <div className={`flex w-full items-center justify-center px-4`}>
          <AskQuestion isSignedIn={session !== null} />
        </div>
        {session !== null ? (
          <>
            <p className={`text-sm text-gray-500`}>
              Logged in as {session.user.name} |{" "}
              <SignoutButton className={`text-foreground hover:underline`} />
            </p>
          </>
        ) : (
          <p className={`text-sm text-gray-500`}>
            You are not logged in. |{" "}
            <Link
              href="/auth/signup"
              className={`text-foreground hover:underline`}
            >
              Signup
            </Link>
          </p>
        )}
      </main>
    </PageWrapper>
  );
}
