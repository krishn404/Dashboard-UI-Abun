"use client"

import { Suspense } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { ArticlesTable } from "@/components/articles/articles-table"
import { ArticlesTableSkeleton } from "@/components/articles/articles-table-skeleton"
import { SearchBar } from "@/components/dashboard/search-bar"
import { PerformanceChart } from "@/components/dashboard/interactive-charts/performance-chart"
import { KeywordDistributionChart } from "@/components/dashboard/interactive-charts/keyword-distribution-chart"
import { TrafficSourcesChart } from "@/components/dashboard/interactive-charts/traffic-sources-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AdvancedFilters } from "@/components/dashboard/advanced-filters"
import { ChartSkeleton } from "@/components/dashboard/interactive-charts/chart-skeleton"
import { RecentActivitySkeleton } from "@/components/dashboard/recent-activity-skeleton"
import { AdvancedFiltersSkeleton } from "@/components/dashboard/advanced-filters-skeleton"

export function DashboardContent() {
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
    <motion.div className="flex min-h-full flex-col" initial="initial" animate="animate" variants={pageVariants}>
      <div className="flex-1 space-y-6">
        <motion.div variants={sectionVariants}>
          <DashboardHeader />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <DashboardCards />
        </motion.div>

        <motion.div variants={sectionVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Suspense fallback={<ChartSkeleton />}>
              <PerformanceChart />
            </Suspense>
          </div>
          <div className="lg:col-span-1">
            <Suspense fallback={<RecentActivitySkeleton />}>
              <RecentActivity />
            </Suspense>
          </div>
        </motion.div>

        <motion.div variants={sectionVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Suspense fallback={<ChartSkeleton />}>
            <KeywordDistributionChart />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <TrafficSourcesChart />
          </Suspense>
        </motion.div>

        <motion.div variants={sectionVariants} className="space-y-4">
          <DashboardTabs />

          <motion.div
            className="flex justify-between flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Suspense fallback={<AdvancedFiltersSkeleton />}>
              <AdvancedFilters />
            </Suspense>
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
