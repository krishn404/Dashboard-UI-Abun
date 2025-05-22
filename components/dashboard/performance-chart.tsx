"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp } from "lucide-react"

// Chart data
const monthlyData = [
  { month: "Jan", articles: 12, traffic: 2400 },
  { month: "Feb", articles: 19, traffic: 4200 },
  { month: "Mar", articles: 15, traffic: 5800 },
  { month: "Apr", articles: 27, traffic: 8900 },
  { month: "May", articles: 32, traffic: 11200 },
  { month: "Jun", articles: 24, traffic: 9800 },
  { month: "Jul", articles: 38, traffic: 14500 },
  { month: "Aug", articles: 42, traffic: 16700 },
  { month: "Sep", articles: 36, traffic: 15200 },
  { month: "Oct", articles: 31, traffic: 12800 },
  { month: "Nov", articles: 45, traffic: 18900 },
  { month: "Dec", articles: 29, traffic: 13400 },
]

const weeklyData = [
  { day: "Mon", articles: 8, traffic: 1200 },
  { day: "Tue", articles: 12, traffic: 1800 },
  { day: "Wed", articles: 15, traffic: 2400 },
  { day: "Thu", articles: 10, traffic: 2100 },
  { day: "Fri", articles: 14, traffic: 2800 },
  { day: "Sat", articles: 6, traffic: 1500 },
  { day: "Sun", articles: 4, traffic: 900 },
]

export function PerformanceChart() {
  const [activeTab, setActiveTab] = useState("monthly")
  const [activeMetric, setActiveMetric] = useState("traffic")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const data = activeTab === "monthly" ? monthlyData : weeklyData
  const maxValue = Math.max(...data.map((item) => item[activeMetric as keyof typeof item] as number))

  // Calculate percentage growth
  const currentTotal = data.reduce((sum, item) => sum + (item[activeMetric as keyof typeof item] as number), 0)
  const previousPeriodTotal = currentTotal * 0.85 // Simulating previous period data (15% less)
  const growthPercentage = ((currentTotal - previousPeriodTotal) / previousPeriodTotal) * 100

  if (!mounted) return null

  return (
    <Card className="enhanced-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">Performance Overview</CardTitle>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-500 font-medium">+{growthPercentage.toFixed(1)}%</span>
            <span className="text-xs text-muted-foreground">from previous period</span>
          </div>
        </div>
        <Tabs defaultValue="monthly" className="w-auto" onValueChange={setActiveTab}>
          <TabsList className="h-8 p-1">
            <TabsTrigger value="weekly" className="text-xs px-2.5 py-1">
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs px-2.5 py-1">
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveMetric("traffic")}
            className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
              activeMetric === "traffic"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Traffic
          </button>
          <button
            onClick={() => setActiveMetric("articles")}
            className={`text-sm px-3 py-1.5 rounded-md transition-colors ${
              activeMetric === "articles"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            Articles
          </button>
        </div>

        <div className="h-[220px] w-full relative" ref={chartRef}>
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground py-2">
            <div>{maxValue}</div>
            <div>{Math.round(maxValue * 0.75)}</div>
            <div>{Math.round(maxValue * 0.5)}</div>
            <div>{Math.round(maxValue * 0.25)}</div>
            <div>0</div>
          </div>

          {/* Chart grid lines */}
          <div className="absolute left-8 right-0 top-0 h-full">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full border-t border-border/30" style={{ top: `${i * 25}%` }} />
            ))}
          </div>

          {/* Chart bars */}
          <div className="absolute left-10 right-0 top-2 bottom-6 flex items-end justify-between">
            {data.map((item, index) => {
              const value = item[activeMetric as keyof typeof item] as number
              const height = `${(value / maxValue) * 100}%`
              const label = activeTab === "monthly" ? item.month : item.day

              return (
                <div
                  key={index}
                  className="relative flex flex-col items-center group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className={`w-8 rounded-t-md ${
                      activeMetric === "traffic"
                        ? "bg-gradient-to-t from-blue-500/80 to-blue-400/80"
                        : "bg-gradient-to-t from-purple-500/80 to-purple-400/80"
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    style={{
                      boxShadow: hoveredIndex === index ? "0 4px 12px rgba(0, 0, 0, 0.15)" : "none",
                      opacity: hoveredIndex === null || hoveredIndex === index ? 1 : 0.6,
                    }}
                  />
                  <div className="text-xs mt-2 text-muted-foreground">{label}</div>

                  {/* Tooltip */}
                  {hoveredIndex === index && (
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded shadow-md text-xs whitespace-nowrap z-10">
                      <div className="font-medium">{label}</div>
                      <div className="flex items-center gap-1">
                        {activeMetric === "traffic" ? "Traffic:" : "Articles:"}
                        <span className="font-semibold">{value.toLocaleString()}</span>
                        <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
