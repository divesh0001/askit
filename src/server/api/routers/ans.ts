import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import * as z from "zod";

export const ansRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        answer: z.string(),
        description: z.string(),
        postID: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      if (!ctx.session.user || ctx.session.user.id === undefined) {
        throw new Error("Not logged in");
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
      return ctx.db.ans.create({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data: {
          title: input.answer,
          description: input.description,
          Post: {
            connect: {
              id: input.postID,
            },
          },
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  search: publicProcedure
    .input(
      z.object({
        question: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      if (input.question === "") return undefined;

      return ctx.db.post.findMany({
        where: {
          title: {
            contains: input.question,
            mode: "insensitive",
          },
        },
      });
    }),

  fetch: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      if (input.id === "") return undefined;

      if (input.id.length !== 24) return undefined;

      return ctx.db.ans.findMany({
        where: {
          postId: input.id,
        },
      });
    }),
});
