"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Edit, Eye, Clock, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample activity data
const activities = [
  {
    id: 1,
    type: "created",
    title: "How to Master Last Hitting in League of Legends",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "edited",
    title: "7 Leading AI SEO Tools in 2024",
    user: {
      name: "Sarah Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SM",
    },
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "viewed",
    title: "Backlinks 101: What are backlinks",
    user: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DC",
    },
    time: "Yesterday",
  },
  {
    id: 4,
    type: "scheduled",
    title: "Top Virtual Executive Assistant Services",
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EW",
    },
    time: "Yesterday",
  },
  {
    id: 5,
    type: "created",
    title: "Unlimited Graphic Design Services",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
    time: "2 days ago",
  },
]

export function RecentActivity() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "created":
        return <FileText className="h-3.5 w-3.5 text-emerald-500" />
      case "edited":
        return <Edit className="h-3.5 w-3.5 text-blue-500" />
      case "viewed":
        return <Eye className="h-3.5 w-3.5 text-purple-500" />
      case "scheduled":
        return <Clock className="h-3.5 w-3.5 text-amber-500" />
      default:
        return <FileText className="h-3.5 w-3.5" />
    }
  }

  const getActivityText = (type: string) => {
    switch (type) {
      case "created":
        return "Created"
      case "edited":
        return "Edited"
      case "viewed":
        return "Viewed"
      case "scheduled":
        return "Scheduled"
      default:
        return "Updated"
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "created":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      case "edited":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "viewed":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20"
      case "scheduled":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <Card className="enhanced-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-[220px] overflow-y-auto">
          <AnimatePresence>
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors"
                onMouseEnter={() => setHoveredItem(activity.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{activity.user.name}</span>
                      <Badge variant="outline" className={`text-xs px-1.5 py-0 ${getActivityColor(activity.type)}`}>
                        <span className="flex items-center gap-1">
                          {getActivityIcon(activity.type)}
                          {getActivityText(activity.type)}
                        </span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>

                {hoveredItem === activity.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
