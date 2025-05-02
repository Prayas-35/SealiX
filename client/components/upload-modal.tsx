"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileUpload } from "@/components/ui/file-upload"
import { toast } from "sonner"

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSkillAdded: (skill: string) => void
}

export function UploadModal({ open, onOpenChange, onSkillAdded }: UploadModalProps) {
  const [repoLink, setRepoLink] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const handleRepoSubmit = () => {
    if (!repoLink) {
      toast.error("Please enter a GitHub repository link")
      return
    }

    if (!repoLink.includes("github.com")) {
      toast.error("Please enter a valid GitHub repository link")
      return
    }

    // Simulate AI extracting skills from repo
    const mockSkills = ["JavaScript", "React", "TypeScript"]
    const randomSkill = mockSkills[Math.floor(Math.random() * mockSkills.length)]

    toast.success(`GitHub repository submitted successfully. Skill "${randomSkill}" detected.`)

    onSkillAdded(randomSkill)
    setRepoLink("")
  }

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles)

    if (uploadedFiles.length > 0) {
      // Simulate AI extracting skills from certificates
      const mockSkills = ["UI/UX Design", "Data Structures", "Cloud Computing", "Machine Learning"]
      const randomSkill = mockSkills[Math.floor(Math.random() * mockSkills.length)]

      toast.success(`Certificate uploaded successfully. Skill "${randomSkill}" detected.`)
      onSkillAdded(randomSkill)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121212] text-[#F0F0F0] border border-[#218380] max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center font-handwriting">
            Upload GitHub Repositories & certificates
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* GitHub Repository Link */}
          <div className="p-6 border border-[#218380]/30 rounded-lg">
            <h3 className="text-lg font-bold text-center mb-6">
              UPLOAD
              <br />
              GITHUB
              <br />
              REPOSITORY
              <br />
              LINK
            </h3>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="https://github.com/username/repo"
                value={repoLink}
                onChange={(e) => setRepoLink(e.target.value)}
                className="bg-transparent border-[#218380] text-[#F0F0F0]"
              />
              <Button
                onClick={handleRepoSubmit}
                className="w-full bg-[#DAA520] hover:bg-[#DAA520]/90 text-[#121212] font-medium"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Certificate Upload */}
          <div className="p-6 border border-[#218380]/30 rounded-lg">
            <h3 className="text-lg font-bold text-center mb-6">
              UPLOAD
              <br />
              SKILL
              <br />
              CERTIFICATES
            </h3>
            <div className="h-40 border border-dashed border-[#218380] rounded-lg">
              <FileUpload onChange={handleFileUpload} accept=".pdf,.jpg,.jpeg,.png" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
