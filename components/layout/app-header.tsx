"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Search, Settings, Menu, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"

interface AppHeaderProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
  activeRoute: string
}

export function AppHeader({ toggleSidebar, isSidebarOpen, activeRoute }: AppHeaderProps) {
  const [notifications] = useState(3)

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

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-4">
        <motion.button
          className="p-2 rounded-md hover:bg-secondary focus:outline-none lg:hidden"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="h-5 w-5" />
        </motion.button>

        <motion.button
          className="p-2 rounded-md hover:bg-secondary focus:outline-none hidden lg:block"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSidebarOpen ? (
            <ChevronDown className="h-5 w-5 -rotate-90" />
          ) : (
            <ChevronDown className="h-5 w-5 rotate-90" />
          )}
        </motion.button>

        <div className="hidden w-full max-w-sm md:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-secondary/60 pl-9 md:w-[240px] lg:w-[280px] border-border focus-visible:ring-primary/20 h-9 px-3 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="icon" className="relative h-9 w-9 border-border bg-card hover:bg-secondary">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground">
              {notifications}
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="outline" size="icon" className="relative h-9 w-9 border-border bg-card hover:bg-secondary">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
        </motion.div>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="relative h-9 w-9 rounded-full p-0 border-border bg-card hover:bg-secondary"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">U</AvatarFallback>
                </Avatar>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-2" align="end" forceMount>
            <DropdownMenuLabel className="font-normal px-2 py-1.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <p className="text-xs leading-none text-muted-foreground">user@amazon.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem className="rounded-md cursor-pointer px-2 py-1.5">
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md cursor-pointer px-2 py-1.5">
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem className="rounded-md cursor-pointer px-2 py-1.5">
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
