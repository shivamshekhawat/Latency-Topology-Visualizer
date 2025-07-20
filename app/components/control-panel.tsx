"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Settings } from "lucide-react"
import type { CloudProvider, Exchange } from "../types"

interface ControlPanelProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedProvider: CloudProvider | "all"
  setSelectedProvider: (provider: CloudProvider | "all") => void
  showRealtime: boolean
  setShowRealtime: (show: boolean) => void
  showHistorical: boolean
  setShowHistorical: (show: boolean) => void
  showRegions: boolean
  setShowRegions: (show: boolean) => void
  exchanges: Exchange[]
  selectedExchange: string | null
  setSelectedExchange: (id: string | null) => void
}

export function ControlPanel({
  searchQuery,
  setSearchQuery,
  selectedProvider,
  setSelectedProvider,
  showRealtime,
  setShowRealtime,
  showHistorical,
  setShowHistorical,
  showRegions,
  setShowRegions,
  exchanges,
  selectedExchange,
  setSelectedExchange,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search exchanges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={selectedProvider} onValueChange={setSelectedProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Cloud Provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Providers</SelectItem>
              <SelectItem value="aws">AWS</SelectItem>
              <SelectItem value="gcp">Google Cloud</SelectItem>
              <SelectItem value="azure">Microsoft Azure</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Visualization Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Visualization</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm">Real-time Latency</span>
            <Switch checked={showRealtime} onCheckedChange={setShowRealtime} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Historical Data</span>
            <Switch checked={showHistorical} onCheckedChange={setShowHistorical} />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">Cloud Regions</span>
            <Switch checked={showRegions} onCheckedChange={setShowRegions} />
          </div>
        </CardContent>
      </Card>

      {/* Exchange List */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Active Exchanges</CardTitle>
          <CardDescription>{exchanges.length} exchanges monitored</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {exchanges.map((exchange) => (
              <div
                key={exchange.id}
                className={`p-2 rounded border cursor-pointer transition-colors ${
                  selectedExchange === exchange.id
                    ? "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700"
                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setSelectedExchange(selectedExchange === exchange.id ? null : exchange.id)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{exchange.name}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      exchange.cloudProvider === "aws"
                        ? "border-orange-300 text-orange-700"
                        : exchange.cloudProvider === "gcp"
                          ? "border-blue-300 text-blue-700"
                          : "border-blue-300 text-blue-700"
                    }`}
                  >
                    {exchange.cloudProvider.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {exchange.location} • {exchange.currentLatency}ms
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs">AWS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Google Cloud</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
            <span className="text-xs">Microsoft Azure</span>
          </div>
          <hr className="my-2" />
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-1 bg-green-500"></div>
              <span>Low Latency (&lt;50ms)</span>
            </div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-3 h-1 bg-yellow-500"></div>
              <span>Medium (50-100ms)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-1 bg-red-500"></div>
              <span>High (&gt;100ms)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
