"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Github } from "lucide-react"

interface DocumentsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DocumentsModal({ open, onOpenChange }: DocumentsModalProps) {
  // Mock data for verified documents
  const documents = [
    {
      id: 1,
      type: "certificate",
      name: "Web Development Certificate",
      date: "2023-05-15",
      skills: ["JavaScript", "React"],
    },
    {
      id: 2,
      type: "repository",
      name: "github.com/user/project-management",
      date: "2023-06-22",
      skills: ["TypeScript", "Node.js"],
    },
    { id: 3, type: "certificate", name: "UI/UX Design Fundamentals", date: "2023-08-10", skills: ["UI/UX Design"] },
    {
      id: 4,
      type: "repository",
      name: "github.com/user/data-visualization",
      date: "2023-09-05",
      skills: ["Data Structures", "JavaScript"],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121212] text-[#F0F0F0] border border-[#218380] max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center font-handwriting">
            Submitted & Verified Documents
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] mt-6 pr-4">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="p-4 border border-[#218380]/30 rounded-lg">
                <div className="flex items-start gap-3">
                  {doc.type === "certificate" ? (
                    <FileText className="h-6 w-6 text-[#DAA520]" />
                  ) : (
                    <Github className="h-6 w-6 text-[#DAA520]" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{doc.name}</h3>
                    <p className="text-sm text-[#F0F0F0]/70">Verified on: {new Date(doc.date).toLocaleDateString()}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {doc.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 rounded-full bg-[#004D61] text-[#F0F0F0]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
