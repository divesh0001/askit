"use client";

import { ModeToggle } from "~/components/appearance-toggle";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  // get last word of pathname
  const path = pathname.split("/").pop();

  return (
    <nav
      className={`absolute z-20 flex w-full items-center justify-between border-b px-4 py-3`}
    >
      <h3 className={`text-lg font-bold`}>Askit</h3>
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
