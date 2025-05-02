"use client"

import { useEffect, useRef } from "react"

interface SkillBadgeProps {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
  color: string
}

export function SkillBadge({ name, level, color }: SkillBadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Map level to a glow intensity
  const glowIntensity = {
    Beginner: 5,
    Intermediate: 10,
    Advanced: 15,
  }[level]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw pentagon
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const size = Math.min(centerX, centerY) * 0.9

    // Calculate pentagon points
    const points = []
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2 // Start from top
      const x = centerX + size * Math.cos(angle)
      const y = centerY + size * Math.sin(angle)
      points.push({ x, y })
    }

    // Draw glow effect
    ctx.shadowColor = color
    ctx.shadowBlur = glowIntensity

    // Draw pentagon outline
    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y)
    }
    ctx.closePath()

    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()

    // Reset shadow for text
    ctx.shadowBlur = 0

    // Draw skill name
    ctx.fillStyle = color
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.fillText(name, centerX, centerY - 10)

    // Draw level
    ctx.fillStyle = "#F0F0F0"
    ctx.font = "12px Arial"
    ctx.fillText(level, centerX, centerY + 15)
  }, [name, level, color, glowIntensity])

  return (
    <div className="relative group">
      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        className="w-[150px] h-[150px] transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-[#121212]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
    </div>
  )
}
