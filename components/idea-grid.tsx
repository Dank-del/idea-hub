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
import UpdateIdeaForm from "@/components/update-idea-form";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function IdeaGrid() {
  const ideasProcedure = trpc.getIdeas.useQuery();
  const getMeQuery = trpc.getMe.useQuery()
  const deleteMutation = trpc.deleteIdea.useMutation();
  const onDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
      {ideasProcedure.data && (ideasProcedure.data.length > 0) && ideasProcedure.data.map(d => {
        return (
          <React.Suspense key={d.id} fallback={<>...</>}>
            <AlertDialog>
              <AlertDialogTrigger>
                <IdeaCard userId={d.userId} title={d.title}
                          content={d.content}
                          upvotes={34}
                          downvotes={34}
                          createdAt={d.createdAt}
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
                        <UpdateIdeaForm ideaId={d.id}/>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </>}
                <Accordion type="single" collapsible>
                  <AccordionItem value="update-form">
                    <AccordionTrigger>Comments</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-5">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/avatars/01.png"/>
                            <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">Sofia Davis</p>
                            <p className="text-xs text-muted-foreground">m@example.com</p>
                            <p className="text-sm">This is a comment</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/avatars/01.png"/>
                            <AvatarFallback>OM</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium leading-none">Mahesh</p>
                            <p className="text-xs text-muted-foreground">mahesh@example.com</p>
                            <p className="text-sm">great post</p>
                          </div>
                        </div>
                      </div>
                      <form onSubmit={async (e) => {e.preventDefault()}}>
                        <Input className="mt-6" placeholder={`Comment as ${getMeQuery?.data?.user?.name}`}/>
                        <Button className="mt-3" type="submit">Post Comment</Button>
                      </form>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  {getMeQuery?.data?.user.id === d.userId &&
                    <AlertDialogAction
                      onClick={async () => await onDelete(d.id)}
                      className="bg-red-600 text-white">Delete
                    </AlertDialogAction>}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </React.Suspense>
        )
      })}
    </div>
  )
}
