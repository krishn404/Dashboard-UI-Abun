"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  FileText,
  Zap,
  Layers,
  Key,
  RefreshCcw,
  Briefcase,
  BarChart2,
  HelpCircle,
  Bell,
  MessageSquare,
  User,
  ChevronUp,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  isMobile: boolean
  activeRoute: string
  setActiveRoute: (route: string) => void
}

interface MenuItem {
  icon: React.ElementType
  label: string
  id: string
  submenu?: { label: string; id: string }[]
}

export function AppSidebar({ isOpen, toggleSidebar, isMobile, activeRoute, setActiveRoute }: AppSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["articles"])

  const toggleMenu = (id: string) => {
    setExpandedMenus((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const sidebarVariants = {
    open: {
      width: "280px",
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        when: "beforeChildren",
        staggerChildren: 0.05,
      },
    },
    closed: {
      width: isMobile ? "0px" : "60px",
      transition: {
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
      },
    },
  }

  const childVariants = {
    open: {
      opacity: 1,
      x: 0,
      display: "block",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      x: -10,
      transitionEnd: { display: "none" },
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  }

  const sidebarItems: MenuItem[] = [
    {
      icon: FileText,
      label: "Articles",
      id: "articles",
      submenu: [
        { label: "Create Article", id: "articles/create" },
        { label: "Generated Articles", id: "articles/generated" },
        { label: "Keyword Projects", id: "articles/keyword-projects" },
        { label: "AI Keyword to Article", id: "articles/ai-keyword" },
        { label: "Steal Competitor Keyword", id: "articles/steal-keyword" },
        { label: "Import Keyword from GSC", id: "articles/import-keyword" },
        { label: "Manual Keyword to Article", id: "articles/manual-keyword" },
        { label: "Bulk Keyword to Article", id: "articles/bulk-keyword" },
        { label: "Longtail Keyword to Article", id: "articles/longtail-keyword" },
        { label: "Article Settings", id: "articles/settings" },
      ],
    },
    { icon: Zap, label: "Auto Blog", id: "auto-blog" },
    { icon: Layers, label: "Internal Links", id: "internal-links" },
    { icon: Key, label: "Free Backlinks", id: "free-backlinks" },
    { icon: RefreshCcw, label: "Integrations", id: "integrations" },
    { icon: Briefcase, label: "Subscription", id: "subscription" },
    { icon: BarChart2, label: "Affiliate Program", id: "affiliate-program" },
    { icon: HelpCircle, label: "Help Center", id: "help-center" },
    { icon: Bell, label: "Updates", id: "updates" },
    { icon: MessageSquare, label: "Live Chat Support", id: "live-chat-support" },
    { icon: User, label: "Profile", id: "profile" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}

      <motion.aside
        className="fixed top-0 left-0 h-full z-50 bg-[#0f1117] dark:bg-[#0f1117] overflow-hidden"
        variants={sidebarVariants}
        initial={isOpen ? "open" : "closed"}
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div
                className="p-4 flex flex-col gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button className="text-xl font-bold text-white" onClick={() => setActiveRoute("dashboard")}>
                      abun
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <Button
                    variant="outline"
                    className="w-full justify-between border-gray-700 bg-transparent text-gray-300"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-pink-500 flex items-center justify-center">
                        <span className="text-xs text-white"></span>
                      </div>
                      <span className="text-sm">amazon.com</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto py-2 overflow-x-hidden">
            <nav>
              <ul className="space-y-1 px-2">
                {sidebarItems.map((item) => {
                  const isActive = activeRoute === item.id || activeRoute.startsWith(`${item.id}/`)
                  const isExpanded = expandedMenus.includes(item.id)

                  return (
                    <li key={item.id} className="relative">
                      <div className="flex items-center">
                        <button
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full
                            ${isActive ? "bg-gray-800 text-blue-400" : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"}`}
                          onClick={() => {
                            if (item.submenu && isOpen) {
                              toggleMenu(item.id)
                            } else {
                              setActiveRoute(item.id)
                              if (isMobile) toggleSidebar()
                            }
                          }}
                          title={!isOpen ? item.label : undefined}
                        >
                          <div className={`flex items-center justify-center h-5 w-5 ${!isOpen ? "mx-auto" : ""}`}>
                            <item.icon className="h-[18px] w-[18px]" />
                          </div>

                          <motion.span
                            variants={childVariants}
                            className="flex-1 text-sm whitespace-nowrap"
                            initial={isOpen ? "open" : "closed"}
                            animate={isOpen ? "open" : "closed"}
                          >
                            {item.label}
                          </motion.span>

                          {item.submenu && (
                            <motion.div
                              variants={childVariants}
                              initial={isOpen ? "open" : "closed"}
                              animate={isOpen ? "open" : "closed"}
                            >
                              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </motion.div>
                          )}
                        </button>
                      </div>

                      {/* Submenu - only show when sidebar is open */}
                      <AnimatePresence>
                        {item.submenu && isExpanded && isOpen && (
                          <motion.ul
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-1 ml-7 space-y-1"
                          >
                            {item.submenu.map((subItem) => {
                              const isSubActive = activeRoute === subItem.id
                              return (
                                <motion.li
                                  key={subItem.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.03 }}
                                >
                                  <button
                                    onClick={() => {
                                      setActiveRoute(subItem.id)
                                      if (isMobile) toggleSidebar()
                                    }}
                                    className={`block px-3 py-1.5 text-sm rounded-md w-full text-left
                                      ${isSubActive ? "text-blue-400 font-medium" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800"}`}
                                  >
                                    {subItem.label}
                                  </button>
                                </motion.li>
                              )
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      </motion.aside>
    </>
  )
}
