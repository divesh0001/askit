"use client";

import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useState} from "react";
import { Icons } from "~/components/loading-spinner";
import { api } from "~/trpc/react";
import {Toaster} from "~/components/ui/toaster";
import {useToast} from "~/components/ui/use-toast";

export default function AskQuestion() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const createQuestion = api.post.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const [question, setQuestion] = useState<string>("");
  const {data: searchResultsData, isLoading: searchResultsLoading} = api.post.search.useQuery({
    question: question
  })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if(searchResultsData && searchResultsData.length > 0) {
        setIsLoading(false);
        toast.toast({
            title: "Error",
            description: "This question has already been asked"
        });
        return
    }

    if(question.length == 0) {
        setIsLoading(false);
        toast.toast({
            title: "Error",
            description: "Please enter a question"
        });
        return
    }

    try {
      await createQuestion.mutateAsync({
        question: question,
      });
      setIsLoading(false);
      toast.toast({
        title: "Success",
        description: "Your question has been submitted",
      });
    } catch (error) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Something went wrong. Please try again."
      });
    }
  }

  return (
    <form
      className={`relative w-full max-w-2xl`}
      onSubmit={handleSubmit}
    >
      <Textarea
        rows={1}
        className={`w-full p-4`}
        disabled={isLoading}
        name={`question`}
        onChange={(event) => {
          if (event.target.value.length == 0) {
            return
          }
          setQuestion(event.target.value)
        }}
        id={`question`}
        placeholder="Start typing your query..."
      />
      <Button className={`absolute right-4 top-3`} disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <p>Ask</p>
        )}
      </Button>

      {
        searchResultsData && JSON.stringify(searchResultsData.map((result) => result.title))
      }

      <Toaster />
    </form>
  );
}
