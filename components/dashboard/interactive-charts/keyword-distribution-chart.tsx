"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Sample data for keyword distribution
const keywordData = [
  { name: "League of Legends", value: 45, color: "#3b82f6" },
  { name: "SEO Tools", value: 20, color: "#8b5cf6" },
  { name: "Backlinks", value: 15, color: "#ec4899" },
  { name: "Amazon", value: 10, color: "#f97316" },
  { name: "Graphic Design", value: 10, color: "#10b981" },
]

export function KeywordDistributionChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [timeRange, setTimeRange] = useState("month")
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)
    setIsAnimating(true)
    // Simulate data change
    setTimeout(() => {
      setIsAnimating(false)
    }, 500)
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  if (!mounted) return null

  return (
    <Card className="enhanced-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Keyword Distribution</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              {timeRange === "week" && "This Week"}
              {timeRange === "month" && "This Month"}
              {timeRange === "quarter" && "This Quarter"}
              {timeRange === "year" && "This Year"}
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleTimeRangeChange("week")}>This Week</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange("month")}>This Month</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange("quarter")}>This Quarter</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleTimeRangeChange("year")}>This Year</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={keywordData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={0}
                animationDuration={1000}
                isAnimationActive={isAnimating}
              >
                {keywordData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "white" : "transparent"}
                    strokeWidth={activeIndex === index ? 2 : 0}
                    style={{
                      filter: activeIndex === index ? "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))" : "none",
                      transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "transform 0.2s, filter 0.2s",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border border-border bg-card p-2 shadow-md">
                        <p className="font-medium">{payload[0].name}</p>
                        <p className="text-sm text-muted-foreground">
                          {payload[0].value}% of articles ({Math.round((payload[0].value * 142) / 100)} articles)
                        </p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ paddingLeft: "10px" }}
                formatter={(value, entry, index) => (
                  <span
                    style={{
                      color: activeIndex === index ? keywordData[index].color : "inherit",
                      fontWeight: activeIndex === index ? "bold" : "normal",
                      transition: "color 0.2s, font-weight 0.2s",
                    }}
                  >
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {keywordData.map((item, index) => (
            <motion.div
              key={item.name}
              className="flex flex-col items-center rounded-lg p-2 text-center"
              style={{ backgroundColor: `${item.color}20` }}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="mb-1 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs font-medium">{item.name}</span>
              <span className="text-xs text-muted-foreground">{item.value}%</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
