"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CertificateUpload } from "@/components/certificate-upload"
import { BulkUpload } from "@/components/bulk-upload"

export default function UniversityDashboard() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#121212] text-[#F0F0F0]">
      <div className="w-full max-w-4xl p-8 rounded-lg border border-[#218380]/30">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent text-center mb-12 font-handwriting">University Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center">
          <Input
            type="email"
            placeholder="Enter student email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow py-6 px-4 bg-transparent border-[#218380] text-[#F0F0F0] rounded-lg"
          />
          <Button className="px-8 py-6 bg-[#DAA520] hover:bg-[#DAA520]/90 text-[#121212] font-medium rounded-lg">
            Mint NFT
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center mb-2">Upload degree certificate</h2>
            <CertificateUpload />
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
