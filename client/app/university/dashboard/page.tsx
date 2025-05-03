"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CertificateUpload } from "@/components/certificate-upload"
import { BulkUpload } from "@/components/bulk-upload"
import { PinataSDK } from "pinata-web3"
import { toast } from "sonner"

interface Student {
  email: string
  name: string
}

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
});

export default function UniversityDashboard() {
  const [email, setEmail] = useState("")
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const verifyStudent = async () => {
    if (!email) {
      setError("Please enter an email address")
      return
    }

    try {
      setLoading(true)
      setError("")
      const response = await fetch(`/api/auth/getStudent?email=${email}`)
      const data = await response.json()

      if (response.ok) {
        setStudent(data.student)
        setError("")
      } else {
        setStudent(null)
        setError(data.message || "Student not found")
      }
    } catch (err) {
      setError("Failed to verify student")
      setStudent(null)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!student) {
      setError("Please verify student first")
      return
    }

    try {
      setLoading(true)
      setError("")

      // First convert the file to a format Pinata can handle
      const formData = new FormData()
      formData.append('file', file)
      
      const result = await pinata.upload.file(file)

      // Store the IPFS hash and metadata in your backend
      // const response = await fetch('/api/certificates/store', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     studentEmail: student.email,
      //     ipfsHash: result.IpfsHash,
      //     fileName: file.name,
      //     uploadDate: new Date().toISOString()
      //   })
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to store certificate metadata')
      // }

      toast.success("Success", {
        description: "Certificate uploaded and stored successfully",
        duration: 3000,
      })
      
    } catch (err) {
      console.error('Upload error:', err)
      setError(err instanceof Error ? err.message : "Failed to upload certificate to IPFS")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#121212] text-[#F0F0F0]">
      <div className="w-full max-w-4xl p-8 rounded-lg border border-[#218380]/30">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent text-center mb-12 font-handwriting">University Dashboard</h1>

        <div className="flex flex-col gap-4 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Input
              type="email"
              placeholder="Enter student email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow py-6 px-4 bg-transparent border-[#218380] text-[#F0F0F0] rounded-lg"
            />
            <Button 
              className="px-8 py-6 bg-[#218380] hover:bg-[#218380]/90 text-[#F0F0F0] font-medium rounded-lg"
              onClick={verifyStudent}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Student"}
            </Button>
          </div>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}

          {student && (
            <div className="p-4 bg-[#218380]/20 rounded-lg mt-4">
              <p className="text-center text-[#F0F0F0]">
                Verified Student: <span className="font-bold">{student.name}</span>
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center mb-2">Upload degree certificate</h2>
            <CertificateUpload onUpload={handleFileUpload} disabled={!student} />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center mb-2">Bulk Upload (via .csv)</h2>
            <BulkUpload />
          </div>
        </div>
      </div>
    </div>
  )
}
