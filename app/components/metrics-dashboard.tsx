"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Globe, TrendingUp, TrendingDown } from "lucide-react"
import type { LatencyData } from "../types"

interface MetricsDashboardProps {
  latencyData: LatencyData[]
}

export function MetricsDashboard({ latencyData }: MetricsDashboardProps) {
  const avgLatency = latencyData.reduce((sum, d) => sum + d.latency, 0) / latencyData.length
  const minLatency = Math.min(...latencyData.map((d) => d.latency))
  const maxLatency = Math.max(...latencyData.map((d) => d.latency))
  const activeConnections = latencyData.length

  const getLatencyStatus = (latency: number) => {
    if (latency < 50) return { status: "excellent", color: "green" }
    if (latency < 100) return { status: "good", color: "yellow" }
    return { status: "poor", color: "red" }
  }

  const overallStatus = getLatencyStatus(avgLatency)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Activity className="h-4 w-4" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm">Overall Health</span>
            <Badge
              variant="outline"
              className={`${
                overallStatus.color === "green"
                  ? "border-green-300 text-green-700 bg-green-50"
                  : overallStatus.color === "yellow"
                    ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                    : "border-red-300 text-red-700 bg-red-50"
              }`}
            >
              {overallStatus.status.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Avg Latency</span>
              </div>
              <span className="text-sm font-medium">{avgLatency.toFixed(1)}ms</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingDown className="h-4 w-4 text-green-500" />
                <span className="text-sm">Min Latency</span>
              </div>
              <span className="text-sm font-medium">{minLatency.toFixed(1)}ms</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span className="text-sm">Max Latency</span>
              </div>
              <span className="text-sm font-medium">{maxLatency.toFixed(1)}ms</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-purple-500" />
                <span className="text-sm">Active Connections</span>
              </div>
              <span className="text-sm font-medium">{activeConnections}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span>Excellent (&lt;50ms)</span>
              <span>{latencyData.filter((d) => d.latency < 50).length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width: `${(latencyData.filter((d) => d.latency < 50).length / latencyData.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-xs">
              <span>Good (50-100ms)</span>
              <span>{latencyData.filter((d) => d.latency >= 50 && d.latency < 100).length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{
                  width: `${(latencyData.filter((d) => d.latency >= 50 && d.latency < 100).length / latencyData.length) * 100}%`,
                }}
              ></div>
            </div>

            <div className="flex justify-between text-xs">
              <span>Poor (&gt;100ms)</span>
              <span>{latencyData.filter((d) => d.latency >= 100).length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width: `${(latencyData.filter((d) => d.latency >= 100).length / latencyData.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
