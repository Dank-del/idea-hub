import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowBigDown, ArrowBigUp, MessageCircle} from "lucide-react";
import React from "react";

export default function IdeaCard({title, createdAt, content, upvotes, downvotes, comments}: {
  title: string, createdAt: string, content: string, upvotes: number, downvotes: number, comments: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Created on {Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Asia/Kolkata'
        }).format(new Date(createdAt))}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2">
            <ArrowBigUp/>
            <p>{upvotes}</p>
          </div>
          <div className="flex flex-row gap-2">
            <ArrowBigDown/>
            <p>{downvotes}</p>
          </div>
          <div className="flex flex-row gap-2">
            <MessageCircle/>
            <p>{comments}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
