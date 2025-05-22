"use client"
import { Skeleton } from "@/components/ui/skeleton"

export function UserTableSkeleton() {
  return (
    <div className="theme-table-container">
      <table className="w-full theme-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Property</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Permission</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 10 }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full skeleton" />
                  <Skeleton className="h-4 w-24 skeleton" />
                </div>
              </td>
              <td>
                <Skeleton className="h-4 w-32 skeleton" />
              </td>
              <td>
                <Skeleton className="h-4 w-40 skeleton" />
              </td>
              <td>
                <Skeleton className="h-4 w-24 skeleton" />
              </td>
              <td>
                <Skeleton className="h-6 w-16 rounded-full skeleton" />
              </td>
              <td>
                <Skeleton className="h-6 w-16 rounded-full skeleton" />
              </td>
              <td>
                <Skeleton className="h-8 w-8 rounded-full skeleton" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="theme-table-footer">
        <Skeleton className="h-8 w-32 skeleton" />
        <div className="theme-pagination">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-8 rounded-md skeleton" />
          ))}
        </div>
        <Skeleton className="h-4 w-32 skeleton" />
      </div>
    </div>
  )
}
