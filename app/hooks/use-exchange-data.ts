"use client"

import { useState, useMemo } from "react"
import type { Exchange, CloudProvider } from "../types"

export function useExchangeData(searchQuery: string, selectedProvider: CloudProvider | "all") {
  const [exchanges] = useState<Exchange[]>([
    {
      id: "binance",
      name: "Binance",
      location: "Singapore",
      latitude: 1.3521,
      longitude: 103.8198,
      cloudProvider: "aws",
      region: "ap-southeast-1",
      currentLatency: 45,
    },
    {
      id: "okx",
      name: "OKX",
      location: "Hong Kong",
      latitude: 22.3193,
      longitude: 114.1694,
      cloudProvider: "gcp",
      region: "asia-east1",
      currentLatency: 38,
    },
    {
      id: "deribit",
      name: "Deribit",
      location: "Amsterdam",
      latitude: 52.3676,
      longitude: 4.9041,
      cloudProvider: "azure",
      region: "west-europe",
      currentLatency: 52,
    },
    {
      id: "bybit",
      name: "Bybit",
      location: "Singapore",
      latitude: 1.3521,
      longitude: 103.8198,
      cloudProvider: "aws",
      region: "ap-southeast-1",
      currentLatency: 41,
    },
    {
      id: "coinbase",
      name: "Coinbase Pro",
      location: "San Francisco",
      latitude: 37.7749,
      longitude: -122.4194,
      cloudProvider: "gcp",
      region: "us-west1",
      currentLatency: 67,
    },
    {
      id: "kraken",
      name: "Kraken",
      location: "London",
      latitude: 51.5074,
      longitude: -0.1278,
      cloudProvider: "aws",
      region: "eu-west-2",
      currentLatency: 58,
    },
    {
      id: "huobi",
      name: "Huobi",
      location: "Tokyo",
      latitude: 35.6762,
      longitude: 139.6503,
      cloudProvider: "azure",
      region: "japan-east",
      currentLatency: 43,
    },
    {
      id: "ftx",
      name: "FTX",
      location: "Miami",
      latitude: 25.7617,
      longitude: -80.1918,
      cloudProvider: "aws",
      region: "us-east-1",
      currentLatency: 72,
    },
  ])

  const filteredExchanges = useMemo(() => {
    return exchanges.filter((exchange) => {
      const matchesSearch =
        exchange.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exchange.location.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesProvider = selectedProvider === "all" || exchange.cloudProvider === selectedProvider

      return matchesSearch && matchesProvider
    })
  }, [exchanges, searchQuery, selectedProvider])

  return {
    exchanges,
    filteredExchanges,
  }
}
