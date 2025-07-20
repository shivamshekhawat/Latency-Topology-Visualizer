"use client"

import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Globe, LatencyConnections, ExchangeMarker, CloudRegion } from "./components/3d-components"
import { LatencyChart } from "./components/latency-chart"
import { ControlPanel } from "./components/control-panel"
import { MetricsDashboard } from "./components/metrics-dashboard"
import { useLatencyData } from "./hooks/use-latency-data"
import { useExchangeData } from "./hooks/use-exchange-data"
import type { CloudProvider } from "./types"
import { GlobeIcon, Activity, TrendingUp } from "lucide-react"

export default function CryptoLatencyDashboard() {
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null)
  const [selectedProvider, setSelectedProvider] = useState<CloudProvider | "all">("all")
  const [showRealtime, setShowRealtime] = useState(true)
  const [showHistorical, setShowHistorical] = useState(false)
  const [showRegions, setShowRegions] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const { exchanges, filteredExchanges } = useExchangeData(searchQuery, selectedProvider)
  const { latencyData, historicalData, isLoading } = useLatencyData()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <GlobeIcon className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Crypto Exchange Latency Monitor</h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Real-time infrastructure monitoring across AWS, GCP, and Azure
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} aria-label="Toggle dark mode" />
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              showRealtime={showRealtime}
              setShowRealtime={setShowRealtime}
              showHistorical={showHistorical}
              setShowHistorical={setShowHistorical}
              showRegions={showRegions}
              setShowRegions={setShowRegions}
              exchanges={exchanges}
              selectedExchange={selectedExchange}
              setSelectedExchange={setSelectedExchange}
            />

            <div className="mt-6">
              <MetricsDashboard latencyData={latencyData} />
            </div>
          </div>

          {/* Main Visualization */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GlobeIcon className="h-5 w-5" />
                  <span>3D World Map - Exchange Infrastructure</span>
                </CardTitle>
                <CardDescription>
                  Interactive visualization of cryptocurrency exchange servers and latency data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[500px] p-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                  <ambientLight intensity={0.4} />
                  <pointLight position={[10, 10, 10]} intensity={1} />
                  <Stars radius={300} depth={60} count={1000} factor={7} />

                  <Globe />

                  {/* Exchange Markers */}
                  {filteredExchanges.map((exchange) => (
                    <ExchangeMarker
                      key={exchange.id}
                      exchange={exchange}
                      isSelected={selectedExchange === exchange.id}
                      onClick={() => setSelectedExchange(exchange.id)}
                    />
                  ))}

                  {/* Cloud Regions */}
                  {showRegions && (
                    <>
                      <CloudRegion provider="aws" />
                      <CloudRegion provider="gcp" />
                      <CloudRegion provider="azure" />
                    </>
                  )}

                  {/* Latency Connections */}
                  {showRealtime && <LatencyConnections exchanges={filteredExchanges} latencyData={latencyData} />}

                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    zoomSpeed={0.6}
                    panSpeed={0.5}
                    rotateSpeed={0.4}
                  />
                </Canvas>
              </CardContent>
            </Card>

            {/* Historical Data */}
            {showHistorical && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Historical Latency Trends</span>
                  </CardTitle>
                  <CardDescription>Time-series analysis of latency data between exchange pairs</CardDescription>
                </CardHeader>
                <CardContent>
                  <LatencyChart data={historicalData} selectedExchange={selectedExchange} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
