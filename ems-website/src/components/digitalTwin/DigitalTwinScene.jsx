import { useMemo, useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Edges, Float, Line, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'

export const twinSystems = {
  power: { label: 'Electrical Power', color: '#36c8ff' },
  scada: { label: 'SCADA Network', color: '#8b7cff' },
  water: { label: 'Water Systems', color: '#34e6b5' },
  fire: { label: 'Safety & Fire', color: '#ff6b5d' },
  hvac: { label: 'HVAC & BMS', color: '#61dafb' },
  solar: { label: 'Solar Generation', color: '#8af4ff' },
}

export const districts = [
  {
    id: 'commercial',
    label: 'Corporate Campus',
    position: [-8, 0, -5],
    service: '/services/building-management',
    system: 'power',
    load: '5.4 MW',
    status: 'Automated',
    systems: ['BMS', 'Lighting', 'Access Control'],
    connected: 'EMS Smart Building Suite',
    camera: [-12, 7, -6],
  },
  {
    id: 'hospital',
    label: 'Hospital Hub',
    position: [-2.5, 0, -7],
    service: '/industries/hospitals',
    system: 'fire',
    load: '3.1 MW',
    status: 'Critical Monitoring',
    systems: ['Fire Detection', 'BMS', 'Emergency Power'],
    connected: 'EMS Healthcare Grid',
    camera: [-3.5, 7.5, -9],
  },
  {
    id: 'hotel',
    label: 'Smart Office Tower',
    position: [3.5, 0, -7],
    service: '/industries/hotels',
    system: 'hvac',
    load: '2.7 MW',
    status: 'Optimized',
    systems: ['HVAC', 'Energy Analytics', 'Lighting'],
    connected: 'EMS Campus Control',
    camera: [5, 8, -8],
  },
  {
    id: 'airport',
    label: 'Logistics Terminal',
    position: [9, 0, -5.5],
    service: '/industries/airports',
    system: 'scada',
    load: '8.5 MW',
    status: 'Live SCADA',
    systems: ['SCADA', 'Security', 'Asset Tracking'],
    connected: 'EMS Aviation Network',
    camera: [11, 7, -6],
  },
  {
    id: 'factory',
    label: 'Industrial Plant',
    position: [-8, 0, 1],
    service: '/services/control-systems',
    system: 'scada',
    load: '6.9 MW',
    status: 'Real-time Control',
    systems: ['PLC', 'SCADA', 'Energy Optimization'],
    connected: 'EMS Manufacturing Suite',
    camera: [-10, 8, 2],
  },
  {
    id: 'data',
    label: 'Data Center',
    position: [-2.5, 0, 0],
    service: '/industries/data-centers',
    system: 'power',
    load: '7.9 MW',
    status: 'Redundant',
    systems: ['UPS', 'Cooling', 'Monitoring'],
    connected: 'EMS Data Backbone',
    camera: [-2.5, 8, 3],
  },
  {
    id: 'water',
    label: 'Water Treatment',
    position: [4, 0, 0],
    service: '/industries/water-systems',
    system: 'water',
    load: '3.3 ML/h',
    status: 'Flow Stable',
    systems: ['Pumping', 'SCADA', 'Quality Control'],
    connected: 'EMS Utility Grid',
    camera: [5.5, 7, 1],
  },
  {
    id: 'oil',
    label: 'Energy Hub',
    position: [9, 0, 1],
    service: '/industries/oil-gas',
    system: 'fire',
    load: '5.5 MW',
    status: 'Hazard Safe',
    systems: ['Fire Safety', 'Leak Detection', 'SCADA'],
    connected: 'EMS Energy Platform',
    camera: [11, 7, 3],
  },
  {
    id: 'residential',
    label: 'Smart Residential',
    position: [-6, 0, 7],
    service: '/industries/residential',
    system: 'hvac',
    load: '3.2 MW',
    status: 'Comfort Mode',
    systems: ['HVAC', 'Lighting', 'Security'],
    connected: 'EMS Home Network',
    camera: [-6, 7, 9],
  },
  {
    id: 'solar',
    label: 'PV Array',
    position: [0, 0, 7],
    service: '/services/solar-energy',
    system: 'solar',
    load: '5.2 MW',
    status: 'Generating',
    systems: ['PV Monitoring', 'Storage', 'Analytics'],
    connected: 'EMS Renewables Hub',
    camera: [0, 7, 10],
  },
  {
    id: 'substation',
    label: 'Electrical Substation',
    position: [6, 0, 6],
    service: '/services/electrical',
    system: 'power',
    load: '33 kV',
    status: 'Load Balanced',
    systems: ['Switchgear', 'Protection', 'Metering'],
    connected: 'EMS Grid Control',
    camera: [8, 8, 8],
  },
]

const holoBase = {
  color: '#0b2c44',
  emissive: '#083b57',
  edgeColor: '#48d9ff',
}

function HoloBox({ position, scale, fill = holoBase.color, edgeColor = holoBase.edgeColor, opacity = 0.16, emissive = holoBase.emissive, highlight = false }) {
  return (
    <group position={position}>
      <mesh position={[0, scale[1] / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={scale} />
        <meshStandardMaterial
          color={fill}
          emissive={highlight ? '#72e5ff' : emissive}
          emissiveIntensity={highlight ? 0.65 : 0.35}
          transparent
          opacity={opacity}
          metalness={0.65}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0, scale[1] / 2, 0]}>
        <boxGeometry args={scale} />
        <Edges threshold={15} color={edgeColor} />
      </mesh>
    </group>
  )
}

function HoloCylinder({ position, radius, height, color = holoBase.color, edgeColor = holoBase.edgeColor, highlight = false }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={highlight ? '#72e5ff' : holoBase.emissive}
          emissiveIntensity={highlight ? 0.65 : 0.35}
          transparent
          opacity={0.18}
          metalness={0.6}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius + 0.04, radius + 0.04, height + 0.04, 32]} />
        <Edges threshold={15} color={edgeColor} />
      </mesh>
    </group>
  )
}

function RoadSegment({ position, rotation = [0, 0, 0], width = 1.2, length = 8 }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[width, 0.02, length]} />
        <meshStandardMaterial color="#0d1f30" emissive="#071922" metalness={0.15} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.031, 0]}>
        <boxGeometry args={[width * 0.95, 0.01, length * 0.92]} />
        <meshStandardMaterial color="#0f2c40" transparent opacity={0.92} />
      </mesh>
      <Line points={[[0, 0.04, -length / 2], [0, 0.04, length / 2]]} color="#4bf0ff" lineWidth={1} transparent opacity={0.18} />
    </group>
  )
}

function DistrictModel({ district, selected }) {
  const highlight = selected?.id === district.id
  const [x, , z] = district.position
  if (district.id === 'commercial') {
    return (
      <group position={[x, 0, z]}>
        <HoloBox position={[-2.1, 0, 0]} scale={[1.4, 4.8, 1.4]} highlight={highlight} />
        <HoloBox position={[1.2, 0, 0.1]} scale={[1.8, 5.6, 1.3]} highlight={highlight} />
        <HoloBox position={[0.6, 0, -1.9]} scale={[3.8, 1.1, 2.2]} opacity={0.14} />
      </group>
    )
  }
  if (district.id === 'hospital') {
    return (
      <group position={[x, 0, z]}>
        <HoloBox position={[0, 0, -0.4]} scale={[3.6, 1.2, 2.4]} highlight={highlight} />
        <HoloBox position={[0, 0, 1.1]} scale={[1.8, 2.4, 1.6]} highlight={highlight} />
        <mesh position={[0, 1.15, 1.14]} rotation={[0, 0, 0]}> <boxGeometry args={[0.6, 0.6, 0.06]} /> <meshStandardMaterial color="#8af4ff" emissive="#52d4ff" emissiveIntensity={0.7} /></mesh>
      </group>
    )
  }
  if (district.id === 'hotel') {
    return (
      <group position={[x, 0, z]}>
        <HoloBox position={[0, 0, 0]} scale={[2.5, 5.4, 1.8]} highlight={highlight} />
        <HoloBox position={[0, 0, -2.1]} scale={[4.2, 0.8, 1.4]} opacity={0.14} />
      </group>
    )
  }
  if (district.id === 'airport') {
    return (
      <group position={[x, 0, z]}>
        <HoloBox position={[0, 0, 0]} scale={[5.6, 0.6, 2.1]} />
        <HoloBox position={[0, 0, 2.2]} scale={[7.2, 0.08, 1.2]} fill="#0f2b42" opacity={0.95} />
        <mesh position={[-2.8, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 4.9]} />
          <meshStandardMaterial color="#9cf6fd" emissive="#9cf6fd" emissiveIntensity={0.7} transparent opacity={0.65} />
        </mesh>
      </group>
    )
  }
  if (district.id === 'factory') {
    return (
      <group position={[x, 0, z]}>
        <HoloBox position={[0, 0, 0]} scale={[4.2, 1.4, 2.8]} highlight={highlight} />
        <HoloCylinder position={[-1.2, 0, 0]} radius={0.4} height={3.2} />
        <HoloCylinder position={[0.8, 0, -0.1]} radius={0.35} height={2.8} />
      </group>
    )
  }
  if (district.id === 'data') {
    return (
      <group position={[x, 0, z]}>
        {[-1.3, 0, 1.3].map((offset, idx) => (
          <HoloBox key={offset} position={[offset, 0, 0]} scale={[0.9, 1.8, 2.6]} opacity={idx === 1 ? 0.22 : 0.16} highlight={highlight} />
        ))}
      </group>
    )
  }
  if (district.id === 'water') {
    return (
      <group position={[x, 0, z]}>
        <HoloCylinder position={[-1.1, 0, 0]} radius={0.95} height={1.1} highlight={highlight} />
        <HoloCylinder position={[1.1, 0, 0]} radius={0.95} height={1.1} highlight={highlight} />
        <HoloBox position={[0, 0, -1.75]} scale={[3.8, 1.25, 0.85]} />
      </group>
    )
  }
  if (district.id === 'oil') {
    return (
      <group position={[x, 0, z]}>
        {[-1.3, 0, 1.3].map(offset => (
          <HoloCylinder key={offset} position={[offset, 0, 0]} radius={0.7} height={1.7} highlight={highlight} />
        ))}
        <HoloBox position={[0, 0, -1.2]} scale={[0.4, 3.8, 0.4]} />
      </group>
    )
  }
  if (district.id === 'residential') {
    return (
      <group position={[x, 0, z]}>
        {[-1.5, -0.5, 1.5].map((offset, idx) => (
          <HoloBox key={idx} position={[offset, 0, idx % 2 === 0 ? 0 : 1.1]} scale={[0.9, 1.2, 0.9]} highlight={highlight} />
        ))}
      </group>
    )
  }
  if (district.id === 'solar') {
    return (
      <group position={[x, 0, z]}>
        {[-1.8, 1.8].map((a) => (
          <mesh key={a} position={[a, 0.38, -0.1]} rotation={[-0.35, 0, 0]}>
            <boxGeometry args={[1.1, 0.08, 0.75]} />
            <meshStandardMaterial color="#0d3a5e" emissive="#0f8aff" emissiveIntensity={0.45} metalness={0.75} roughness={0.12} />
          </mesh>
        ))}
      </group>
    )
  }
  if (district.id === 'substation') {
    return (
      <group position={[x, 0, z]}>
        <HoloBox position={[0, 0, 0]} scale={[2.8, 0.9, 1.8]} highlight={highlight} />
        <group position={[-1.1, 0, -0.8]}>
          {[0, 0.9, 1.8].map((z, idx) => (
            <HoloBox key={idx} position={[0, 0, z]} scale={[0.28, 1.4, 0.8]} />
          ))}
        </group>
      </group>
    )
  }
  return null
}

function InfrastructureStream({ points, color, speed, active }) {
  const particles = useRef([])
  useFrame(({ clock }) => {
    particles.current.forEach((mesh, index) => {
      if (!mesh || points.length < 2) return
      const t = (clock.elapsedTime * speed + index / particles.current.length) % 1
      const segment = Math.min(Math.floor(t * (points.length - 1)), points.length - 2)
      const local = (t * (points.length - 1)) - segment
      mesh.position.lerpVectors(points[segment], points[segment + 1], local)
    })
  })
  return (
    <group visible={active}>
      <Line points={points} color={color} lineWidth={1.4} transparent opacity={0.48} />
      <group>
        {Array.from({ length: 7 }, (_, index) => (
          <mesh key={index} ref={node => { particles.current[index] = node }}>
            <sphereGeometry args={[0.08, 10, 10]} />
            <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Hotspot({ district, selected, onSelect, active }) {
  const color = twinSystems[district.system].color
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.24}>
      <group
        position={[district.position[0], 5.4, district.position[2]]}
        onPointerOver={e => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'default' }}
        onClick={e => { e.stopPropagation(); onSelect(district) }}
      >
        <mesh scale={selected ? 1.35 : 1}>
          <sphereGeometry args={[0.18, 18, 18]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.28, 0.36, 32]} />
          <meshBasicMaterial color={color} transparent opacity={active ? 0.92 : 0.22} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

function CameraController({ selected }) {
  const { camera, mouse } = useThree()
  const orbit = useRef(0)
  const target = useRef(new THREE.Vector3(0, 1.2, 0))

  useEffect(() => {
    const destination = selected ? new THREE.Vector3(...selected.camera) : new THREE.Vector3(18, 16, 20)
    gsap.to(camera.position, { x: destination.x, y: destination.y, z: destination.z, duration: 1.55, ease: 'power2.out' })
  }, [selected, camera])

  useFrame((state, delta) => {
    orbit.current += delta * 0.14
    const base = selected ? new THREE.Vector3(...selected.camera) : new THREE.Vector3(Math.cos(orbit.current) * 18, 16, Math.sin(orbit.current) * 18)
    const parallax = new THREE.Vector3(mouse.x * 2, mouse.y * 1.2, 0)
    const desired = base.add(parallax)
    camera.position.lerp(desired, 0.06)
    if (selected) {
      target.current.set(selected.position[0], 1.3, selected.position[2])
    } else {
      target.current.set(0, 1.2, 0)
    }
    camera.lookAt(target.current)
  })

  return null
}

function BlueprintGrid() {
  const lines = []
  for (let i = -20; i <= 20; i += 2) {
    lines.push([[i, 0.01, -20], [i, 0.01, 20]])
    lines.push([[-20, 0.01, i], [20, 0.01, i]])
  }
  return <group>{lines.map((points, index) => <Line key={index} points={points} color="#0b2740" lineWidth={1} transparent opacity={0.34} />)}</group>
}

export default function DigitalTwinScene({ enabledSystems, selected, onSelect = () => {}, storyProgress = null }) {
  const infrastructure = useMemo(() => [
    { system: 'power', color: '#36c8ff', speed: 0.22, points: [[6, 0.16, 6], [3, 0.16, 3], [0, 0.16, 0], [-8, 0.16, -5]] },
    { system: 'scada', color: '#8b7cff', speed: 0.24, points: [[9, 0.16, -5.5], [2, 0.16, -2], [0, 0.16, 0], [-8, 0.16, 1]] },
    { system: 'water', color: '#34e6b5', speed: 0.18, points: [[4, 0.16, 0], [1, 0.16, -2], [0, 0.16, 0], [-2.5, 0.16, -7]] },
    { system: 'solar', color: '#8af4ff', speed: 0.2, points: [[0, 0.16, 7], [0, 0.16, 2], [-2.5, 0.16, 0], [3.5, 0.16, -7]] },
  ], [])

  const buildingFill = useMemo(() => Array.from({ length: 20 }, (_, i) => ({ x: ((i * 7) % 18) - 9, z: ((i * 11) % 14) - 7, h: 0.6 + (i % 3) * 0.18 })), [])

  return (
    <>
      <color attach="background" args={['#02070f']} />
      <fog attach="fog" args={['#02070f', 12, 42]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 18, 8]} intensity={1.4} color="#8fd9ff" />
      <pointLight position={[-10, 8, -10]} intensity={0.8} color="#36c8ff" distance={28} />
      <pointLight position={[11, 7, 8]} intensity={1.2} color="#61dafb" distance={22} />
      <Sparkles count={45} scale={[40, 8, 40]} size={0.18} opacity={0.35} color="#62e1ff" speed={0.2} />
      <Stars radius={50} depth={15} count={250} factor={3} saturation={0} fade speed={0.1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[42, 36]} />
        <meshStandardMaterial color="#04121f" roughness={0.85} metalness={0.2} />
      </mesh>
      <BlueprintGrid />
      {buildingFill.map((b, index) => (
        <HoloBox key={index} position={[b.x, b.h / 2, b.z]} scale={[0.26, b.h, 0.26]} opacity={0.12} />
      ))}
      <group position={[0, 0.02, 0]}>
        <RoadSegment position={[0, 0, 0]} width={4.8} length={34} />
        <RoadSegment position={[-12, 0, 0]} rotation={[0, Math.PI / 2, 0]} width={3.6} length={20} />
        <RoadSegment position={[12, 0, -4]} rotation={[0, Math.PI / 2, 0]} width={3} length={16} />
        <RoadSegment position={[-4, 0, -11]} width={3} length={10} />
      </group>
      {districts.map(d => <DistrictModel key={d.id} district={d} selected={selected} />)}
      {infrastructure.map(stream => (
        <InfrastructureStream
          key={stream.system}
          points={stream.points.map(point => new THREE.Vector3(...point))}
          color={stream.color}
          speed={stream.speed}
          active={enabledSystems.includes(stream.system)}
        />
      ))}
      {districts.map(d => (
        <Hotspot
          key={d.id}
          district={d}
          selected={selected?.id === d.id}
          active={enabledSystems.includes(d.system)}
          onSelect={onSelect}
        />
      ))}
      <CameraController selected={selected} />
    </>
  )
}
