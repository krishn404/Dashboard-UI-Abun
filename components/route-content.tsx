"use client"

import { AnimatePresence, motion } from "framer-motion"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { ArticlesContent } from "@/components/pages/articles-content"
import { GenericPageContent } from "@/components/pages/generic-page-content"

interface RouteContentProps {
  activeRoute: string
}

export function RouteContent({ activeRoute }: RouteContentProps) {
  // Animation variants for page transitions
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  // Format route for display
  const formatRouteTitle = (route: string) => {
    if (route === "dashboard") return "Dashboard"

    // Handle nested routes
    const parts = route.split("/")
    if (parts.length > 1) {
      // Capitalize each part and join with " / "
      return parts
        .map((part) =>
          part
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
        )
        .join(" / ")
    }

    // Single route
    return route
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Render the appropriate content based on the active route
  const renderContent = () => {
    // Special cases for specific routes
    if (activeRoute === "dashboard") {
      return <DashboardContent />
    }

    if (activeRoute === "articles" || activeRoute.startsWith("articles/")) {
      return <ArticlesContent subRoute={activeRoute.replace("articles/", "")} />
    }

    // Generic content for all other routes
    return <GenericPageContent title={formatRouteTitle(activeRoute)} />
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeRoute}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-[calc(100vh-4rem)]"
      >
        {renderContent()}
      </motion.div>
    </AnimatePresence>
  )
}
