import { motion } from 'framer-motion'

/**
 * A slowly rotating, glass-like wireframe cube built with pure CSS 3D transforms.
 * Six semi-transparent faces layered in 3D space naturally create the "see-through"
 * depth effect (edges of the far faces visible through the near ones) without any
 * extra library — lightweight and fully controllable via props.
 *
 * Usage:
 *   <RotatingCube size={240} />
 *   <RotatingCube size={160} tone="primary" speed={16} className="absolute -right-10 top-10" />
 */
export default function RotatingCube({ size = 220, tone = 'cyan', speed = 22, tilt = -22, className = '' }) {
  const half = size / 2
  const edgeColor = tone === 'cyan' ? 'rgba(0,200,255,0.55)' : 'rgba(0,102,255,0.55)'
  const fillTop = tone === 'cyan' ? 'rgba(0,200,255,0.14)' : 'rgba(0,102,255,0.16)'
  const fillBottom = tone === 'cyan' ? 'rgba(0,102,255,0.05)' : 'rgba(7,24,46,0.05)'

  const faceBase = {
    position: 'absolute',
    width: size,
    height: size,
    top: 0,
    left: 0,
    border: `1px solid ${edgeColor}`,
    background: `linear-gradient(135deg, ${fillTop}, ${fillBottom})`,
    boxShadow: `inset 0 0 24px ${edgeColor}`
  }

  const faces = [
    { transform: `rotateY(0deg) translateZ(${half}px)` }, // front
    { transform: `rotateY(180deg) translateZ(${half}px)` }, // back
    { transform: `rotateY(90deg) translateZ(${half}px)` }, // right
    { transform: `rotateY(-90deg) translateZ(${half}px)` }, // left
    { transform: `rotateX(90deg) translateZ(${half}px)` }, // top
    { transform: `rotateX(-90deg) translateZ(${half}px)` } // bottom
  ]

  return (
    <div
      className={className}
      style={{ width: size, height: size, perspective: size * 5 }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: size,
          height: size,
          position: 'relative',
          transformStyle: 'preserve-3d',
          rotateX: tilt
        }}
        animate={{ rotateY: 360 }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {faces.map((f, i) => (
          <div key={i} style={{ ...faceBase, ...f }} />
        ))}
      </motion.div>
    </div>
  )
}
