"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Shield, Sparkles } from "lucide-react"

export default function PodManifesto({ onComplete }: { onComplete: () => void }) {
  const manifestoItems = [
    {
      icon: <Heart className="h-5 w-5" />,
      title: "We listen with empathy",
      description: "Every emotion is valid. We hear each other without judgment.",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: "We share authentically",
      description: "We bring our true selves, sharing both struggles and victories.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "We maintain confidentiality",
      description: "Everything shared here stays here. Trust is our foundation.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "We support growth",
      description: "We encourage each other's journey of healing and self-discovery.",
    },
  ]

  return (
    <div className="space-y-6 py-4">
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-semibold text-neutral-800 text-center"
      >
        Pod Manifesto
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-neutral-600 text-center"
      >
        In this space, we listen, reflect, and grow. Everything shared here stays here.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 space-y-4"
      >
        {manifestoItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            className="flex items-start"
          >
            <div className="bg-white p-2 rounded-lg mr-3 text-amber-500">{item.icon}</div>
            <div>
              <h3 className="font-medium text-amber-800">{item.title}</h3>
              <p className="text-sm text-amber-700">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex justify-center pt-4"
      >
        <Button
          onClick={onComplete}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 rounded-full text-lg"
        >
          I'm Ready to Join My Pod
        </Button>
      </motion.div>
    </div>
  )
}
