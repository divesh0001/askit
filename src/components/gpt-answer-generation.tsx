"use client";

import { Button } from "~/components/ui/button";
import { BsStars } from "react-icons/bs";
import React from "react";
import { api } from "~/trpc/react";
import { Icons } from "~/components/loading-spinner";

export default function GPTAnswer({
  question,
  description,
}: {
  question: string;
  description: string;
}) {
  const [prompt, setPrompt] = React.useState<string>("");
  const gptResponse = api.gpt.create.useQuery({
    prompt: prompt,
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div className={`mt-4 flex flex-col items-center justify-end`}>
      <Button
        onClick={() => {
          setLoading(true);
          setPrompt(
            "Question: " +
              question +
              "\nDescription: " +
              description +
              "\nAnswer:",
          );
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }}
        disabled={loading}
      >
        Generate Answer with AI{" "}
        {loading ? (
          <Icons.spinner className={`ml-2 animate-spin`} />
        ) : (
          <BsStars className={`ml-2`} />
        )}
      </Button>
      {gptResponse.data && (
        <div className={`my-8 rounded-xl bg-muted p-4`}>
          AI Answer:
          <p className={`text-sm text-muted-foreground`}>
            {gptResponse.data.text}
          </p>
        </div>
      )}
    </div>
  );
}
