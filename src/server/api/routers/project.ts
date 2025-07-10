import { appRouter, AppRouter } from './../root';
import { Input } from '~/components/ui/input';
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from './../trpc';
export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({
      name:z.string(),
      githubUrl: z.string(),
      githubToken:z.string().optional()
    }))
    .mutation(async ({ ctx, input }: { ctx: any; input: any }) => {
      console.log('input' , input)
      return true

    }),
});

export type AppRouter = typeof appRouter;