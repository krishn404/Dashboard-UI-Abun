"use client"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("generated")
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [mounted, setMounted] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full">
        <div className="h-10 w-full max-w-md rounded-xl bg-muted"></div>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-x-auto pb-1" ref={tabsRef}>
      <Tabs
        defaultValue="generated"
        className="w-full relative"
        onValueChange={(value) => {
          setActiveTab(value)
        }}
      >
        <div className="relative">
          <TabsList
            className={`grid w-full ${isMobile ? "min-w-[500px]" : "max-w-md"} grid-cols-4 rounded-xl p-1 relative z-10 bg-secondary/50 backdrop-blur-sm border border-border/40`}
          >
            <TabsTrigger
              value="generated"
              className="rounded-lg py-2 text-sm font-medium transition-colors data-[state=active]:text-primary-foreground relative z-20"
            >
              <div className="flex items-center gap-2">
                <span>Generated</span>
                <Badge variant="secondary" className="h-5 px-1.5 bg-primary/20 text-primary">
                  142
                </Badge>
              </div>
              {activeTab === "generated" && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-md -z-10 shadow-md"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="published"
              className="rounded-lg py-2 text-sm font-medium transition-colors data-[state=active]:text-primary-foreground relative z-20"
            >
              <div className="flex items-center gap-2">
                <span>Published</span>
                <Badge variant="secondary" className="h-5 px-1.5 bg-primary/20 text-primary">
                  89
                </Badge>
              </div>
              {activeTab === "published" && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-md -z-10 shadow-md"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className="rounded-lg py-2 text-sm font-medium transition-colors data-[state=active]:text-primary-foreground relative z-20"
            >
              <div className="flex items-center gap-2">
                <span>Scheduled</span>
                <Badge variant="secondary" className="h-5 px-1.5 bg-primary/20 text-primary">
                  24
                </Badge>
              </div>
              {activeTab === "scheduled" && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-md -z-10 shadow-md"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </TabsTrigger>
            <TabsTrigger
              value="archived"
              className="rounded-lg py-2 text-sm font-medium transition-colors data-[state=active]:text-primary-foreground relative z-20"
            >
              <div className="flex items-center gap-2">
                <span>Archived</span>
                <Badge variant="secondary" className="h-5 px-1.5 bg-primary/20 text-primary">
                  18
                </Badge>
              </div>
              {activeTab === "archived" && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-md -z-10 shadow-md"
                  layoutId="tab-indicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  )
}
