"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import { ChevronDown, Info } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample data for traffic sources
const trafficData = [
  {
    name: "Organic",
    current: 12500,
    previous: 10200,
    color: "#3b82f6",
  },
  {
    name: "Direct",
    current: 5800,
    previous: 4900,
    color: "#8b5cf6",
  },
  {
    name: "Social",
    current: 3200,
    previous: 2800,
    color: "#ec4899",
  },
  {
    name: "Referral",
    current: 2100,
    previous: 1800,
    color: "#f97316",
  },
  {
    name: "Email",
    current: 1200,
    previous: 900,
    color: "#10b981",
  },
]

export function TrafficSourcesChart() {
  const [timeRange, setTimeRange] = useState("month")
  const [showPrevious, setShowPrevious] = useState(true)
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

  const togglePrevious = () => {
    setShowPrevious(!showPrevious)
  }

  if (!mounted) return null

  return (
    <Card className="enhanced-card dashboard-card overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg dashboard-title">Traffic Sources</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-xs">
                  Traffic sources show where your visitors are coming from. Toggle the comparison to see growth from the
                  previous period.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8" onClick={togglePrevious}>
            {showPrevious ? "Hide Comparison" : "Show Comparison"}
          </Button>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full dashboard-chart-glow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={trafficData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barGap={8}
              barSize={24}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                tickFormatter={(value) => (value >= 1000 ? `${value / 1000}k` : value)}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    const currentValue = payload[0].value as number
                    const previousValue = data.previous
                    const percentChange = ((currentValue - previousValue) / previousValue) * 100

                    return (
                      <div className="rounded-lg border border-border bg-card p-3 shadow-md">
                        <p className="font-medium">{data.name}</p>
                        <p className="text-sm">
                          Current: <span className="font-medium">{currentValue.toLocaleString()}</span>
                        </p>
                        {showPrevious && (
                          <>
                            <p className="text-sm">
                              Previous: <span className="font-medium">{previousValue.toLocaleString()}</span>
                            </p>
                            <p className={`text-sm ${percentChange >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                              {percentChange >= 0 ? "+" : ""}
                              {percentChange.toFixed(1)}%
                            </p>
                          </>
                        )}
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend
                content={({ payload }) => (
                  <div className="mt-4 flex flex-wrap justify-center gap-4">
                    {payload?.map((entry, index) => (
                      <div key={`legend-${index}`} className="flex items-center gap-2 dashboard-legend-badge">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                        <span className="text-xs">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
              <Bar
                dataKey="current"
                name="Current Period"
                fill="url(#colorCurrent)"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                isAnimationActive={true}
              />
              {showPrevious && (
                <Bar
                  dataKey="previous"
                  name="Previous Period"
                  fill="url(#colorPrevious)"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  isAnimationActive={true}
                />
              )}
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
                </linearGradient>
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64748b" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#334155" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
