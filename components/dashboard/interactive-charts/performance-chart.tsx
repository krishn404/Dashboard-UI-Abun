"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, TrendingUp, ChevronDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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

const quarterlyData = [
  { quarter: "Q1", articles: 46, traffic: 12400 },
  { quarter: "Q2", articles: 83, traffic: 29900 },
  { quarter: "Q3", articles: 116, traffic: 46400 },
  { quarter: "Q4", articles: 105, traffic: 45100 },
]

export function PerformanceChart() {
  const [activeTab, setActiveTab] = useState("monthly")
  const [activeMetric, setActiveMetric] = useState("traffic")
  const [chartType, setChartType] = useState("area")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getData = () => {
    switch (activeTab) {
      case "weekly":
        return weeklyData
      case "quarterly":
        return quarterlyData
      case "monthly":
      default:
        return monthlyData
    }
  }

  const data = getData()
  const maxValue = Math.max(...data.map((item) => item[activeMetric as keyof typeof item] as number))

  // Calculate percentage growth
  const currentTotal = data.reduce((sum, item) => sum + (item[activeMetric as keyof typeof item] as number), 0)
  const previousPeriodTotal = currentTotal * 0.85 // Simulating previous period data (15% less)
  const growthPercentage = ((currentTotal - previousPeriodTotal) / previousPeriodTotal) * 100

  // Get the label key based on active tab
  const getLabelKey = () => {
    switch (activeTab) {
      case "weekly":
        return "day"
      case "quarterly":
        return "quarter"
      case "monthly":
      default:
        return "month"
    }
  }

  const labelKey = getLabelKey()

  // Format large numbers
  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
    return value
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-border bg-card p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <div className="mt-1 space-y-1">
            <p className="flex items-center gap-1 text-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeMetric === "traffic" ? "#3b82f6" : "#8b5cf6" }}
              ></span>
              <span className="capitalize">{activeMetric}:</span>
              <span className="font-medium">
                {activeMetric === "traffic" ? payload[0].value.toLocaleString() : payload[0].value.toLocaleString()}
              </span>
            </p>
            <p className="flex items-center gap-1 text-sm text-emerald-500">
              <ArrowUpRight className="h-3 w-3" />
              <span>
                +{(Math.random() * 20 + 5).toFixed(1)}% from previous {activeTab.slice(0, -2)}
              </span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

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
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                {chartType === "area" ? "Area Chart" : "Line Chart"}
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setChartType("area")}>Area Chart</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setChartType("line")}>Line Chart</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Tabs defaultValue="monthly" className="w-auto" onValueChange={setActiveTab}>
            <TabsList className="h-8 p-1">
              <TabsTrigger value="weekly" className="text-xs px-2.5 py-1">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs px-2.5 py-1">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="quarterly" className="text-xs px-2.5 py-1">
                Quarterly
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
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

        <div className="h-[300px] w-full relative" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                onMouseMove={(e) => {
                  if (e.activeTooltipIndex !== undefined) {
                    setHoveredIndex(e.activeTooltipIndex)
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorArticles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey={labelKey}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={activeMetric === "traffic" ? "#3b82f6" : "#8b5cf6"}
                  fillOpacity={1}
                  fill={`url(#color${activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)})`}
                  strokeWidth={2}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "white",
                    fill: activeMetric === "traffic" ? "#3b82f6" : "#8b5cf6",
                  }}
                />
              </AreaChart>
            ) : (
              <LineChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
                onMouseMove={(e) => {
                  if (e.activeTooltipIndex !== undefined) {
                    setHoveredIndex(e.activeTooltipIndex)
                  }
                }}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey={labelKey}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={activeMetric === "traffic" ? "#3b82f6" : "#8b5cf6"}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "white",
                    fill: activeMetric === "traffic" ? "#3b82f6" : "#8b5cf6",
                  }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className={`rounded-md px-2 py-1 text-xs ${
                hoveredIndex === index ? "bg-primary/10 font-medium" : "bg-transparent hover:bg-secondary/50"
              }`}
              whileHover={{ scale: 1.05 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {item[labelKey as keyof typeof item]}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
