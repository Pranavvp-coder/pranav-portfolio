import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

// Faint grid + slow-drifting candlesticks + soft particles on one lightweight canvas.
export default function Background() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    let w, h, raf, dpr = Math.min(window.devicePixelRatio || 1, 2)
    const small = window.innerWidth < 768
    const candles = [], dots = []
    const resize = () => {
      w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'
    }
    resize(); addEventListener('resize', resize)
    for (let i = 0; i < (small ? 14 : 28); i++) candles.push({ x: Math.random(), y: 0.2 + Math.random() * 0.7, s: 0.5 + Math.random(), up: Math.random() > 0.45, v: 0.00002 + Math.random() * 0.00003 })
    for (let i = 0; i < (small ? 25 : 55); i++) dots.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.4, v: 0.00004 + Math.random() * 0.00008 })
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(255,255,255,0.035)'; ctx.lineWidth = dpr
      const g = 80 * dpr
      for (let x = 0; x < w; x += g) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke() }
      for (let y = 0; y < h; y += g) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke() }
      candles.forEach(k => {
        if (!reduce) { k.y -= k.v; if (k.y < -0.1) k.y = 1.1 }
        const cx = k.x * w, cy = k.y * h, bh = 26 * k.s * dpr, bw = 7 * dpr
        ctx.strokeStyle = ctx.fillStyle = k.up ? 'rgba(37,139,255,0.16)' : 'rgba(146,155,170,0.1)'
        ctx.beginPath(); ctx.moveTo(cx, cy - bh * 1.3); ctx.lineTo(cx, cy + bh * 1.3); ctx.stroke()
        ctx.fillRect(cx - bw / 2, cy - bh / 2, bw, bh)
      })
      dots.forEach(d => {
        if (!reduce) { d.y -= d.v; if (d.y < 0) d.y = 1 }
        ctx.fillStyle = 'rgba(37,139,255,0.35)'
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r * dpr, 0, 6.283); ctx.fill()
      })
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [reduce])
  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none" />
}
