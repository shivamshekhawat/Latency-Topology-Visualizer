"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Line } from "@react-three/drei"
import * as THREE from "three"
import type { Exchange, LatencyData, CloudProvider } from "../types"

// Globe component
export function Globe() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial color="#1e40af" transparent opacity={0.8} wireframe={false} />
      <mesh>
        <sphereGeometry args={[2.01, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} wireframe={true} />
      </mesh>
    </mesh>
  )
}

// Exchange Marker component
export function ExchangeMarker({
  exchange,
  isSelected,
  onClick,
}: {
  exchange: Exchange
  isSelected: boolean
  onClick: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [x, y, z] = useMemo(() => {
    const phi = (90 - exchange.latitude) * (Math.PI / 180)
    const theta = (exchange.longitude + 180) * (Math.PI / 180)
    const radius = 2.1

    return [
      -(radius * Math.sin(phi) * Math.cos(theta)),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    ]
  }, [exchange.latitude, exchange.longitude])

  const color = useMemo(() => {
    switch (exchange.cloudProvider) {
      case "aws":
        return "#ff9900"
      case "gcp":
        return "#4285f4"
      case "azure":
        return "#0078d4"
      default:
        return "#6b7280"
    }
  }, [exchange.cloudProvider])

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isSelected ? 1.5 : 1
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group position={[x, y, z]}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default"
        }}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isSelected ? 0.5 : 0.2} />
      </mesh>

      {isSelected && (
        <Html distanceFactor={10}>
          <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg border text-xs min-w-[200px]">
            <div className="font-semibold text-gray-900 dark:text-white">{exchange.name}</div>
            <div className="text-gray-600 dark:text-gray-300">{exchange.location}</div>
            <div className="text-gray-500 dark:text-gray-400">Provider: {exchange.cloudProvider.toUpperCase()}</div>
            <div className="text-gray-500 dark:text-gray-400">Region: {exchange.region}</div>
            <div className="text-green-600 dark:text-green-400">Latency: {exchange.currentLatency}ms</div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Cloud Region component
export function CloudRegion({ provider }: { provider: CloudProvider }) {
  const regions = useMemo(() => {
    const regionData = {
      aws: [
        { name: "us-east-1", lat: 39.0458, lng: -76.6413, color: "#ff9900" },
        { name: "eu-west-1", lat: 53.3498, lng: -6.2603, color: "#ff9900" },
        { name: "ap-southeast-1", lat: 1.3521, lng: 103.8198, color: "#ff9900" },
      ],
      gcp: [
        { name: "us-central1", lat: 41.2619, lng: -95.8608, color: "#4285f4" },
        { name: "europe-west1", lat: 50.4501, lng: 3.8196, color: "#4285f4" },
        { name: "asia-east1", lat: 24.0717, lng: 120.5624, color: "#4285f4" },
      ],
      azure: [
        { name: "East US", lat: 37.3719, lng: -79.8164, color: "#0078d4" },
        { name: "West Europe", lat: 52.3667, lng: 4.9, color: "#0078d4" },
        { name: "Southeast Asia", lat: 1.3521, lng: 103.8198, color: "#0078d4" },
      ],
    }
    return regionData[provider] || []
  }, [provider])

  return (
    <>
      {regions.map((region, index) => {
        const phi = (90 - region.lat) * (Math.PI / 180)
        const theta = (region.lng + 180) * (Math.PI / 180)
        const radius = 2.05

        const x = -(radius * Math.sin(phi) * Math.cos(theta))
        const y = radius * Math.cos(phi)
        const z = radius * Math.sin(phi) * Math.sin(theta)

        return (
          <group key={`${provider}-${index}`} position={[x, y, z]}>
            <mesh>
              <ringGeometry args={[0.1, 0.15, 16]} />
              <meshBasicMaterial color={region.color} transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>
          </group>
        )
      })}
    </>
  )
}

// Latency Connections component
export function LatencyConnections({
  exchanges,
  latencyData,
}: {
  exchanges: Exchange[]
  latencyData: LatencyData[]
}) {
  const connections = useMemo(() => {
    const result: Array<{
      start: [number, number, number]
      end: [number, number, number]
      latency: number
      color: string
    }> = []

    exchanges.forEach((exchange1, i) => {
      exchanges.slice(i + 1).forEach((exchange2) => {
        const latency =
          latencyData.find(
            (l) =>
              (l.source === exchange1.id && l.target === exchange2.id) ||
              (l.source === exchange2.id && l.target === exchange1.id),
          )?.latency || Math.random() * 200 + 50

        const getPosition = (ex: Exchange): [number, number, number] => {
          const phi = (90 - ex.latitude) * (Math.PI / 180)
          const theta = (ex.longitude + 180) * (Math.PI / 180)
          const radius = 2.1

          return [
            -(radius * Math.sin(phi) * Math.cos(theta)),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta),
          ]
        }

        const color = latency < 50 ? "#10b981" : latency < 100 ? "#f59e0b" : "#ef4444"

        result.push({
          start: getPosition(exchange1),
          end: getPosition(exchange2),
          latency,
          color,
        })
      })
    })

    return result
  }, [exchanges, latencyData])

  return (
    <>
      {connections.map((connection, index) => (
        <Line
          key={index}
          points={[connection.start, connection.end]}
          color={connection.color}
          lineWidth={2}
          transparent
          opacity={0.6}
        />
      ))}
    </>
  )
}
