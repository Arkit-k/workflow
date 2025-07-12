import { Project, UserToProject } from './../../../../node_modules/.prisma/client/index.d';
import { appRouter, AppRouter } from './../root';
import { Input } from '~/components/ui/input';
import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from './../trpc';
import { TRPCError } from '@trpc/server'; // Add this import

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Project name is required"),
        githubUrl: z.string().url("Invalid GitHub URL"),
        githubToken: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const project = await ctx.db.$transaction(async (prisma) => {
          const user = await prisma.user.upsert({
            where: { clerkUserId: ctx.user.userId },
            create: {
              clerkUserId: ctx.user.userId,
              email: ctx.user.emailAddresses?.[0]?.emailAddress ?? "no-email@synced.com",
              credits: 150,
            },
            update: {},
          });

          return prisma.project.create({
            data: {
              name: input.name,
              githubUrl: input.githubUrl,
              UserToProject: {
                create: { userId: user.id },
              },
            },
          });
        });

        return project;
      } catch (error) {
        console.error("Project creation failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
        });
      }
    }),

  getProjects: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        // First get the user from the database using Clerk ID
        const user = await ctx.db.user.findUnique({
          where: { clerkUserId: ctx.user.userId }
        });

        if (!user) {
          return [];
        }

        return await ctx.db.project.findMany({
          where: {
            UserToProject: {
              some: {
                userId: user.id // Use the database user ID, not Clerk ID
              }
            },
            deletedAt: null
          },
          orderBy: {
            createdAt: 'desc'
          }
        }) || [];
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        return [];
      }
    }),
});

export type AppRouter = typeof appRouter;