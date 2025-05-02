"use client"
import type React from "react"
import { useCallback, useState } from "react"
import { Upload } from "lucide-react"

interface FileUploadProps {
  onChange: (files: File[]) => void
  accept?: string
}

export function FileUpload({ onChange, accept }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const fileArray = Array.from(e.dataTransfer.files)
        setSelectedFiles(fileArray)
        onChange(fileArray)
      }
    },
    [onChange],
  )

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const fileArray = Array.from(e.target.files)
        setSelectedFiles(fileArray)
        onChange(fileArray)
      }
    },
    [onChange],
  )

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-4 transition-colors ${
        isDragging ? "bg-[#004D61]/20" : "bg-transparent"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} accept={accept} />
      <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
        <Upload className="w-6 h-6 text-[#218380] mb-2" />
        <p className="text-center text-[#F0F0F0] text-sm">UPLOAD OR DROP FILE</p>
        {selectedFiles.length > 0 && (
          <div className="mt-2">
            <p className="text-[#218380] text-xs">{selectedFiles.length} file(s) selected</p>
            <ul className="text-xs mt-1">
              {selectedFiles.map((file, index) => (
                <li key={index} className="text-[#F0F0F0]/80 truncate max-w-[200px]">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </label>
    </div>
  )
}
