"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PodResultProps {
  podType: string
  podName: string
  handleNext: () => void
}

export default function PodResult({ podType, podName, handleNext }: PodResultProps) {
  const userCount = 6
  const userAvatars = Array.from({ length: userCount }).map((_, i) => ({
    id: i,
    color: [
      "bg-blue-400",
      "bg-green-400",
      "bg-amber-400",
      "bg-rose-400",
      "bg-purple-400",
      "bg-teal-400",
      "bg-indigo-400",
      "bg-orange-400",
    ][i % 8],
  }))

  return (
    <div className="space-y-8 py-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
      >
        <Users className="h-10 w-10 text-white" />
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center"
      >
        <h2 className="text-2xl font-semibold text-neutral-800 mb-2">Welcome to your new pod!</h2>
        <p className="text-neutral-600">
          You've been matched with {userCount} others in a '{podType}' Pod.
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 text-center"
      >
        <h3 className="text-xl font-medium text-amber-800 mb-2">{podName}</h3>
        <p className="text-amber-700">A space for growth, reflection, and emotional support.</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-center"
      >
        <div className="flex -space-x-4">
          {userAvatars.map((user) => (
            <div
              key={user.id}
              className={`w-12 h-12 rounded-full ${user.color} flex items-center justify-center text-white font-medium border-2 border-white`}
            >
              {String.fromCharCode(65 + user.id)}
            </div>
          ))}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-medium border-2 border-white">
            You
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex justify-center"
      >
        <Button
           onClick={handleNext}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6"
        >
          Continue to Pod Manifesto <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}
