import type { ReactNode } from "react"

interface StepCardProps {
  number: number
  title: string
  description: string
  icon: ReactNode
}

export default function StepCard({ number, title, description, icon }: StepCardProps) {
  return (
    <div className="bg-background/30 backdrop-blur-sm border border-secondary/20 rounded-xl p-6 relative">
      <div className="absolute -top-4 -left-4 bg-accent text-background w-8 h-8 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary/10 p-4 rounded-full mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-text/70">{description}</p>
      </div>
    </div>
  )
}
