import { useEffect, useRef } from 'react'

// Animated network of dots with connecting lines that adapts to dark/light theme
export default function DotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    // handle high-DPI for crisp lines
    const setSize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      width = window.innerWidth
      height = window.innerHeight
    }

    let width = 0
    let height = 0
    setSize()

    const themeIsDark = () => document.documentElement.classList.contains('dark')

    type Dot = { x: number; y: number; vx: number; vy: number }
    let dots: Dot[] = []

    function init() {
      setSize()
      const density = Math.min(220, Math.floor((width * height) / 12000)) // denser network, capped for perf
      dots = new Array(density).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      }))
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      const dark = themeIsDark()
      const dotColor = dark ? 'rgba(129, 140, 248, 0.95)' : 'rgba(5, 150, 105, 0.95)' // indigo-400 vs emerald-600
      const lineColor = dark ? 'rgba(99, 102, 241, 0.28)' : 'rgba(16, 185, 129, 0.32)'
      const bgGradient = ctx.createLinearGradient(0, 0, width, height)
      if (dark) {
        bgGradient.addColorStop(0, '#0b0f1a')
        bgGradient.addColorStop(1, '#0f172a')
      } else {
        bgGradient.addColorStop(0, '#f8fafc')
        bgGradient.addColorStop(1, '#e6fffb')
      }
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      // update
      for (const d of dots) {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > width) d.vx *= -1
        if (d.y < 0 || d.y > height) d.vy *= -1
      }

      // draw connections
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist2 = dx * dx + dy * dy
          const maxDist2 = 180 * 180
          if (dist2 < maxDist2) {
            const alpha = 1 - dist2 / maxDist2
            ctx.globalAlpha = Math.max(0.12, alpha * 0.9)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // draw dots
      ctx.fillStyle = dotColor
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(step)
    }

    init()
    step()

    const onResize = () => init()
    const onTheme = () => {
      // re-render with new palette next frame; no-op since colors are evaluated each frame
    }
    window.addEventListener('resize', onResize)
    const mo = new MutationObserver(onTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      mo.disconnect()
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
