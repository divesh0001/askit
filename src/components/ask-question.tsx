"use client";

import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";
import { ScrollArea } from "src/components/ui/scroll-area";
import { Separator } from "src/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import { Input } from "~/components/ui/input";

export default function AskQuestion({ isSignedIn }: { isSignedIn: boolean }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const createQuestion = api.post.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const [question, setQuestion] = useState<string>("");
  const { data: searchResultsData, isLoading: searchResultsLoading } =
    api.post.search.useQuery({
      question: question,
    });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (searchResultsData && searchResultsData.length > 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "This question has already been asked",
      });
      return;
    }

    if (question.length == 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Please enter a question",
      });
      return;
    }

    const target = event.target as typeof event.target & {
      description: { value: string };
    };
    const description = target.description.value;

    if (description.length == 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Please enter a description",
      });
      return;
    }

    try {
      await createQuestion.mutateAsync({
        question: question,
        description: description,
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
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className={`relative w-full max-w-2xl`}>
      <Textarea
        rows={1}
        className={`w-full p-4`}
        disabled={isLoading}
        name={`question`}
        onChange={(event) => {
          if (event.target.value.length == 0) {
            return;
          }
          setQuestion(event.target.value);
        }}
        id={`question`}
        placeholder="Start typing your query..."
      />

      <Dialog>
        <DialogTrigger
          className={`absolute right-4 top-3`}
          disabled={
            !isSignedIn ||
            question.length == 0 ||
            (searchResultsData && searchResultsData.length > 0)
          }
          asChild
        >
          <Button>Ask</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`mb-2`}>Post your question</DialogTitle>
            <DialogDescription>
              Post your question in a way that is easy to understand. Provide as
              much detail as possible.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Input
              className={`w-full`}
              placeholder={`Title of your question`}
              value={question}
            />
            <Textarea
              className={`mt-2 w-full`}
              rows={4}
              id={`description`}
              name={`description`}
              placeholder={`Description of your question`}
            />

            <Button className={`mt-4 w-full`} variant={`outline`}>
              Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {searchResultsData && question.length > 1 ? (
        <div>
          <ScrollArea className="w-full rounded-md border">
            <div className="fixed p-4">
              {searchResultsData.map((result) => (
                <>
                  <Button
                    variant={`ghost`}
                    key={result.title}
                    className="text-sm font-normal"
                  >
                    {result.title.charAt(0).toUpperCase() +
                      result.title.slice(1) +
                      " ?"}
                  </Button>
                  <Separator className="my-2" />
                </>
              ))}

              {searchResultsData.length == 0 ? (
                <div className="text-sm">No results found</div>
              ) : null}
            </div>
          </ScrollArea>
        </div>
      ) : null}

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
