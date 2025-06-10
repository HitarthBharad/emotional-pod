"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"

export default function MatchingProcess({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Trigger the completion callback after animation
    const timer = setTimeout(onComplete, 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="py-12 flex flex-col items-center justify-center">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-medium text-neutral-800 text-center mb-8"
      >
        Finding the right pod for you...
      </motion.h2>

      <div className="relative w-32 h-32">
        {/* Outer circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border-4 border-amber-400 opacity-20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.1, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: i * 0.6,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Center circle with gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: [1, 0.9, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M3 21C3 16.5817 6.58172 13 11 13H13C17.4183 13 21 16.5817 21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 text-center space-y-2"
      >
        <p className="text-neutral-600">Analyzing your preferences...</p>
        <p className="text-neutral-600">Finding compatible pod members...</p>
        <p className="text-neutral-600">Creating your safe space...</p>
      </motion.div>
    </div>
  )
}
