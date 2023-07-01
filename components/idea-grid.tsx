'use client';
import {trpc} from "@/app/trpc";
import React from 'react';
import {CardHeader, Card, CardDescription, CardTitle, CardContent} from "@/components/ui/card";

export default function IdeaGrid() {
  const ideasProcedure = trpc.getIdeas.useQuery();
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
      {ideasProcedure.data && (ideasProcedure.data.length > 0) && ideasProcedure.data.map(d => {
        return (
          <React.Suspense key={d.id} fallback={<>...</>}>
            <Card>
              <CardHeader>
                <CardTitle>{d.title}</CardTitle>
                <CardDescription>Created on {Intl.DateTimeFormat('en-US', {
                  dateStyle: 'full',
                  timeStyle: 'long',
                  timeZone: 'Asia/Kolkata'
                }).format(new Date(d.createdAt))}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{d.content}</p>
              </CardContent>
            </Card>
          </React.Suspense>
        )
      })}
    </div>
  )
}
