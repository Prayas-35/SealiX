"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { SkillBadge } from "@/components/skill-badge"

export default function StudentProfile() {
  // Mock student data
  const [student, setStudent] = useState({
    name: "John Doe",
    university: "MIT University",
    degree: "Bachelor of Science",
    stream: "Computer Science",
    nftId: "0x1a2b3c4d5e6f7g8h9i0j",
    profileImage: null,
  })

  // Skills from the dashboard with proficiency levels
  const skills: { name: string; level: "Beginner" | "Intermediate" | "Advanced"; color: string }[] = [
    { name: "JavaScript", level: "Advanced", color: "#3B82F6" }, // Blue
    { name: "TypeScript", level: "Intermediate", color: "#F59E0B" }, // Amber
    { name: "React.JS", level: "Beginner", color: "#EC4899" }, // Pink
    { name: "Node.JS", level: "Intermediate", color: "#F0F0F0" }, // White
    { name: "UI/UX Design", level: "Intermediate", color: "#10B981" }, // Green
    { name: "Data Structures", level: "Advanced", color: "#8B5CF6" }, // Purple
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#121212] text-[#F0F0F0]">
      <div className="w-full max-w-4xl p-8 rounded-lg border border-[#218380]/30 bg-gradient-to-b from-[#121212] to-[#004D61]/20">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent text-center mb-12 font-handwriting">Student Profile</h1>

        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* Profile Image */}
          <div className="flex-shrink-0 w-full md:w-64 h-64 border-2 border-[#218380] rounded-lg overflow-hidden flex items-center justify-center bg-[#121212]/50">
            {student.profileImage ? (
              <img
                src={student.profileImage || "/placeholder.svg"}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#218380]/70">
                <User size={64} />
                <span className="mt-2 text-sm">image</span>
              </div>
            )}
          </div>

          {/* Student Details */}
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-6 font-handwriting">Student Basic Details</h2>

            <div className="space-y-4">
              <div>
                <span className="text-[#DAA520] font-semibold">Name</span>
                <p className="text-lg">{student.name}</p>
              </div>

              <div>
                <span className="text-[#DAA520] font-semibold">University</span>
                <p className="text-lg">{student.university}</p>
              </div>

              <div>
                <span className="text-[#DAA520] font-semibold">Degree</span>
                <p className="text-lg">{student.degree}</p>
              </div>

              <div>
                <span className="text-[#DAA520] font-semibold">Stream</span>
                <p className="text-lg">{student.stream}</p>
              </div>

              <div>
                <span className="text-[#DAA520] font-semibold">NFT ID/Wallet Address</span>
                <p className="text-sm font-mono bg-[#004D61]/20 p-2 rounded overflow-x-auto">{student.nftId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Badges */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-8 font-handwriting">Skill Badges</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
            {skills.map((skill, index) => (
              <SkillBadge key={index} name={skill.name} level={skill.level} color={skill.color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
