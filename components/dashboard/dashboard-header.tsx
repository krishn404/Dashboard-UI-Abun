"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Calendar, Download, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function DashboardHeader() {
  return (
    <motion.div
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <motion.h1
          className="text-2xl font-bold tracking-tight md:text-3xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          Dashboard
        </motion.h1>
        <motion.p
          className="text-sm text-muted-foreground md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Manage your articles and content
        </motion.p>
      </div>
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">This Month</span>
              <span className="sm:hidden">Month</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Today</DropdownMenuItem>
            <DropdownMenuItem>This Week</DropdownMenuItem>
            <DropdownMenuItem>This Month</DropdownMenuItem>
            <DropdownMenuItem>This Quarter</DropdownMenuItem>
            <DropdownMenuItem>This Year</DropdownMenuItem>
            <DropdownMenuItem>Custom Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>

        <Button variant="outline" size="sm" className="h-9 gap-1">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="enhanced-button gap-2 rounded-full px-5 py-2 font-medium h-9">
            <PlusCircle className="h-4 w-4" />
            <span>New Article</span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
