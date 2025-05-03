"use client"

import { useState, useEffect } from "react"
import { Wallet, Mail, User } from "lucide-react"
import { motion } from "framer-motion"
import { ConnectKitButton } from "connectkit"
import { useAccount } from "wagmi"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
    const { isConnected, isConnecting, address } = useAccount()
    const router = useRouter()

    const [formData, setFormData] = useState({
        name: '',
        email: ''
    })
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        const checkExistingUser = async () => {
            if (address) {
                try {
                    const response = await fetch(`/api/auth/getUser?walletAddress=${address}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.status === 200) {
                        router.push('/student/dashboard');
                    }
                } catch (error) {
                    console.error('Error checking user:', error);
                }
            }
        };

        checkExistingUser();
    }, [address, router]);

    useEffect(() => {
        setIsClient(true)
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        
        handleResize() // Set initial size
        window.addEventListener('resize', handleResize)
        
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/auth/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData, walletAddress: address })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            router.push('/student/dashboard')
            console.log(data)
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const WalletConnectionModal = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md"
        >
            {null /* Ensure children are explicitly passed here */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] p-8 shadow-[0_10px_50px_rgba(0,0,0,0.3)] border border-[#2A2A2A]/30 backdrop-blur-sm">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#004D61] to-[#218380]">
                        <Wallet className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="mb-4 text-3xl font-bold tracking-tight bg-gradient-to-r from-[#F0F0F0] to-[#CCCCCC] bg-clip-text text-transparent">
                        Connect Your Wallet
                    </h1>
                    <p className="text-lg leading-relaxed opacity-90">
                        To unlock your <span className="text-[#DAA520] font-medium">Skill Passport</span> and begin your journey
                        of verified learning, you must first connect your wallet.
                    </p>
                </div>

                <motion.button
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#004D61] to-[#218380] py-4 px-6 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#218380] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] overflow-hidden group"
                    disabled={isConnecting || isConnected}
                >
                    <>
                        <div className="absolute inset-0 h-full w-1/4 bg-white/20 skew-x-[45deg] transition-all duration-500 -translate-x-full group-hover:translate-x-[400%]"></div>

                        {isConnecting ? (
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span>Connecting...</span>
                            </div>
                        ) : isConnected ? (
                            <div className="flex items-center gap-2">
                                <span>Connected</span>
                                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        ) : (
                            <ConnectKitButton />
                        )}
                    </>
                </motion.button>

                <div className="mt-8 text-center">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#2A2A2A]"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-[#151515] px-4 text-sm text-[#999999]">BENEFITS</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="rounded-lg bg-[#1D1D1D] p-3 transition-all hover:bg-[#1F1F1F] hover:shadow-md">
                            <div className="mb-2 text-[#DAA520]">🏆</div>
                            <div className="text-xs font-medium">On-chain Badges</div>
                        </div>
                        <div className="rounded-lg bg-[#1D1D1D] p-3 transition-all hover:bg-[#1F1F1F] hover:shadow-md">
                            <div className="mb-2 text-[#DAA520]">🎓</div>
                            <div className="text-xs font-medium">NFT Diplomas</div>
                        </div>
                        <div className="rounded-lg bg-[#1D1D1D] p-3 transition-all hover:bg-[#1F1F1F] hover:shadow-md">
                            <div className="mb-2 text-[#DAA520]">✅</div>
                            <div className="text-xs font-medium">Skill Endorsements</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )

    const RegistrationForm = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-full max-w-md"
        >
            <div className="rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#151515] p-8 shadow-[0_10px_50px_rgba(0,0,0,0.3)] border border-[#2A2A2A]/30 backdrop-blur-sm">
                <div className="mb-8 text-center">
                    <h1 className="mb-4 text-3xl font-bold tracking-tight bg-gradient-to-r from-[#F0F0F0] to-[#CCCCCC] bg-clip-text text-transparent">
                        Complete Your Profile
                    </h1>
                    <p className="text-lg leading-relaxed opacity-90">
                        Let's set up your <span className="text-[#DAA520] font-medium">Skill Passport</span> profile
                    </p>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-200">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full rounded-xl bg-[#2A2A2A] py-3 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#218380]"
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-200">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="w-full rounded-xl bg-[#2A2A2A] py-3 pl-10 pr-4 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#218380]"
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative w-full rounded-xl bg-gradient-to-r from-[#004D61] to-[#218380] py-4 px-6 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#218380] focus:ring-offset-2 focus:ring-offset-[#1A1A1A] overflow-hidden group"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Continue
                        <div className="absolute inset-0 h-full w-1/4 bg-white/20 skew-x-[45deg] transition-all duration-500 -translate-x-full group-hover:translate-x-[400%]"></div>
                    </motion.button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-400">
                        Connected wallet: <span className="text-[#DAA520] font-medium">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )

    const decorativeFloatingDot = (index: number) => (
        <motion.span
            key={index}
            className="absolute h-2 w-2 rounded-full bg-[#DAA520]/40"
            initial={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
            }}
            animate={{
                x: Math.random() * windowSize.width,
                y: Math.random() * windowSize.height,
            }}
            transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                repeatType: "reverse",
            }}
        />
    )

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A0A0A] to-[#121212] text-[#F0F0F0] p-4">
            {/* Decorative elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-[#004D61]/10 blur-3xl"></div>
                <div className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-[#218380]/10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#DAA520]/5 blur-3xl"></div>

                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(#F0F0F0 1px, transparent 1px)",
                        backgroundSize: "30px 30px",
                    }}
                ></div>

                {isClient && [...Array(6)].map((_, i) => decorativeFloatingDot(i))}
            </div>

            {isConnected ? <RegistrationForm /> : <WalletConnectionModal />}
        </div>
    )
}
