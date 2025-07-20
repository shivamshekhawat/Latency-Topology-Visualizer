import { useMemo } from "react"
import { Line } from "@react-three/drei"
import type { LatencyEntry, Exchange } from "../types"

interface Props {
  exchanges: Exchange[]
  latencyData: LatencyEntry[]
}

export default function LatencyConnections({ exchanges, latencyData }: Props) {
  const lines = useMemo(() => {
    const exchangeMap = new Map(exchanges.map(e => [e.id, e]))

    return latencyData.flatMap(entry => {
      const source = exchangeMap.get(entry.source)
      const target = exchangeMap.get(entry.target)

      if (!source || !target) return []

      const src = [source.longitude / 180, source.latitude / 90, 1]
      const dst = [target.longitude / 180, target.latitude / 90, 1]

      return {
        points: [src, dst],
        color: entry.latency > 200 ? "red" : entry.latency > 100 ? "orange" : "green",
      }
    })
  }, [exchanges, latencyData])

  return (
    <>
      {lines.map((line, index) => (
        <Line key={index} points={line.points} color={line.color} lineWidth={1} />
      ))}
    </>
  )
}
