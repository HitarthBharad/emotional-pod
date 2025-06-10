"use client"

import { motion } from "framer-motion"
import { Battery, BatteryMedium, BatteryFull } from "lucide-react"

interface EnergyQuestionProps {
  selectedEnergy: string
  onSelect: (energy: string) => void
}

export default function EnergyQuestion({ selectedEnergy, onSelect }: EnergyQuestionProps) {
  const energyLevels = [
    {
      level: "Low",
      icon: <Battery className="h-8 w-8" />,
      description: "I prefer a calm, gentle space with minimal demands.",
    },
    {
      level: "Neutral",
      icon: <BatteryMedium className="h-8 w-8" />,
      description: "I'm comfortable with balanced engagement and moderate activity.",
    },
    {
      level: "High",
      icon: <BatteryFull className="h-8 w-8" />,
      description: "I'm energetic and ready for active participation and engagement.",
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
        What's your current energy level?
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-neutral-600 text-center"
      >
        This helps us match you with a pod that fits your current capacity.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 mt-6"
      >
        {energyLevels.map((energy, index) => (
          <motion.button
            key={energy.level}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className={`flex items-start p-4 rounded-xl w-full text-left transition-all ${
              selectedEnergy === energy.level
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border border-neutral-200"
            }`}
            onClick={() => onSelect(energy.level)}
          >
            <div
              className={`p-3 rounded-lg mr-4 ${
                selectedEnergy === energy.level ? "bg-white bg-opacity-20" : "bg-white"
              }`}
            >
              {energy.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg">{energy.level}</h3>
              <p className={`text-sm mt-1 ${selectedEnergy === energy.level ? "text-white" : "text-neutral-600"}`}>
                {energy.description}
              </p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
