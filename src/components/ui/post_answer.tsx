"use client";

import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/components/ui/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/components/ui/dialog";
import { Input } from "~/components/ui/input";

export default function PostAnswer({
  isSignedIn,
  postId,
}: {
  isSignedIn: boolean;
  postId: string;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const [textareaRows, setTextareaRows] = useState<number>(1);
  const postAnswer = api.ans.create.useMutation({
    onSuccess: () => {
      setIsLoading(false);
    },
  });

  const [answer, setAnswer] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (answer.length == 0) {
      setIsLoading(false);
      toast.toast({
        title: "Error",
        description: "Please enter some text..",
      });
      return;
    }

    const target = event.target as typeof event.target & {
      description: { value: string };
    };
    const description = target.description.value;

    target.description.value = "";

    try {
      await postAnswer.mutateAsync({
        answer: answer,
        description: description,
        postID: postId,
      });
      toast.toast({
        title: "Success",
        description: "Your answer has been submitted",
      });
    } catch (error) {
      toast.toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }

    setIsLoading(false);
    setAnswer("");
  };

  return (
    <div className={`relative mb-4 w-full`}>
      <Textarea
        rows={textareaRows}
        className={`relative h-10 w-full p-4 pr-20`}
        disabled={isLoading}
        name={`question`}
        onChange={(event) => {
          if (event.target.value.length == 0) {
            return;
          }
          setAnswer(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key == "Enter") {
            setTextareaRows(textareaRows + 1);
            return;
          }
        }}
        id={`answer`}
        placeholder="Give a brief about your answer here..."
      />

      <Dialog>
        <DialogTrigger
          className={`absolute right-4 top-3`}
          disabled={!isSignedIn || answer.length == 0}
          asChild
        >
          <Button>Submit</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={`mb-2`}>Post your answer</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <Input className={`w-full`} placeholder={``} value={answer} />
            <Textarea
              className={`mt-2 w-full`}
              rows={4}
              id={`description`}
              name={`description`}
              placeholder={`Describe your answer here...`}
            />

            {/* {selectedCategories.length > 0 ? (
              <div className={`my-4 rounded-xl border p-4`}>
                <p className={`text-sm font-bold`}>Selected Categories:</p>
                {selectedCategories.map((category) => (
                  <div
                    key={category}
                    className={`text-sm text-muted-foreground`}
                  >
                    {category},
                  </div>
                ))}
              </div>
            ) : null} */}

            {/* <div className={`mt-4 flex items-center`}>
              <Input
                placeholder={`Category`}
                className={`w-full`}
                onChange={(event) => {
                  setCurrentCategory(event.target.value);
                }}
                value={currentCategory}
              /> */}

            {/* <Button
                type={`button`}
                className={``}
                variant={`outline`}
                onClick={() => {
                  if (currentCategory.length == 0) {
                    return;
                  }
                  setSelectedCategories([
                    ...selectedCategories,
                    currentCategory,
                  ]);
                  setCurrentCategory("");
                }}
              >
                Add
              </Button> */}
            {/* </div> */}

            <Button
              type={`submit`}
              className={`mt-4 w-full`}
              variant={`outline`}
            >
              Post
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* {searchResultsData && question.length > 1 ? (
        <div className={`absolute w-full`}>
          <ScrollArea className="h-72 w-full rounded-md border">
            <div className="bg-background p-4">
              {searchResultsData.map((result) => (
                <>
                  <Button
                    variant={`ghost`}
                    key={result.title}
                    onClick={() => {
                      router.push(`/posts/${result.id}`);
                    }}
                    className="overflow-x-scroll text-sm font-normal"
                  >
                    {result.title.charAt(0).toUpperCase() +
                      result.title.slice(1)}
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
      ) : null} */}

      {/* <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog> */}

      <Toaster />
    </div>
  );
}
