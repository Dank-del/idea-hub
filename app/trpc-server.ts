import {
  createIdeaProcedure,
  deleteIdeaProcedure,
  getIdeaProcedure,
  getIdeasProcedure,
  updateIdeaProcedure
} from "@/app/trpc/idea";
import {z} from 'zod';
import {authenticatedProcedure, publicProcedure, router} from "@/lib/trpc";
import prisma from "@/lib/prisma";



// this is our RPC API
export const appRouter = router({
  createNewIdea: createIdeaProcedure,
  getIdeas: getIdeasProcedure,
  deleteIdea: deleteIdeaProcedure,
  updateIdea: updateIdeaProcedure,
  getMe: authenticatedProcedure.query(async (req) => {
    return {
      "user": req.ctx.user,
      "session": req.ctx.session
    }
  }),
  getIdea: getIdeaProcedure,
  getUser: publicProcedure.input(z.string()).query(async (req) => {
    const user = await prisma.user.findFirst({
      where: {
        id: req.input
      }
    })
    if (!user) {
      return
    }
    return {
      "name": user.name,
      "email": user.id,
      "img": user.image
    }
  })
});

export type AppRouter = typeof appRouter;
