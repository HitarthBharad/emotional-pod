"use client"

import { useState } from "react"
import { Shuffle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import EmotionTag from "./emotion-tag"

// Sample prompts
const reflectionPrompts = [
  "What's one moment you felt seen this week?",
  "Share something that brought you unexpected joy recently.",
  "What's one small thing you're proud of that others might not notice?",
  "Describe a moment when you felt connected to someone else.",
  "What's something you're struggling with that you haven't shared yet?",
  "What's a small act of kindness you witnessed or experienced lately?",
  "What's one thing you're looking forward to?",
  "Share a moment when you felt peaceful this week.",
  "What's something you're grateful for today?",
  "What's a challenge you're facing that you could use support with?",
]

// Emotion tags
const emotionTags = ["grateful", "lonely", "hopeful", "vulnerable", "peaceful", "anxious", "proud", "confused"]

export default function GuidedSharingPrompt() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [response, setResponse] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("")

  const handleRandomPrompt = () => {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * reflectionPrompts.length)
    } while (randomIndex === currentPromptIndex)

    setCurrentPromptIndex(randomIndex)
    // Clear previous response when changing prompts
    setResponse("")
    setSelectedEmotion("")
  }

  return (
    <div className="space-y-6">
      {/* Prompt card */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex justify-between items-center">
          <h3 className="text-lg font-medium text-neutral-800">Reflection Prompt</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomPrompt}
            className="text-amber-600 border-amber-200 hover:bg-amber-50 hover:text-amber-700"
          >
            <Shuffle className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-sm">New Prompt</span>
          </Button>
        </div>

        {/* Prompt display */}
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 text-neutral-800 text-xl font-medium leading-relaxed">
          {reflectionPrompts[currentPromptIndex]}
        </div>
      </div>

      {/* Response area */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h3 className="text-base font-medium text-neutral-800">Your Response</h3>
        </div>

        <div className="p-5">
          {/* Response textarea */}
          <Textarea
            placeholder="Share your thoughts here..."
            className="min-h-[150px] bg-neutral-50 border-neutral-200 focus-visible:ring-amber-500 rounded-lg mb-4 text-neutral-700 resize-none"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />

          {/* Emotion tags */}
          <div className="mb-5">
            <p className="text-sm text-neutral-600 mb-3">How does this make you feel? (optional)</p>
            <div className="flex flex-wrap gap-2">
              {emotionTags.map((emotion) => (
                <EmotionTag
                  key={emotion}
                  emotion={emotion}
                  selected={selectedEmotion === emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                />
              ))}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex flex-col items-center">
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-8 py-2 w-full md:w-auto shadow-sm transition-all duration-300 hover:shadow"
              disabled={!response.trim()}
            >
              <Send className="mr-2 h-4 w-4" /> Post to Pod
            </Button>
            <p className="text-xs text-neutral-500 mt-3 text-center">
              Your response will only be visible to your current pod members.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
