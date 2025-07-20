import { Html } from "@react-three/drei"
import { useMemo } from "react"
import type { Exchange } from "../types"

interface Props {
  exchange: Exchange
  isSelected: boolean
  onClick: () => void
}

export default function ExchangeMarker({ exchange, isSelected, onClick }: Props) {
  const position = useMemo(() => {
    return [
      exchange.longitude / 180,
      exchange.latitude / 90,
      1.02,
    ]
  }, [exchange])

  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.015, 16, 16]} />
      <meshStandardMaterial color={isSelected ? "yellow" : "deepskyblue"} />
      {isSelected && (
        <Html distanceFactor={10}>
          <div className="bg-white p-1 rounded shadow text-xs font-semibold">{exchange.name}</div>
        </Html>
      )}
    </mesh>
  )
}
