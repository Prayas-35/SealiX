import type { ReactNode } from "react"

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="bg-background/30 backdrop-blur-sm border border-secondary/20 rounded-xl p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
      <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-text/70">{description}</p>
    </div>
  )
}
