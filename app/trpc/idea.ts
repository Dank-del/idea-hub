import {z} from "zod";
import {authOptions, prisma} from "@/lib/auth";
import {getServerSession} from "next-auth";
import {publicProcedure} from "@/lib/trpc";


export const createIdeaProcedure = publicProcedure.input(z.object({
  title: z.string().min(10),
  content: z.string().min(30)
})).mutation(async (req) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return
  }
  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email!
    }
  })
  if (user) {
    return await prisma.idea.create({
      data: {
        title: req.input.title,
        content: req.input.content,
        userId: user.id
      }
    })
  }
})


export const getIdeasProcedure = publicProcedure.query(async (req) => {
  return await prisma.idea.findMany();
})

