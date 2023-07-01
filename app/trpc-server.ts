import {createIdeaProcedure, getIdeasProcedure} from "@/app/trpc/idea";
import {router} from "@/lib/trpc";


// this is our RPC API
export const appRouter = router({
  createNewIdea: createIdeaProcedure,
  getIdeas: getIdeasProcedure
});

export type AppRouter = typeof appRouter;
