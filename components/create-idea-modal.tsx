import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {useForm} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ideaFormSchema} from "@/lib/schemas";
import {trpc} from "@/app/trpc";


export default function CreateIdeaModal() {
  const form = useForm<z.infer<typeof ideaFormSchema>>({
    resolver: zodResolver(ideaFormSchema),
    defaultValues: {
      title: "", content: ""
    }
  })
  const ideaProcedure = trpc.createNewIdea.useMutation()

  async function onSubmit(values: z.infer<typeof ideaFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    await ideaProcedure.mutateAsync({
      title: values.title,
      content: values.content
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
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
        >
          <Icons.plus className="mr-2"/>
          Create
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Idea</AlertDialogTitle>
          <AlertDialogDescription>
            Enter Idea details
          </AlertDialogDescription>
        </AlertDialogHeader>
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
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-red-600 text-white hover:bg-red-400">Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
