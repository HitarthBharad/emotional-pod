"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WelcomeStep from "./welcome-step"
import FeelingQuestion from "./feeling-question"
import PodTypeQuestion from "./pod-type-question"
import EnergyQuestion from "./energy-question"
import MatchingProcess from "./matching-process"
import PodResult from "./pod-result"
import PodManifesto from "./pod-manifesto"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({
    feeling: "",
    podType: "",
    energyLevel: "",
  })
  const [podName, setPodName] = useState("")

  const totalSteps = 6

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateAnswer = (question: string, answer: string) => {
    setAnswers({
      ...answers,
      [question]: answer,
    })
  }

  // Generate pod name based on answers
  useEffect(() => {
    if (currentStep === 4) {
      // Only generate when reaching the matching process step
      const podAdjectives = {
        happy: ["Joyful", "Radiant", "Vibrant"],
        calm: ["Serene", "Tranquil", "Peaceful"],
        sad: ["Compassionate", "Supportive", "Nurturing"],
        anxious: ["Grounding", "Steady", "Reassuring"],
        neutral: ["Balanced", "Centered", "Harmonious"],
      }

      const podNouns = {
        Reflective: ["Thinkers", "Observers", "Ponderers"],
        "Light-hearted": ["Spirits", "Breeze", "Sunshine"],
        "Growth-oriented": ["Gardeners", "Climbers", "Explorers"],
      }

      const energyModifiers = {
        Low: ["Gentle", "Soft", "Quiet"],
        Neutral: ["Steady", "Balanced", "Flowing"],
        High: ["Dynamic", "Energetic", "Vibrant"],
      }

      // Get random elements from each array
      const feelingKey = answers.feeling.toLowerCase() in podAdjectives ? answers.feeling.toLowerCase() : "neutral"
      const adjective =
        podAdjectives[feelingKey as keyof typeof podAdjectives][
          Math.floor(Math.random() * podAdjectives[feelingKey as keyof typeof podAdjectives].length)
        ]

      const podTypeKey = answers.podType in podNouns ? answers.podType : "Growth-oriented"
      const noun =
        podNouns[podTypeKey as keyof typeof podNouns][
          Math.floor(Math.random() * podNouns[podTypeKey as keyof typeof podNouns].length)
        ]

      const energyKey = answers.energyLevel in energyModifiers ? answers.energyLevel : "Neutral"
      const modifier =
        energyModifiers[energyKey as keyof typeof energyModifiers][
          Math.floor(Math.random() * energyModifiers[energyKey as keyof typeof energyModifiers].length)
        ]

      // Combine to create pod name
      setPodName(`The ${modifier} ${adjective} ${noun}`)
    }
  }, [currentStep, answers])

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep onNext={handleNext} />
      case 1:
        return (
          <FeelingQuestion selectedFeeling={answers.feeling} onSelect={(feeling) => updateAnswer("feeling", feeling)} />
        )
      case 2:
        return <PodTypeQuestion selectedType={answers.podType} onSelect={(type) => updateAnswer("podType", type)} />
      case 3:
        return (
          <EnergyQuestion
            selectedEnergy={answers.energyLevel}
            onSelect={(energy) => updateAnswer("energyLevel", energy)}
          />
        )
      case 4:
        return <MatchingProcess onComplete={() => setTimeout(handleNext, 3000)} />
      case 5:
        return <PodResult podType={answers.podType} podName={podName} handleNext={handleNext} />
      case 6:
        return <PodManifesto onComplete={onComplete} />
      default:
        return null
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  // Determine if navigation buttons should be shown
  const showNavigation = currentStep > 0 && currentStep < 4

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto p-6">
        {/* Progress indicator */}
        {currentStep > 0 && currentStep < 6 && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-neutral-500">
                Step {currentStep} of {totalSteps - 1}
              </span>
              <span className="text-sm text-neutral-500">
                {Math.round((currentStep / (totalSteps - 1)) * 100)}% Complete
              </span>
            </div>
            <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        {/* Content area */}
        <AnimatePresence initial={false} mode="wait" custom={currentStep}>
          <motion.div
            key={currentStep}
            custom={currentStep}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-xl shadow-md border border-neutral-100 p-8"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {showNavigation && (
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              disabled={
                (currentStep === 1 && !answers.feeling) ||
                (currentStep === 2 && !answers.podType) ||
                (currentStep === 3 && !answers.energyLevel)
              }
            >
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
