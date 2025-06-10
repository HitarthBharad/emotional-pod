"use client"

import { motion } from "framer-motion"
import { CloudyIcon as ThoughtBubble, Sparkles, Sprout } from "lucide-react"

interface PodTypeQuestionProps {
  selectedType: string
  onSelect: (type: string) => void
}

export default function PodTypeQuestion({ selectedType, onSelect }: PodTypeQuestionProps) {
  const podTypes = [
    {
      name: "Reflective",
      icon: <ThoughtBubble className="h-8 w-8" />,
      description: "Deep conversations and thoughtful sharing about life's meaningful moments.",
    },
    {
      name: "Light-hearted",
      icon: <Sparkles className="h-8 w-8" />,
      description: "Positive vibes, casual chats, and uplifting interactions to brighten your day.",
    },
    {
      name: "Growth-oriented",
      icon: <Sprout className="h-8 w-8" />,
      description: "Focus on personal development, overcoming challenges, and supporting each other's goals.",
    },
  ]

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-medium text-neutral-800 text-center"
      >
        What kind of pod experience are you looking for?
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-neutral-600 text-center"
      >
        Choose the type of emotional support group that resonates with you.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 mt-6"
      >
        {podTypes.map((type, index) => (
          <motion.button
            key={type.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className={`flex items-start p-4 rounded-xl w-full text-left transition-all ${
              selectedType === type.name
                ? "bg-gradient-to-r from-amber-500 to-orange-500 shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200"
            }`}
            onClick={() => onSelect(type.name)}
          >
            <div
              className={`p-3 rounded-lg mr-4 ${selectedType === type.name ? "bg-white bg-opacity-20" : "bg-white"}`}
            >
              {type.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{type.name}</h3>
              <p className={`text-sm mt-1 ${selectedType === type.name ? "text-white" : "text-neutral-600"}`}>
                {type.description}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
