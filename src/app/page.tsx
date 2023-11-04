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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <p className={`ml-2`}>Askit</p>
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
