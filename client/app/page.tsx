"use client";

import { ArrowDown, ArrowRight, Award, Brain, CheckCircle, FileCheck, Lock, Shield, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ConnectKitButton } from "connectkit"
import TestimonialCard from "../components/testimonial-card"
import FeatureCard from "../components/feature-card"
import StepCard from "../components/step-card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Header/Navigation */}
      <header className="container mx-auto py-6 px-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">SealiX</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="hover:text-accent transition-colors">
              Home
            </Link>
            <Link href="#how-it-works" className="hover:text-accent transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="hover:text-accent transition-colors">
              Features
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex">
              Sign In
            </Button>
            <ConnectKitButton />
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Verify Your Skills <span className="bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent">On-Chain</span>
            </h1>
            <p className="text-xl text-text/80 max-w-md">
              Earn blockchain-verified badges and NFT diplomas that showcase your skills to employers and institutions
              worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden border border-secondary/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-background/80 backdrop-blur-sm p-8 rounded-xl border border-accent/20 max-w-xs">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-8 w-8 text-yellow-400" />
                  <div>
                    <h3 className="font-bold text-yellow-400">Full-Stack Development</h3>
                    <p className="text-sm text-text/70">Verified by SealiX</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">React & Next.js</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Node.js & Express</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm">Database Design</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-accent/20 flex justify-between items-center">
                  <span className="text-xs text-text/60">Issued: May 2025</span>
                  <span className="text-xs bg-yellow-200/20 text-yellow-400 px-2 py-1 rounded-full">NFT Verified</span>
                </div>
              </div>
            </div>
            <Image
              src="/demo.png"
              alt="Skill Passport Demo"
              fill
              className="object-cover blur-md z-0"
            />
          </div>
        </div>
        <div className="flex justify-center mt-16">
          <a href="#how-it-works" className="animate-bounce bg-background/10 p-2 rounded-full border border-accent/20">
            <ArrowDown className="h-6 w-6 text-accent" />
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-background/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              Three simple steps to verify your skills and showcase them to the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StepCard
              number={1}
              title="Complete Courses & Projects"
              description="Finish courses and submit projects to demonstrate your skills and knowledge."
              icon={<FileCheck className="h-10 w-10 text-yellow-400" />}
            />

            <StepCard
              number={2}
              title="Earn NFT Credentials"
              description="Receive blockchain-verified badges and NFT diplomas for your achievements."
              icon={<Award className="h-10 w-10 text-yellow-400" />}
            />

            <StepCard
              number={3}
              title="Showcase Your Skills"
              description="Share your verified credentials with employers and institutions worldwide."
              icon={<Sparkles className="h-10 w-10 text-yellow-400" />}
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              Discover the powerful features that make SealiX the ultimate solution for skill verification
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="NFT Credentials"
              description="Earn unique, non-fungible tokens that represent your skills and achievements."
              icon={<Award className="h-6 w-6 text-yellow-400" />}
            />

            <FeatureCard
              title="AI Skill Agents"
              description="Intelligent agents that help you identify skill gaps and recommend learning paths."
              icon={<Brain className="h-6 w-6 text-yellow-400" />}
            />

            <FeatureCard
              title="Privacy Controls"
              description="You control who sees your credentials and how much information is shared."
              icon={<Lock className="h-6 w-6 text-yellow-400" />}
            />

            <FeatureCard
              title="Instant Verification"
              description="Employers can instantly verify your skills on-chain without lengthy processes."
              icon={<CheckCircle className="h-6 w-6 text-yellow-400" />}
            />

            <FeatureCard
              title="Secure Storage"
              description="Your credentials are securely stored on the blockchain, accessible anywhere."
              icon={<Shield className="h-6 w-6 text-yellow-400" />}
            />

            <FeatureCard
              title="Skill Marketplace"
              description="Connect with employers looking for your specific verified skill set."
              icon={<Sparkles className="h-6 w-6 text-yellow-400" />}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-text/70 max-w-2xl mx-auto">
              Hear from users and institutions who have experienced the power of SealiX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="SealiX has completely transformed how we verify candidate skills. The blockchain verification is instant and reliable."
              name="Sarah Johnson"
              title="HR Director, TechCorp"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              quote="As a self-taught developer, SealiX gave me a way to prove my abilities to employers without a traditional degree."
              name="Michael Chen"
              title="Software Engineer"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />

            <TestimonialCard
              quote="The NFT credentials from SealiX have become a standard requirement for our hiring process. They're simply more reliable."
              name="Emily Rodriguez"
              title="CTO, BlockFin"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#218380] to-[#004D61] py-20">

        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Verify Your Skills?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of professionals who are showcasing their skills with blockchain-verified credentials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-yellow-500 text-white">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 border-t border-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-6 w-6 text-accent" />
                <span className="text-lg font-bold">SealiX</span>
              </div>
              <p className="text-text/70 text-sm">
                The future of skill verification and credential management on the blockchain.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-text/70 hover:text-accent transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-secondary/20 flex flex-col md:flex-row justify-between items-center">
            <p className="text-text/60 text-sm">&copy; {new Date().getFullYear()} SealiX. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-text/60 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-text/60 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-text/60 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-text/60 hover:text-accent transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
