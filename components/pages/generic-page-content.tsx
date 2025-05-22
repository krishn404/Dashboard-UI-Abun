"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Settings, FileText, Users, BarChart2, Layers } from "lucide-react"

interface GenericPageContentProps {
  title: string
}

export function GenericPageContent({ title }: GenericPageContentProps) {
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

  // Generate a random icon based on the title
  const getIcon = () => {
    const icons = [FileText, Settings, Users, BarChart2, Layers]
    const hash = title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const IconComponent = icons[hash % icons.length]
    return <IconComponent className="h-6 w-6 text-primary" />
  }

  return (
    <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="show">
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">Manage your {title.toLowerCase()}</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className="enhanced-button gap-2 sm:ml-auto rounded-full px-5 py-2 font-medium">
            <PlusCircle className="h-4 w-4" />
            <span>New {title.split(" ")[0]}</span>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="enhanced-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Overview</CardTitle>
            {getIcon()}
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the {title} page. Content for this section is coming soon.
            </p>
            <Button variant="outline" className="mt-4 w-full">
              View Details
            </Button>
          </CardContent>
        </Card>

        <Card className="enhanced-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <BarChart2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No recent activity found for {title}.</p>
            <Button variant="outline" className="mt-4 w-full">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        <Card className="enhanced-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Settings</CardTitle>
            <Settings className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Configure your {title} settings and preferences.</p>
            <Button variant="outline" className="mt-4 w-full">
              Open Settings
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="enhanced-card">
          <CardHeader>
            <CardTitle>Getting Started with {title}</CardTitle>
            <CardDescription>Follow these steps to get started with {title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <p className="text-sm">Set up your {title.toLowerCase()} preferences</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <p className="text-sm">Configure your integrations</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <p className="text-sm">Create your first {title.toLowerCase().split(" ")[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
