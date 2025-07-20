interface Props {
  provider: "aws" | "gcp" | "azure"
}

const providerColors = {
  aws: "orange",
  gcp: "blue",
  azure: "purple",
}

export default function CloudRegion({ provider }: Props) {
  const regionPositions = {
    aws: [[-0.5, 0.2, 1.01]],
    gcp: [[0.3, -0.4, 1.01]],
    azure: [[0.6, 0.3, 1.01]],
  }

  const color = providerColors[provider]

  return (
    <>
      {regionPositions[provider].map((pos, idx) => (
        <mesh key={idx} position={pos as [number, number, number]}>
          <boxGeometry args={[0.03, 0.03, 0.03]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
    </>
  )
}
