"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X, Save, Calendar, Clock, FileText, BarChart2, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

interface FilterState {
  status: string[]
  dateRange: {
    from: Date | undefined
    to: Date | undefined
  }
  wordCount: [number, number]
  traffic: [number, number]
  starred: boolean
  keywords: string[]
}

export function AdvancedFilters() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filterState, setFilterState] = useState<FilterState>({
    status: [],
    dateRange: {
      from: undefined,
      to: undefined,
    },
    wordCount: [0, 5000],
    traffic: [0, 1000000],
    starred: false,
    keywords: [],
  })
  const [keyword, setKeyword] = useState("")

  const toggleFilter = () => {
    setIsOpen(!isOpen)
  }

  const handleStatusChange = (status: string) => {
    setFilterState((prev) => {
      const newStatus = prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status]

      // Update active filters
      const newActiveFilters = [...activeFilters]
      if (newStatus.length > 0 && !newActiveFilters.includes("status")) {
        newActiveFilters.push("status")
      } else if (newStatus.length === 0 && newActiveFilters.includes("status")) {
        const index = newActiveFilters.indexOf("status")
        newActiveFilters.splice(index, 1)
      }
      setActiveFilters(newActiveFilters)

      return {
        ...prev,
        status: newStatus,
      }
    })
  }

  const handleDateRangeChange = (field: "from" | "to", value: Date | undefined) => {
    setFilterState((prev) => {
      const newDateRange = {
        ...prev.dateRange,
        [field]: value,
      }

      // Update active filters
      const newActiveFilters = [...activeFilters]
      if ((newDateRange.from || newDateRange.to) && !newActiveFilters.includes("date")) {
        newActiveFilters.push("date")
      } else if (!newDateRange.from && !newDateRange.to && newActiveFilters.includes("date")) {
        const index = newActiveFilters.indexOf("date")
        newActiveFilters.splice(index, 1)
      }
      setActiveFilters(newActiveFilters)

      return {
        ...prev,
        dateRange: newDateRange,
      }
    })
  }

  const handleWordCountChange = (value: [number, number]) => {
    setFilterState((prev) => {
      // Update active filters
      const newActiveFilters = [...activeFilters]
      if ((value[0] > 0 || value[1] < 5000) && !newActiveFilters.includes("wordCount")) {
        newActiveFilters.push("wordCount")
      } else if (value[0] === 0 && value[1] === 5000 && newActiveFilters.includes("wordCount")) {
        const index = newActiveFilters.indexOf("wordCount")
        newActiveFilters.splice(index, 1)
      }
      setActiveFilters(newActiveFilters)

      return {
        ...prev,
        wordCount: value,
      }
    })
  }

  const handleTrafficChange = (value: [number, number]) => {
    setFilterState((prev) => {
      // Update active filters
      const newActiveFilters = [...activeFilters]
      if ((value[0] > 0 || value[1] < 1000000) && !newActiveFilters.includes("traffic")) {
        newActiveFilters.push("traffic")
      } else if (value[0] === 0 && value[1] === 1000000 && newActiveFilters.includes("traffic")) {
        const index = newActiveFilters.indexOf("traffic")
        newActiveFilters.splice(index, 1)
      }
      setActiveFilters(newActiveFilters)

      return {
        ...prev,
        traffic: value,
      }
    })
  }

  const handleStarredChange = (value: boolean) => {
    setFilterState((prev) => {
      // Update active filters
      const newActiveFilters = [...activeFilters]
      if (value && !newActiveFilters.includes("starred")) {
        newActiveFilters.push("starred")
      } else if (!value && newActiveFilters.includes("starred")) {
        const index = newActiveFilters.indexOf("starred")
        newActiveFilters.splice(index, 1)
      }
      setActiveFilters(newActiveFilters)

      return {
        ...prev,
        starred: value,
      }
    })
  }

  const addKeyword = () => {
    if (keyword.trim() && !filterState.keywords.includes(keyword.trim())) {
      setFilterState((prev) => {
        const newKeywords = [...prev.keywords, keyword.trim()]

        // Update active filters
        const newActiveFilters = [...activeFilters]
        if (newKeywords.length > 0 && !newActiveFilters.includes("keywords")) {
          newActiveFilters.push("keywords")
        }
        setActiveFilters(newActiveFilters)

        return {
          ...prev,
          keywords: newKeywords,
        }
      })
      setKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setFilterState((prev) => {
      const newKeywords = prev.keywords.filter((k) => k !== keyword)

      // Update active filters
      const newActiveFilters = [...activeFilters]
      if (newKeywords.length === 0 && newActiveFilters.includes("keywords")) {
        const index = newActiveFilters.indexOf("keywords")
        newActiveFilters.splice(index, 1)
      }
      setActiveFilters(newActiveFilters)

      return {
        ...prev,
        keywords: newKeywords,
      }
    })
  }

  const clearFilters = () => {
    setFilterState({
      status: [],
      dateRange: {
        from: undefined,
        to: undefined,
      },
      wordCount: [0, 5000],
      traffic: [0, 1000000],
      starred: false,
      keywords: [],
    })
    setActiveFilters([])
  }

  const saveFilters = () => {
    // In a real app, this would save the filter configuration
    console.log("Saving filters:", filterState)
    // Show a toast notification
    alert("Filter preset saved!")
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Button variant={isOpen ? "default" : "outline"} size="sm" className="h-9 gap-1" onClick={toggleFilter}>
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFilters.length > 0 && (
            <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
              {activeFilters.length}
            </Badge>
          )}
          {isOpen ? <ChevronUp className="h-3.5 w-3.5 ml-1" /> : <ChevronDown className="h-3.5 w-3.5 ml-1" />}
        </Button>

        {/* Active filter badges */}
        <div className="flex flex-wrap gap-1">
          {activeFilters.includes("status") && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Status
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => {
                  setFilterState((prev) => ({ ...prev, status: [] }))
                  setActiveFilters(activeFilters.filter((f) => f !== "status"))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.includes("date") && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Date Range
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => {
                  setFilterState((prev) => ({
                    ...prev,
                    dateRange: { from: undefined, to: undefined },
                  }))
                  setActiveFilters(activeFilters.filter((f) => f !== "date"))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.includes("wordCount") && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Word Count
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => {
                  setFilterState((prev) => ({ ...prev, wordCount: [0, 5000] }))
                  setActiveFilters(activeFilters.filter((f) => f !== "wordCount"))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.includes("traffic") && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Traffic
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => {
                  setFilterState((prev) => ({ ...prev, traffic: [0, 1000000] }))
                  setActiveFilters(activeFilters.filter((f) => f !== "traffic"))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.includes("starred") && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Starred
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => {
                  setFilterState((prev) => ({ ...prev, starred: false }))
                  setActiveFilters(activeFilters.filter((f) => f !== "starred"))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {activeFilters.includes("keywords") && (
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Keywords
              <button
                className="ml-1 rounded-full hover:bg-primary/20"
                onClick={() => {
                  setFilterState((prev) => ({ ...prev, keywords: [] }))
                  setActiveFilters(activeFilters.filter((f) => f !== "keywords"))
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>

        {activeFilters.length > 0 && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
            Clear All
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="border-primary-100/30 dark:border-primary-800/30 shadow-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* Status Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Status</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant={filterState.status.includes("Draft") ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                        onClick={() => handleStatusChange("Draft")}
                      >
                        Draft
                      </Button>
                      <Button
                        variant={filterState.status.includes("Published") ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                        onClick={() => handleStatusChange("Published")}
                      >
                        Published
                      </Button>
                      <Button
                        variant={filterState.status.includes("Scheduled") ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                        onClick={() => handleStatusChange("Scheduled")}
                      >
                        Scheduled
                      </Button>
                      <Button
                        variant={filterState.status.includes("Archived") ? "default" : "outline"}
                        size="sm"
                        className="h-8"
                        onClick={() => handleStatusChange("Archived")}
                      >
                        Archived
                      </Button>
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Date Range</Label>
                    </div>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 justify-start text-left font-normal">
                            {filterState.dateRange.from ? (
                              format(filterState.dateRange.from, "PPP")
                            ) : (
                              <span className="text-muted-foreground">From date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={filterState.dateRange.from}
                            onSelect={(date) => handleDateRangeChange("from", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 justify-start text-left font-normal">
                            {filterState.dateRange.to ? (
                              format(filterState.dateRange.to, "PPP")
                            ) : (
                              <span className="text-muted-foreground">To date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={filterState.dateRange.to}
                            onSelect={(date) => handleDateRangeChange("to", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Word Count Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Word Count</Label>
                    </div>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 5000]}
                        min={0}
                        max={5000}
                        step={100}
                        value={filterState.wordCount}
                        onValueChange={(value) => handleWordCountChange(value as [number, number])}
                      />
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{filterState.wordCount[0].toLocaleString()} words</span>
                        <span>{filterState.wordCount[1].toLocaleString()} words</span>
                      </div>
                    </div>
                  </div>

                  {/* Traffic Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Traffic</Label>
                    </div>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 1000000]}
                        min={0}
                        max={1000000}
                        step={1000}
                        value={filterState.traffic}
                        onValueChange={(value) => handleTrafficChange(value as [number, number])}
                      />
                      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{filterState.traffic[0].toLocaleString()}</span>
                        <span>{filterState.traffic[1].toLocaleString()}+</span>
                      </div>
                    </div>
                  </div>

                  {/* Starred Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Starred</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={filterState.starred} onCheckedChange={handleStarredChange} id="starred-filter" />
                      <Label htmlFor="starred-filter">Show only starred articles</Label>
                    </div>
                  </div>

                  {/* Keywords Filter */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Keywords</Label>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add keyword..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            addKeyword()
                          }
                        }}
                        className="h-8"
                      />
                      <Button variant="outline" size="sm" className="h-8" onClick={addKeyword}>
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {filterState.keywords.map((kw) => (
                        <Badge key={kw} variant="outline" className="bg-primary/10 text-primary">
                          {kw}
                          <button className="ml-1 rounded-full hover:bg-primary/20" onClick={() => removeKeyword(kw)}>
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Filter Presets */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4 text-primary" />
                      <Label className="font-medium">Filter Presets</Label>
                    </div>
                    <div className="flex gap-2">
                      <Select>
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Load preset" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Recently Published</SelectItem>
                          <SelectItem value="high-traffic">High Traffic</SelectItem>
                          <SelectItem value="draft">Drafts Only</SelectItem>
                          <SelectItem value="custom">Custom Preset 1</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm" className="h-8" onClick={saveFilters}>
                        Save
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                  <Button size="sm" onClick={toggleFilter}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
