export type CloudProvider = "aws" | "gcp" | "azure"

export interface Exchange {
  id: string
  name: string
  location: string
  latitude: number
  longitude: number
  cloudProvider: CloudProvider
  region: string
  currentLatency: number
}

export interface LatencyData {
  source: string
  target: string
  latency: number
  timestamp: number
}

export interface HistoricalLatencyData {
  timestamp: number
  exchangePair: string
  latency: number
  avgLatency: number
  minLatency: number
  maxLatency: number
}

export interface CloudRegion {
  id: string
  name: string
  provider: CloudProvider
  location: string
  latitude: number
  longitude: number
  serverCount: number
}
