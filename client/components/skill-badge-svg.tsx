"use client"

interface SkillBadgeSvgProps {
  name: string
  level: "Beginner" | "Intermediate" | "Advanced"
  color: string
}

export function SkillBadgeSvg({ name, level, color }: SkillBadgeSvgProps) {
  // Map level to a glow intensity
  const glowIntensity = {
    Beginner: 5,
    Intermediate: 10,
    Advanced: 15,
  }[level]

  // Calculate pentagon points for a regular pentagon
  const calculatePentagonPoints = () => {
    const size = 60
    const centerX = 75
    const centerY = 75

    const points = []
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2 // Start from top
      const x = centerX + size * Math.cos(angle)
      const y = centerY + size * Math.sin(angle)
      points.push(`${x},${y}`)
    }

    return points.join(" ")
  }

  return (
    <div className="relative group">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        className="transition-transform duration-300 group-hover:scale-110"
      >
        <defs>
          <filter id={`glow-${name}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glowIntensity} result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Pentagon shape */}
        <polygon
          points={calculatePentagonPoints()}
          fill="transparent"
          stroke={color}
          strokeWidth="2"
          filter={`url(#glow-${name})`}
        />

        {/* Skill name */}
        <text x="75" y="65" textAnchor="middle" fill={color} fontWeight="bold" fontSize="14">
          {name}
        </text>

        {/* Level */}
        <text x="75" y="90" textAnchor="middle" fill="#F0F0F0" fontSize="12">
          {level}
        </text>
      </svg>
      <div className="absolute inset-0 bg-[#121212]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
    </div>
  )
}
