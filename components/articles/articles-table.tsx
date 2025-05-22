"use client"

import { useState } from "react"
import {
  Eye,
  FileEdit,
  MoreHorizontal,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Trash2,
  Copy,
  Archive,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useMediaQuery } from "@/hooks/use-media-query"

interface Article {
  id: string
  title: string
  keyword: string
  traffic: number
  words: number
  createdAt: string
  status: "Draft" | "Published" | "Scheduled"
  starred?: boolean
}

const articles: Article[] = [
  {
    id: "1",
    title: "7 Leading AI SEO Tools in 2024 (Ranked & Compared)",
    keyword: "ai seo software",
    traffic: 880,
    words: 1543,
    createdAt: "—",
    status: "Draft",
    starred: true,
  },
  {
    id: "2",
    title: "7 Tips for Better Teamplay in League of Legends",
    keyword: "league of legends",
    traffic: 2240000,
    words: 2676,
    createdAt: "a day ago",
    status: "Draft",
  },
  {
    id: "3",
    title: "Backlinks 101: What are backlinks and why they're important [Free template]",
    keyword: "backlinks",
    traffic: 8100,
    words: 2201,
    createdAt: "—",
    status: "Published",
    starred: true,
  },
  {
    id: "4",
    title: "How to Improve Your Skills in League of Legends",
    keyword: "league of legends",
    traffic: 2240000,
    words: 4875,
    createdAt: "20 hours ago",
    status: "Draft",
  },
  {
    id: "5",
    title: "How to Master Last Hitting in League of Legends",
    keyword: "league of legends",
    traffic: 2240000,
    words: 3480,
    createdAt: "21 hours ago",
    status: "Draft",
  },
  {
    id: "6",
    title: "Top Amazon Payment Methods for Quick Access to Funds",
    keyword: "amazon payment methods",
    traffic: 3600,
    words: 2647,
    createdAt: "—",
    status: "Draft",
  },
  {
    id: "7",
    title: "Top Virtual Executive Assistant Services (2024)",
    keyword: "virtual executive assistant",
    traffic: 2900,
    words: 2408,
    createdAt: "1 Oct, 24",
    status: "Published",
  },
  {
    id: "8",
    title: "Unlimited Graphic Design Services You Can Rely On",
    keyword: "unlimited graphic design services",
    traffic: 980,
    words: 1974,
    createdAt: "—",
    status: "Scheduled",
  },
  {
    id: "9",
    title: "Unlimited Graphics Design Solutions",
    keyword: "unlimited graphic design services",
    traffic: 980,
    words: 1793,
    createdAt: "—",
    status: "Scheduled",
  },
]

// Add number formatter
const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
})

type SortField = "title" | "keyword" | "words" | "createdAt"
type SortDirection = "asc" | "desc"

export function ArticlesTable() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("title")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleSelectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([])
    } else {
      setSelectedArticles(articles.map((article) => article.id))
    }
  }

  const toggleSelectArticle = (id: string) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((articleId) => articleId !== id))
    } else {
      setSelectedArticles([...selectedArticles, id])
    }
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedArticles = [...articles].sort((a, b) => {
    let comparison = 0

    switch (sortField) {
      case "title":
        comparison = a.title.localeCompare(b.title)
        break
      case "keyword":
        comparison = a.keyword.localeCompare(b.keyword)
        break
      case "words":
        comparison = a.words - b.words
        break
      case "createdAt":
        // Simple comparison for demo purposes
        comparison = a.createdAt.localeCompare(b.createdAt)
        break
    }

    return sortDirection === "asc" ? comparison : -comparison
  })

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  const getStatusClass = (status: Article["status"]) => {
    switch (status) {
      case "Draft":
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      case "Published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Scheduled":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  // Mobile card view
  if (isMobile) {
    return (
      <div className="space-y-4">
        {selectedArticles.length > 0 && (
          <motion.div
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm font-medium">{selectedArticles.length} selected</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Archive className="h-3.5 w-3.5" />
                <span>Archive</span>
              </Button>
              <Button variant="destructive" size="sm" className="h-8 gap-1">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {sortedArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative"
            >
              <Card
                className={`overflow-hidden border-primary-100/30 dark:border-primary-800/30 shadow-sm ${
                  selectedArticles.includes(article.id) ? "ring-2 ring-primary/30" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={selectedArticles.includes(article.id)}
                      onCheckedChange={() => toggleSelectArticle(article.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(article.status)}`}
                        >
                          {article.status}
                        </span>
                        {article.starred && (
                          <Badge
                            variant="outline"
                            className="bg-amber-500/10 text-amber-500 border-amber-500/20 px-1.5 py-0"
                          >
                            <Star className="h-3 w-3 fill-amber-500" />
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-sm line-clamp-2">{article.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {article.keyword}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {numberFormatter.format(article.traffic)} traffic
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {numberFormatter.format(article.words)} words
                        </Badge>
                        {article.createdAt !== "—" && (
                          <Badge variant="outline" className="text-xs">
                            {article.createdAt}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>View</span>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <FileEdit className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          <span>Duplicate</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          <span>Archive</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">Total: {articles.length} Articles</div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Desktop table view
  return (
    <Card className="enhanced-card overflow-hidden border-primary-100/30 dark:border-primary-800/30 shadow-sm">
      <CardContent className="p-0">
        {selectedArticles.length > 0 && (
          <motion.div
            className="flex items-center justify-between p-3 bg-muted/50 border-b border-border/50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm font-medium">{selectedArticles.length} selected</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Copy className="h-3.5 w-3.5" />
                <span>Duplicate</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Archive className="h-3.5 w-3.5" />
                <span>Archive</span>
              </Button>
              <Button variant="destructive" size="sm" className="h-8 gap-1">
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </Button>
            </div>
          </motion.div>
        )}

        <div className="w-full overflow-auto">
          <table className="w-full article-table">
            <thead className="bg-muted/50 dark:bg-muted/20">
              <tr>
                <th className="w-[40px] p-3">
                  <Checkbox
                    checked={selectedArticles.length === articles.length && articles.length > 0}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-3 text-left">
                  <button className="flex items-center font-medium" onClick={() => handleSort("title")}>
                    Article Title
                    {getSortIcon("title")}
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button className="flex items-center font-medium" onClick={() => handleSort("keyword")}>
                    Keyword [Traffic]
                    {getSortIcon("keyword")}
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button className="flex items-center font-medium" onClick={() => handleSort("words")}>
                    Words
                    {getSortIcon("words")}
                  </button>
                </th>
                <th className="p-3 text-left">
                  <button className="flex items-center font-medium" onClick={() => handleSort("createdAt")}>
                    Created On
                    {getSortIcon("createdAt")}
                  </button>
                </th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedArticles.map((article) => (
                  <motion.tr
                    key={article.id}
                    className={`border-b border-border transition-colors ${
                      selectedArticles.includes(article.id) ? "bg-primary/5" : ""
                    } ${hoveredRow === article.id ? "bg-muted/50" : ""}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredRow(article.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="p-3">
                      <Checkbox
                        checked={selectedArticles.includes(article.id)}
                        onCheckedChange={() => toggleSelectArticle(article.id)}
                        aria-label={`Select ${article.title}`}
                      />
                    </td>
                    <td className="p-3 font-medium">
                      <div className="flex items-center gap-2">
                        {article.starred && <Star className="h-4 w-4 fill-amber-500 text-amber-500" />}
                        <span>{article.title}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      {article.keyword} [{numberFormatter.format(article.traffic)}]
                    </td>
                    <td className="p-3">{numberFormatter.format(article.words)}</td>
                    <td className="p-3">{article.createdAt}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(article.status)}`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              <span>Duplicate</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="h-4 w-4 mr-2" />
                              <span>Archive</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Total: {articles.length} Articles | Showing 10 entries per page
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
