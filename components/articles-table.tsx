"use client"

import { useState } from "react"
import { MoreHorizontal, ArrowUpDown, ChevronDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data based on the image
const articles = [
  {
    id: 1,
    title: "How to Improve Your Skills in League of Legends",
    keyword: "league of legends [2240000]",
    words: 4875,
    createdOn: "20 hours ago",
    published: false,
  },
  {
    id: 2,
    title: "How to Master Last Hitting in League of Legends",
    keyword: "league of legends [2240000]",
    words: 3480,
    createdOn: "21 hours ago",
    published: false,
  },
  {
    id: 3,
    title: "7 Tips for Better Teamplay in League of Legends",
    keyword: "league of legends [2240000]",
    words: 2676,
    createdOn: "a day ago",
    published: false,
  },
  {
    id: 4,
    title: "Top Virtual Executive Assistant Services (2024)",
    keyword: "virtual executive assistant [2900]",
    words: 2408,
    createdOn: "1 Oct, 24",
    published: false,
  },
  {
    id: 5,
    title: "Unlimited Graphics Design Solutions",
    keyword: "unlimited graphic design services [390]",
    words: 1793,
    createdOn: "—",
    published: false,
  },
  {
    id: 6,
    title: "Top Amazon Payment Methods for Quick Access to Funds",
    keyword: "amazon payment methods [3600]",
    words: 2647,
    createdOn: "—",
    published: false,
  },
  {
    id: 7,
    title: "Backlinks 101: What are backlinks and why they're important [Free template]",
    keyword: "backlinks [8100]",
    words: 2201,
    createdOn: "—",
    published: false,
  },
  {
    id: 8,
    title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)",
    keyword: "ai seo software [880]",
    words: 1543,
    createdOn: "—",
    published: false,
  },
  {
    id: 9,
    title: "Unlimited Graphic Design Services You Can Rely On",
    keyword: "unlimited graphic design services [390]",
    words: 1974,
    createdOn: "—",
    published: false,
  },
]

export function ArticlesTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const toggleAllRows = () => {
    setSelectedRows((prev) => (prev.length === articles.length ? [] : articles.map((article) => article.id)))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRows.length === articles.length && articles.length > 0}
                onCheckedChange={toggleAllRows}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Article Title
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Keyword [Traffic]
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Words
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Created On
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Publish</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRows.includes(article.id)}
                  onCheckedChange={() => toggleRow(article.id)}
                  aria-label={`Select row ${article.id}`}
                />
              </TableCell>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.keyword}</TableCell>
              <TableCell>{article.words}</TableCell>
              <TableCell>{article.createdOn}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-blue-500"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Total <span className="font-medium">9</span> Article Titles | Show
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-1 h-8">
                10 <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                10 <Check className="ml-auto h-4 w-4" />
              </DropdownMenuItem>
              <DropdownMenuItem>25</DropdownMenuItem>
              <DropdownMenuItem>50</DropdownMenuItem>
              <DropdownMenuItem>100</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          entries per page
        </div>
        <div className="text-sm">1 / 1</div>
      </div>
    </div>
  )
}
