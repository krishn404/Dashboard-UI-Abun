"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { ArticlesTable } from "@/components/articles/articles-table"
import { ArticlesTableSkeleton } from "@/components/articles/articles-table-skeleton"
import { SearchBar } from "@/components/dashboard/search-bar"

export default function DashboardPageClient() {
  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
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
    <motion.div className="flex min-h-screen flex-col" initial="initial" animate="animate" variants={pageVariants}>
      <div className="flex-1 space-y-4 p-4 md:space-y-6 md:p-6 lg:p-8">
        <motion.div variants={sectionVariants}>
          <DashboardHeader />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <DashboardCards />
        </motion.div>

        <motion.div variants={sectionVariants} className="space-y-4">
          <DashboardTabs />

          <motion.div
            className="flex justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <SearchBar />
          </motion.div>

          <Suspense fallback={<ArticlesTableSkeleton />}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <ArticlesTable />
            </motion.div>
          </Suspense>
        </motion.div>
      </div>
    </motion.div>
  )
}
