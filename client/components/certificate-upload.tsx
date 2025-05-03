"use client"
import { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"

interface CertificateUploadProps {
  onUpload: (file: File) => void
  disabled?: boolean
}

export function CertificateUpload({ onUpload, disabled }: CertificateUploadProps) {
  const [files, setFiles] = useState<File[]>([])

  const handleFileUpload = (files: File[]) => {
    setFiles(files)
    if (files.length > 0) {
      onUpload(files[0]) // Upload the first file since we're handling single file uploads
    }
  }

  return (
    <div className="w-full h-64 border border-dashed bg-transparent border-[#218380] rounded-lg">
      <FileUpload 
        onChange={handleFileUpload} 
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  )
}
