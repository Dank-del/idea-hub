'use server';
import {useSession} from "next-auth/react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ideaFormSchema} from "@/lib/schemas";
import {PrismaClient} from "@prisma/client";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import * as React from "react";

async function addNewIdea(data: z.infer<typeof ideaFormSchema>, email: string) {
  'use server'
  const prisma = new PrismaClient();
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
  if (user) {
    await prisma.idea.create({
      data: {
        title: data.title,
        content: data.content,
        userId: user.id
      }
    })
  }
}


export default async function CreateIdeaForm() {
  const {data} = useSession()
  const form = useForm<z.infer<typeof ideaFormSchema>>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues: {
      title: "", content: ""
    }
  })

  async function onSubmit(values: z.infer<typeof ideaFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await addNewIdea(values, data?.user?.email!)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({field}) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Idea title" {...field} />
              </FormControl>
              <FormDescription>This is the title of your idea.</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({field}) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Idea content" {...field} />
              </FormControl>
              <FormDescription>This is the description of your idea</FormDescription>
              <FormMessage/>
            </FormItem>
          )}
        />
        <Button className="bg-green-600 text-white hover:bg-green-400" type="submit">Submit</Button>
      </form>
    </Form>
  )
}
