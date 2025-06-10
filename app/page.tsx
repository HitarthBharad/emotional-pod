"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import EmotionalPodInterface from "@/components/emotional-pod-interface"

export default function Home() {
  const router = useRouter()
  const [hasOnboarded, setHasOnboarded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user exists in localStorage
    const user = localStorage.getItem("emotionalPods_user")

    if (!user) {
      // No user found, redirect to signup
      router.push("/signup")
      return
    }

    // Check if user has completed onboarding
    const onboardingCompleted = localStorage.getItem("emotionalPods_onboardingCompleted")

    if (!onboardingCompleted) {
      // Onboarding not completed, redirect to onboarding
      router.push("/onboarding")
      return
    }

    setHasOnboarded(true)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-neutral-200 border-t-amber-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <EmotionalPodInterface />
    </div>
  )
}
