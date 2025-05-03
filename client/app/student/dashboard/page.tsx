"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UploadModal } from "@/components/upload-modal";
import { DocumentsModal } from "@/components/documents-modal";

export default function StudentDashboard() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [documentsModalOpen, setDocumentsModalOpen] = useState(false);
  const [skills, setSkills] = useState<string[]>([
    "JavaScript",
    "React",
    "Node.js",
    "TypeScript",
    "UI/UX Design",
    "Data Structures",
  ]);

  const handleSkillAdded = (newSkill: string) => {
    if (!skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#121212] text-[#F0F0F0]">
      <div className="w-full max-w-4xl p-8 rounded-lg border border-[#218380]/30">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent text-center mb-12 font-handwriting">
          Student Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Submitted & Verified Documents */}
            <div className="p-6 border border-[#218380]/30 rounded-lg">
              <h2 className="text-xl font-bold text-center mb-6">
                Submitted &<br />
                Verified
                <br />
                Documents
              </h2>
              <Button
                onClick={() => setDocumentsModalOpen(true)}
                className="w-full bg-[#218380] hover:bg-[#218380]/20 text-[#F0F0F0] border border-[#218380] hover:border-[#F0F0F0] transition-colors"
              >
                VIEW
              </Button>
            </div>

            {/* Upload GitHub Repositories & Skill certificates */}
            <div className="p-6 border border-[#218380]/30 rounded-lg">
              <h2 className="text-xl font-bold text-center mb-6">
                Upload GitHub
                <br />
                Repositories
                <br />
                &<br />
                Skill certificates
              </h2>
              <Button
                onClick={() => setUploadModalOpen(true)}
                className="w-full bg-[#218380] hover:bg-[#218380]/20 text-[#F0F0F0] border border-[#218380] hover:border-[#F0F0F0] transition-colors"
              >
                UPLOAD
              </Button>
            </div>
          </div>

          {/* Right Column - Skill List */}
          <div className="p-6 border border-[#218380]/30 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold text-center mb-6">SKILL LIST</h2>
            <div className="flex-grow flex flex-col justify-center space-y-4">
              {skills.length > 0
                ? skills.map((skill, index) => (
                    <div key={index} className="relative w-full">
                      <div className="w-full h-px bg-[#F0F0F0] my-3"></div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#121212] px-2 text-sm font-medium text-[#F0F0F0]">
                        {skill}
                      </div>
                    </div>
                  ))
                : Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="w-full h-px bg-[#F0F0F0] my-3"
                      ></div>
                    ))}
            </div>
          </div>
        </div>

        {/* Profile Button */}
        <div className="mt-10 flex justify-center">
          <Link href="/students/profile">
            <Button className="bg-yellow-500 hover:bg-yellow-200 text-black transition-colors">
              Go to Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        open={uploadModalOpen}
        onOpenChange={setUploadModalOpen}
        onSkillAdded={handleSkillAdded}
      />

      {/* Documents Modal */}
      <DocumentsModal
        open={documentsModalOpen}
        onOpenChange={setDocumentsModalOpen}
      />
    </div>
  );
}
