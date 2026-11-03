import { useEffect, useRef } from 'react'

interface Ribbon {
  baseY: number
  amplitude: number
  frequency: number
  speed: number
  phase: number
  lines: number
  spread: number
  cyanMix: number
}

const ribbons: Ribbon[] = [
  { baseY: .52, amplitude: 92, frequency: .0016, speed: -.00030, phase: 2.1, lines: 18, spread: 68, cyanMix: .6 },
]

const BLUE = { r: 46, g: 150, b: 255 }
const CYAN = { r: 90, g: 225, b: 255 }
const FRAME_MS = 33

export default function GlowRibbons({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let width = 0
    let height = 0
    let lastDraw = -FRAME_MS

    const drawRibbon = (ribbon: Ribbon, time: number) => {
      const centerY = ribbon.baseY * height
      const step = Math.max(10, Math.round(width / 110))
      for (let i = 0; i < ribbon.lines; i++) {
        const t = i / (ribbon.lines - 1)
        const linePhase = ribbon.phase + t * 1.7
        const offset = (t - .5) * ribbon.spread
        const mix = Math.min(1, Math.max(0, ribbon.cyanMix + (t - .5) * .5))
        const r = Math.round(BLUE.r + (CYAN.r - BLUE.r) * mix)
        const g = Math.round(BLUE.g + (CYAN.g - BLUE.g) * mix)
        const b = Math.round(BLUE.b + (CYAN.b - BLUE.b) * mix)
        const alpha = .05 + .13 * Math.sin(t * Math.PI)
        ctx.beginPath()
        for (let x = -24; x <= width + 24; x += step) {
          const wave = Math.sin(x * ribbon.frequency + linePhase + time * ribbon.speed) * ribbon.amplitude
          const twist = Math.sin(x * ribbon.frequency * .55 + time * ribbon.speed * .7 + t * 2.6) * ribbon.spread * .45
          const y = centerY + wave + twist + offset
          if (x === -24) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        // Cheap two-pass glow: wide faint stroke under the bright core line.
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(alpha * .45).toFixed(3)})`
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
    }

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
      ctx.lineJoin = 'round'
      for (const ribbon of ribbons) drawRibbon(ribbon, time)
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.max(1, width)
      canvas.height = Math.max(1, height)
      if (reduced && width > 0 && height > 0) render(0)
    }

    const loop = (time: number) => {
      if (!document.hidden && time - lastDraw >= FRAME_MS) {
        lastDraw = time
        render(time)
      }
      frame = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduced) frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none fixed inset-0 h-full w-full ${className}`} />
}
