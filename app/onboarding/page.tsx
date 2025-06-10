"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import OnboardingFlow from "@/components/join/onboarding-flow"

export default function OnboardingPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user exists in localStorage
    const userData = localStorage.getItem("emotionalPods_user")

    if (!userData) {
      // No user found, redirect to signup
      router.push("/signup")
      return
    }

    setUser(JSON.parse(userData))
  }, [router])

  const handleComplete = () => {
    // Mark onboarding as completed
    localStorage.setItem("emotionalPods_onboardingCompleted", "true")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return <OnboardingFlow onComplete={handleComplete} />
}
