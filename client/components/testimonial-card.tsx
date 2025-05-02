import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  name: string
  title: string
  avatarUrl: string
}

export default function TestimonialCard({ quote, name, title, avatarUrl }: TestimonialCardProps) {
  return (
    <div className="bg-background/30 backdrop-blur-sm border border-secondary/20 rounded-xl p-6">
      <div className="mb-4">
        <svg className="h-8 w-8 text-accent/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>
      <p className="text-text/80 mb-6">{quote}</p>
      <div className="flex items-center">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
          <Image src={avatarUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-text/60 text-sm">{title}</p>
        </div>
      </div>
    </div>
  )
}
