import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="mt-2 h-4 w-64" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="bento-grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-7 w-16" />
                <Skeleton className="mt-2 h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-md" />
          <div className="flex justify-end">
            <Skeleton className="h-10 w-full max-w-sm" />
          </div>
          <div className="rounded-md border">
            <div className="h-10 border-b px-6 py-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-full max-w-md" />
              </div>
            </div>
            <div className="p-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="mb-4 flex items-center justify-between">
                  <Skeleton className="h-6 w-full max-w-md" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
