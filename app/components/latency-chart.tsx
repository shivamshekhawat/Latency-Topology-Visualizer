"use client"

import { useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Button } from "@/components/ui/button"
import type { HistoricalLatencyData } from "../types"

interface LatencyChartProps {
  data: HistoricalLatencyData[]
  selectedExchange: string | null
}

export function LatencyChart({ data, selectedExchange }: LatencyChartProps) {
  const chartData = useMemo(() => {
    if (!selectedExchange) return data.slice(-24) // Last 24 hours by default

    return data.filter((d) => d.exchangePair.includes(selectedExchange)).slice(-24)
  }, [data, selectedExchange])

  const timeRanges = [
    { label: "1 Hour", value: "1h", hours: 1 },
    { label: "24 Hours", value: "24h", hours: 24 },
    { label: "7 Days", value: "7d", hours: 168 },
    { label: "30 Days", value: "30d", hours: 720 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Latency Trends</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {selectedExchange ? `Showing data for ${selectedExchange}` : "Showing aggregate data"}
          </p>
        </div>

        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <Button key={range.value} variant="outline" size="sm">
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(value) => new Date(value).toLocaleTimeString()} />
            <YAxis label={{ value: "Latency (ms)", angle: -90, position: "insideLeft" }} />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value: number) => [`${value}ms`, "Latency"]}
            />
            <Legend />
            <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={2} dot={false} name="Latency" />
            <Line
              type="monotone"
              dataKey="avgLatency"
              stroke="#10b981"
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Average"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
          <div className="text-lg font-semibold text-green-700 dark:text-green-400">
            {Math.min(...chartData.map((d) => d.latency)).toFixed(1)}ms
          </div>
          <div className="text-xs text-green-600 dark:text-green-500">Minimum</div>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
          <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            {(chartData.reduce((sum, d) => sum + d.latency, 0) / chartData.length).toFixed(1)}ms
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-500">Average</div>
        </div>
        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
          <div className="text-lg font-semibold text-red-700 dark:text-red-400">
            {Math.max(...chartData.map((d) => d.latency)).toFixed(1)}ms
          </div>
          <div className="text-xs text-red-600 dark:text-red-500">Maximum</div>
        </div>
      </div>
    </div>
  )
}
