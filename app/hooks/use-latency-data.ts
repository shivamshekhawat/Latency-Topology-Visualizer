"use client"

import { useState, useEffect } from "react"
import type { LatencyData, HistoricalLatencyData } from "../types"

export function useLatencyData() {
  const [latencyData, setLatencyData] = useState<LatencyData[]>([])
  const [historicalData, setHistoricalData] = useState<HistoricalLatencyData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Generate mock latency data
  const generateLatencyData = (): LatencyData[] => {
    const exchanges = ["binance", "okx", "deribit", "bybit", "coinbase", "kraken"]
    const data: LatencyData[] = []

    for (let i = 0; i < exchanges.length; i++) {
      for (let j = i + 1; j < exchanges.length; j++) {
        data.push({
          source: exchanges[i],
          target: exchanges[j],
          latency: Math.random() * 150 + 20, // 20-170ms
          timestamp: Date.now(),
        })
      }
    }

    return data
  }

  // Generate mock historical data
  const generateHistoricalData = (): HistoricalLatencyData[] => {
    const data: HistoricalLatencyData[] = []
    const now = Date.now()

    for (let i = 0; i < 100; i++) {
      const timestamp = now - i * 60000 // Every minute for last 100 minutes
      const baseLatency = 60 + Math.sin(i * 0.1) * 20 // Sine wave pattern
      const noise = (Math.random() - 0.5) * 30 // Random noise

      data.unshift({
        timestamp,
        exchangePair: "binance-okx",
        latency: Math.max(20, baseLatency + noise),
        avgLatency: baseLatency,
        minLatency: baseLatency - 15,
        maxLatency: baseLatency + 15,
      })
    }

    return data
  }

  useEffect(() => {
    // Initial data load
    setLatencyData(generateLatencyData())
    setHistoricalData(generateHistoricalData())
    setIsLoading(false)

    // Update real-time data every 5 seconds
    const interval = setInterval(() => {
      setLatencyData(generateLatencyData())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return {
    latencyData,
    historicalData,
    isLoading,
  }
}
