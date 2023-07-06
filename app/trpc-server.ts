import {
  createIdeaProcedure,
  deleteIdeaProcedure,
  getIdeaProcedure,
  getIdeasProcedure,
  updateIdeaProcedure
} from "@/app/trpc/idea";
import {authenticatedProcedure, router} from "@/lib/trpc";


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
  getIdea: getIdeaProcedure
});

export type AppRouter = typeof appRouter;
