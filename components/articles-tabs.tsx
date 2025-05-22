"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ArticlesTabs() {
  return (
    <Tabs defaultValue="generated" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-4">
        <TabsTrigger value="generated">Generated Articles</TabsTrigger>
        <TabsTrigger value="published">Published Articles</TabsTrigger>
        <TabsTrigger value="scheduled">Scheduled Articles</TabsTrigger>
        <TabsTrigger value="archived">Archived Articles</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
