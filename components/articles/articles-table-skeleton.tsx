"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { useMediaQuery } from "@/hooks/use-media-query"

export function ArticlesTableSkeleton() {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Mobile card skeleton
  if (mounted && isMobile) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="overflow-hidden border-primary-100/30 dark:border-primary-800/30 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Skeleton className="h-5 w-full max-w-[250px] skeleton" />
                  <Skeleton className="mt-2 h-4 w-full max-w-[180px] skeleton" />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full skeleton" />
                    <Skeleton className="h-6 w-24 rounded-full skeleton" />
                    <Skeleton className="h-6 w-20 rounded-full skeleton" />
                  </div>
                </div>
                <Skeleton className="h-8 w-8 rounded-full skeleton" />
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Skeleton className="h-9 w-20 rounded-md skeleton" />
                <Skeleton className="h-9 w-20 rounded-md skeleton" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  // Desktop table skeleton
  return (
    <Card className="overflow-hidden border-primary-100/30 dark:border-primary-800/30 shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px]">
                  <Skeleton className="h-4 w-4 skeleton" />
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-24 skeleton" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-32 skeleton" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-16 skeleton" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center">
                    <Skeleton className="h-4 w-24 skeleton" />
                  </div>
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16 skeleton" />
                </TableHead>
                <TableHead>
                  <Skeleton className="h-4 w-16 skeleton" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 skeleton" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full max-w-[250px] skeleton" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-full max-w-[180px] skeleton" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-12 skeleton" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24 skeleton" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full skeleton" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-8 w-8 rounded-full skeleton" />
                      <Skeleton className="h-8 w-8 rounded-full skeleton" />
                      <Skeleton className="h-8 w-8 rounded-full skeleton" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between border-t border-primary-100/30 dark:border-primary-800/30 px-4 py-2">
          <Skeleton className="h-5 w-64 skeleton" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-md skeleton" />
            <Skeleton className="h-8 w-8 rounded-md skeleton" />
            <Skeleton className="h-8 w-20 rounded-md skeleton" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
