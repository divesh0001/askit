"use client";

import React from "react";
import { api } from "~/trpc/react";
import { Icons } from "~/components/loading-spinner";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function AnsAuthor({ authorId }: { authorId: string }) {
  const user = api.user.fetch.useQuery({ id: authorId });

  if (user.isLoading || !user.data) {
    return <Icons.spinner />;
  }

  return (
    <div className={`mt-4`}>
      {user?.data?.name && (
        <Avatar>
          {user.data.image ? (
            <AvatarImage src={user.data.image} />
          ) : (
            <AvatarFallback className={`hover:border`}>
              {user.data.name.charAt(0) + user.data.name.charAt(1)}
            </AvatarFallback>
          )}
        </Avatar>
      )}
    </div>
  );
}