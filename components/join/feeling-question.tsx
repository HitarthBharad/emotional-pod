"use client"

import { motion } from "framer-motion"

interface FeelingQuestionProps {
  selectedFeeling: string
  onSelect: (feeling: string) => void
}

export default function FeelingQuestion({ selectedFeeling, onSelect }: FeelingQuestionProps) {
  const feelings = [
    { name: "Happy", emoji: "😊" },
    { name: "Calm", emoji: "😌" },
    { name: "Sad", emoji: "😔" },
    { name: "Anxious", emoji: "😟" },
    { name: "Neutral", emoji: "😐" },
  ]

  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-medium text-neutral-800 text-center"
      >
        How are you feeling right now?
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-neutral-600 text-center"
      >
        Select the emotion that best describes how you're feeling today.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-5 gap-4 mt-6"
      >
        {feelings.map((feeling, index) => (
          <motion.button
            key={feeling.name}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className={`flex flex-col items-center p-4 rounded-xl transition-all ${
              selectedFeeling === feeling.name
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200"
            }`}
            onClick={() => onSelect(feeling.name)}
          >
            <span className="text-3xl mb-2">{feeling.emoji}</span>
            <span className="text-sm font-medium">{feeling.name}</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center text-sm text-neutral-500 mt-6"
      >
        Your emotional state helps us match you with the right pod.
      </motion.div>
    </div>
  )
}
