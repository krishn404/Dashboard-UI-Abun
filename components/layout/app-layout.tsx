"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { useMediaQuery } from "@/hooks/use-media-query"
import { motion } from "framer-motion"
import { RouteContent } from "@/components/route-content"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeRoute, setActiveRoute] = useState("dashboard")
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Close sidebar on mobile by default
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const contentVariants = {
    expanded: {
      marginLeft: isMobile ? 0 : "280px",
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    collapsed: {
      marginLeft: isMobile ? 0 : "60px",
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
        activeRoute={activeRoute}
        setActiveRoute={setActiveRoute}
      />

      <motion.div
        className="flex-1 flex flex-col"
        variants={contentVariants}
        initial={sidebarOpen ? "expanded" : "collapsed"}
        animate={sidebarOpen ? "expanded" : "collapsed"}
      >
        <AppHeader toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} activeRoute={activeRoute} />
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <RouteContent activeRoute={activeRoute} />
        </main>
      </motion.div>
    </div>
  )
}
