import {z} from "zod";
import prisma from "@/lib/prisma";
import {authenticatedProcedure, publicProcedure} from "@/lib/trpc";
import {TRPCError} from "@trpc/server";


export const createIdeaProcedure = authenticatedProcedure
  .input(z.object({
    title: z.string().min(10),
    content: z.string().min(30),
  }))
  .mutation(async (req) => {
    return await prisma.idea.create({
      data: {
        title: req.input.title,
        content: req.input.content,
        userId: req.ctx.user.id,
      },
    });
  });



export const getIdeasProcedure = publicProcedure.query(async () => {
  return await prisma.idea.findMany();
})

export const getIdeaProcedure = authenticatedProcedure.input(z.string()).query(async (req) => {
  return await prisma.idea.findFirst({
    where: {
      id: req.input
    }
  });
})

export const deleteIdeaProcedure = authenticatedProcedure.input(z.string()).mutation(async (req) => {
  const idea = await prisma.idea.findFirst({
    where: {
      id: req.input
    }
  })
  if (!idea) {
    return {
      msg: "idea not found"
    }
  }
  if (idea.userId !== req.ctx.user.id) {
    return {
      msg: "this idea was not posted by you"
    }
  }
  return await prisma.idea.delete({
    where: {
      id: req.input
    }
  })
})



export const updateIdeaProcedure = authenticatedProcedure.input(z.object({
  title: z.string().min(10),
  content: z.string().min(30),
  id: z.string()
})).mutation(async (req) => {
  const idea = await prisma.idea.findFirst({
    where: {
      id: req.input.id
    },
  })
  if (!idea) {
    return {
      msg: "idea not found"
    }
  }
  if (idea.userId !== req.ctx.user.id) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'This idea was not posted by you',
    });
  }
  return await prisma.idea.update({
    where: {
      id: req.input.id
    },
    data: {
      title: req.input.title,
      content: req.input.content
    }
  })
})
