"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusCircle, Filter, ArrowUpDown } from "lucide-react"
import { ArticlesTable } from "@/components/articles/articles-table"
import { SearchBar } from "@/components/dashboard/search-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface ArticlesContentProps {
  subRoute: string
}

export function ArticlesContent({ subRoute }: ArticlesContentProps) {
  const [activeTab, setActiveTab] = useState("all")

  // Format route for display
  const formatTitle = (route: string) => {
    if (!route) return "All Articles"

    return route
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="show">
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {formatTitle(subRoute)}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {subRoute ? `Manage your ${subRoute.toLowerCase()}` : "Manage all your articles"}
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="enhanced-button gap-2 sm:ml-auto rounded-full px-5 py-2 font-medium">
            <PlusCircle className="h-4 w-4" />
            <span>New Article</span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-4 rounded-xl p-1 bg-secondary/50 backdrop-blur-sm border border-border/40">
            <TabsTrigger value="all" className="rounded-lg py-2 text-sm font-medium">
              All
            </TabsTrigger>
            <TabsTrigger value="published" className="rounded-lg py-2 text-sm font-medium">
              Published
            </TabsTrigger>
            <TabsTrigger value="scheduled" className="rounded-lg py-2 text-sm font-medium">
              Scheduled
            </TabsTrigger>
            <TabsTrigger value="draft" className="rounded-lg py-2 text-sm font-medium">
              Draft
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span>Sort</span>
          </Button>
        </div>
        <SearchBar />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="border-primary-100/30 dark:border-primary-800/30 shadow-sm">
          <CardHeader className="p-4 border-b border-border/50">
            <CardTitle className="text-lg">
              {activeTab === "all"
                ? "All Articles"
                : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Articles`}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ArticlesTable />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
