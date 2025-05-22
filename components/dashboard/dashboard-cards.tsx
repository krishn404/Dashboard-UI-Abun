"use client"

import { BarChart3, FileText, TrendingUp, Users, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function DashboardCards() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
  }

  // Card hover animation
  const cardHoverAnimation = {
    rest: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17,
      },
    },
  }

  // Card colors for dark mode
  const cardColors = [
    {
      bg: "bg-gradient-to-br from-blue-500/10 to-blue-600/5",
      icon: "bg-blue-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/20",
      sparkline: "from-blue-500/50 to-blue-500/10",
    },
    {
      bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/5",
      icon: "bg-purple-500/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/20",
      sparkline: "from-purple-500/50 to-purple-500/10",
    },
    {
      bg: "bg-gradient-to-br from-amber-500/10 to-amber-600/5",
      icon: "bg-amber-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/20",
      sparkline: "from-amber-500/50 to-amber-500/10",
    },
    {
      bg: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5",
      icon: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      sparkline: "from-emerald-500/50 to-emerald-500/10",
    },
  ]

  // Sparkline data points
  const sparklineData = [
    [10, 15, 12, 18, 14, 22, 16, 21, 18, 24, 20, 28],
    [20, 16, 22, 18, 26, 22, 28, 24, 30, 28, 32, 30],
    [8, 12, 10, 14, 12, 16, 14, 18, 16, 20, 18, 22],
    [5, 7, 6, 8, 7, 9, 8, 10, 9, 11, 10, 12],
  ]

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item}>
        <motion.div
          className={`enhanced-card rounded-xl ${mounted ? "" : "opacity-0"}`}
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={cardHoverAnimation}
        >
          <Card className={`overflow-hidden border-none shadow-none ${cardColors[0].bg} ${cardColors[0].borderColor}`}>
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${cardColors[0].icon}`}>
                <FileText className={`h-4 w-4 ${cardColors[0].iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">142</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+22%</span> from last month
                </p>

                {/* Mini sparkline chart */}
                <div className="h-8 w-16">
                  <svg width="100%" height="100%" viewBox="0 0 100 30">
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={`stop-color-${cardColors[0].sparkline.split(" ")[0]}`} />
                        <stop offset="100%" className={`stop-color-${cardColors[0].sparkline.split(" ")[1]}`} />
                      </linearGradient>
                    </defs>

                    {/* Line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[0][0]} ${sparklineData[0].map((d, i) => `L ${(i + 1) * (100 / sparklineData[0].length)},${30 - d}`).join(" ")}`}
                      fill="none"
                      stroke="url(#gradient1)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />

                    {/* Area under the line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[0][0]} ${sparklineData[0].map((d, i) => `L ${(i + 1) * (100 / sparklineData[0].length)},${30 - d}`).join(" ")} L 100,30 L 0,30 Z`}
                      fill="url(#gradient1)"
                      opacity="0.2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <motion.div
          className="enhanced-card rounded-xl"
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={cardHoverAnimation}
        >
          <Card className={`overflow-hidden border-none shadow-none ${cardColors[1].bg} ${cardColors[1].borderColor}`}>
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${cardColors[1].icon}`}>
                <TrendingUp className={`h-4 w-4 ${cardColors[1].iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">89</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+12%</span> from last month
                </p>

                {/* Mini sparkline chart */}
                <div className="h-8 w-16">
                  <svg width="100%" height="100%" viewBox="0 0 100 30">
                    <defs>
                      <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={`stop-color-${cardColors[1].sparkline.split(" ")[0]}`} />
                        <stop offset="100%" className={`stop-color-${cardColors[1].sparkline.split(" ")[1]}`} />
                      </linearGradient>
                    </defs>

                    {/* Line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[1][0]} ${sparklineData[1].map((d, i) => `L ${(i + 1) * (100 / sparklineData[1].length)},${30 - d}`).join(" ")}`}
                      fill="none"
                      stroke="url(#gradient2)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />

                    {/* Area under the line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[1][0]} ${sparklineData[1].map((d, i) => `L ${(i + 1) * (100 / sparklineData[1].length)},${30 - d}`).join(" ")} L 100,30 L 0,30 Z`}
                      fill="url(#gradient2)"
                      opacity="0.2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <motion.div
          className="enhanced-card rounded-xl"
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={cardHoverAnimation}
        >
          <Card className={`overflow-hidden border-none shadow-none ${cardColors[2].bg} ${cardColors[2].borderColor}`}>
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Traffic</CardTitle>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${cardColors[2].icon}`}>
                <Users className={`h-4 w-4 ${cardColors[2].iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">24.8K</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+18%</span> from last month
                </p>

                {/* Mini sparkline chart */}
                <div className="h-8 w-16">
                  <svg width="100%" height="100%" viewBox="0 0 100 30">
                    <defs>
                      <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={`stop-color-${cardColors[2].sparkline.split(" ")[0]}`} />
                        <stop offset="100%" className={`stop-color-${cardColors[2].sparkline.split(" ")[1]}`} />
                      </linearGradient>
                    </defs>

                    {/* Line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[2][0]} ${sparklineData[2].map((d, i) => `L ${(i + 1) * (100 / sparklineData[2].length)},${30 - d}`).join(" ")}`}
                      fill="none"
                      stroke="url(#gradient3)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                    />

                    {/* Area under the line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[2][0]} ${sparklineData[2].map((d, i) => `L ${(i + 1) * (100 / sparklineData[2].length)},${30 - d}`).join(" ")} L 100,30 L 0,30 Z`}
                      fill="url(#gradient3)"
                      opacity="0.2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <motion.div
          className="enhanced-card rounded-xl"
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={cardHoverAnimation}
        >
          <Card className={`overflow-hidden border-none shadow-none ${cardColors[3].bg} ${cardColors[3].borderColor}`}>
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${cardColors[3].icon}`}>
                <BarChart3 className={`h-4 w-4 ${cardColors[3].iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">3.2%</div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+0.5%</span> from last month
                </p>

                {/* Mini sparkline chart */}
                <div className="h-8 w-16">
                  <svg width="100%" height="100%" viewBox="0 0 100 30">
                    <defs>
                      <linearGradient id="gradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" className={`stop-color-${cardColors[3].sparkline.split(" ")[0]}`} />
                        <stop offset="100%" className={`stop-color-${cardColors[3].sparkline.split(" ")[1]}`} />
                      </linearGradient>
                    </defs>

                    {/* Line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[3][0]} ${sparklineData[3].map((d, i) => `L ${(i + 1) * (100 / sparklineData[3].length)},${30 - d}`).join(" ")}`}
                      fill="none"
                      stroke="url(#gradient4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />

                    {/* Area under the line */}
                    <motion.path
                      d={`M 0,${30 - sparklineData[3][0]} ${sparklineData[3].map((d, i) => `L ${(i + 1) * (100 / sparklineData[3].length)},${30 - d}`).join(" ")} L 100,30 L 0,30 Z`}
                      fill="url(#gradient4)"
                      opacity="0.2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                      transition={{ duration: 1, delay: 0.8 }}
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
