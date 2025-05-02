"use client"
import { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"

export function BulkUpload() {
  const [files, setFiles] = useState<File[]>([])
  const handleFileUpload = (files: File[]) => {
    setFiles(files)
    console.log(files)
  }

  return (
    <div className="w-full h-64 border border-dashed bg-transparent border-[#218380] rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  )
}
