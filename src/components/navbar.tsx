"use client";

import { ModeToggle } from "~/components/appearance-toggle";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NavBar() {
  const pathname = usePathname();

  // get last word of pathname
  const path = pathname.split("/").pop();

  return (
    <nav
      className={`absolute z-20 flex w-full items-center justify-between border-b px-4 py-3`}
    >
      <Button
        variant={`ghost`}
        className={`flex items-center justify-center text-lg font-bold`}
        onClick={() => {
          window.location.href = "/";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        <p className={`ml-2`}>Askit</p>
      </Button>
      <div className={`flex items-center space-x-4`}>
        <ul
          className={`flex items-center space-x-4 text-sm text-foreground/70 backdrop-blur transition-all ease-in-out`}
        >
          <Link href={`/`} className={`hover:text-foreground`}>
            Home
          </Link>
          {(path === "signup" || path === "signin") &&
            (path === "signup" ? (
              <Link href={`/auth/signin`} className={`hover:text-foreground`}>
                Signin
              </Link>
            ) : (
              <Link href={`/auth/signup`} className={`hover:text-foreground`}>
                Signup
              </Link>
            ))}
        </ul>
        <ModeToggle />
      </div>
    </nav>
  );
}
