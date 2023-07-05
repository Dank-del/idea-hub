'use client';
import {trpc} from "@/app/trpc";
import React from 'react';
import IdeaCard from "@/components/idea-card";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ideaFormSchema} from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

export default function IdeaGrid() {
  const ideasProcedure = trpc.getIdeas.useQuery();
  const form = useForm<z.infer<typeof ideaFormSchema>>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues: {
      title: "", content: ""
    }
  })
  const ideaProcedure = trpc.updateIdea.useMutation()
  const getMeQuery = trpc.getMe.useQuery()
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
      {ideasProcedure.data && (ideasProcedure.data.length > 0) && ideasProcedure.data.map(d => {
        return (
          <React.Suspense key={d.id} fallback={<>...</>}>
            <AlertDialog>
              <AlertDialogTrigger>
                <IdeaCard title={d.title} content={d.content} upvotes={34} downvotes={34} createdAt={d.createdAt}
                          comments={34}/>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{d.title}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {d.createdAt}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <p>
                  {d.content}
                </p>
                {getMeQuery?.data?.user.id === d.userId && <>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="update-form">
                      <AccordionTrigger>Edit Idea</AccordionTrigger>
                      <AccordionContent>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(async (data) => {
                            // Do something with the form values.
                            // ✅ This will be type-safe and validated.
                            console.log(data)
                            await ideaProcedure.mutateAsync({
                              title: data.title,
                              content: data.content,
                              id: d.id
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
                          })}>
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
                            <Button className="bg-green-600 text-white hover:bg-green-400" type="submit">Update</Button>
                          </form>
                        </Form>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>}
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </React.Suspense>
        )
      })}
    </div>
  )
}
