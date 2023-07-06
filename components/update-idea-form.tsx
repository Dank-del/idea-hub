import {useForm} from "react-hook-form";
import {z} from "zod";
import {ideaFormSchema} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import React from "react";
import {trpc} from "@/app/trpc";

export default function UpdateIdeaForm({ideaId}: {ideaId: string}) {
  const getIdeaQuery = trpc.getIdea.useQuery(ideaId);
  const form = useForm<z.infer<typeof ideaFormSchema>>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues: {
      title: getIdeaQuery?.data?.title, content: getIdeaQuery?.data?.content
    }
  })
  const ideaProcedure = trpc.updateIdea.useMutation();
  const onSubmit = async (data: z.infer<typeof ideaFormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(data)
    await ideaProcedure.mutateAsync({
      title: data.title,
      content: data.content,
      id: ideaId
    })
    // Create the escape key press event
    const escapeEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      which: 27,
      bubbles: true,
    });

    // Dispatch the event on the document
    document.dispatchEvent(escapeEvent);
  };

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
                <Input placeholder="Idea title"{...field} />
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
        <Button className="bg-green-600 text-white hover:bg-green-400" type="submit">Update</Button>
      </form>
    </Form>
  )
}
