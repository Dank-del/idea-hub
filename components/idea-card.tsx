import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {ArrowBigDown, ArrowBigUp, MessageCircle} from "lucide-react";
import React from "react";
import {trpc} from "@/app/trpc";

export default function IdeaCard({userId, title, createdAt, content, upvotes, downvotes, comments}: {
  userId: string,
  title: string,
  createdAt: string,
  content: string,
  upvotes: number,
  downvotes: number,
  comments: number
}) {
  const user = trpc.getUser.useQuery(userId)
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title.substring(0, 13) + (title.length > 13 ? "...": "")}</CardTitle>
        <CardDescription>
          Created by
          <span className="tracking-tighter"> {user?.data?.name} </span>
          on {Intl.DateTimeFormat('en-US', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: 'Asia/Kolkata'
        }).format(new Date(createdAt))}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="break-words">{content.substring(0, 57).trimEnd() + (content.length > 57 ? "..." : "")}</p>
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
