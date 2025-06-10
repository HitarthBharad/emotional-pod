"use client"

import { useState } from "react"
import { Send, SkipForward, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

// Sample questions
const dailyQuestions = [
  "What's one weird talent you have?",
  "If you could have dinner with anyone, living or dead, who would it be?",
  "What's something you believed as a child that you now find funny?",
  "What's a small act of kindness someone showed you that you'll never forget?",
  "What's your favorite way to practice self-care?",
  "What's a book, movie, or song that changed how you see the world?",
  "What's something you're looking forward to this week?",
  "What's a place you've visited that exceeded your expectations?",
  "What's something you're proud of that you rarely talk about?",
  "What's a simple pleasure that brings you joy?",
]

// Sample answers
const sampleAnswers = [
  {
    id: 1,
    author: "PowerfulRose",
    content: "I can wiggle my ears independently of each other. It's my party trick!",
    timestamp: "Today, 9:15 AM",
  },
  {
    id: 2,
    author: "GentleBreeze",
    content:
      "I can name all the US presidents in order in under 20 seconds. Not sure why I learned this, but it's fun at parties.",
    timestamp: "Today, 10:23 AM",
  },
  {
    id: 3,
    author: "SteadyMountain",
    content: "I can fold origami with my toes! Started doing it when I broke my arm as a kid and never lost the skill.",
    timestamp: "Today, 11:05 AM",
  },
]

export default function QuestionOfTheDay() {
  const [answer, setAnswer] = useState("")
  const [answers, setAnswers] = useState(sampleAnswers)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)

  const handleSubmit = () => {
    if (answer.trim()) {
      const newAnswer = {
        id: Date.now(),
        author: "You (Anonymous)",
        content: answer,
        timestamp: "Just now",
      }

      setAnswers([newAnswer, ...answers])
      setAnswer("")
      setHasAnswered(true)
    }
  }

  const handleSkip = () => {
    const nextIndex = (questionIndex + 1) % dailyQuestions.length
    setQuestionIndex(nextIndex)
    setHasAnswered(false)
  }

  return (
    <div className="space-y-6">
      {/* Question card */}
      <Card className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex items-center gap-3">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg">
            <MessageSquare className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-medium text-neutral-800">Question of the Day</h3>
        </div>

        {/* Question display */}
        <div className="p-8 bg-gradient-to-r from-amber-50 to-orange-50">
          <p className="text-neutral-800 text-xl font-medium leading-relaxed text-center">
            {dailyQuestions[questionIndex]}
          </p>
        </div>
      </Card>

      {/* Answer area */}
      {!hasAnswered ? (
        <Card className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
          <div className="p-5 border-b border-neutral-100">
            <h3 className="text-base font-medium text-neutral-800">Your Answer</h3>
          </div>

          <div className="p-5">
            {/* Answer textarea */}
            <Textarea
              placeholder="Share your answer here..."
              className="min-h-[120px] bg-neutral-50 border-neutral-200 focus-visible:ring-amber-500 rounded-lg mb-5 text-neutral-700 resize-none"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            {/* Submit and skip buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSkip}
                className="text-neutral-600 border-neutral-200 hover:bg-neutral-50 w-full sm:w-auto order-2 sm:order-1"
              >
                <SkipForward className="h-3.5 w-3.5 mr-1.5" /> Skip Question
              </Button>

              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-6 py-2 shadow-sm transition-all duration-300 hover:shadow w-full sm:w-auto order-1 sm:order-2"
                disabled={!answer.trim()}
              >
                <Send className="mr-2 h-4 w-4" /> Submit Answer
              </Button>
            </div>

            <p className="text-xs text-neutral-500 mt-4 text-center">Only visible to your pod members.</p>
          </div>
        </Card>
      ) : (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSkip}
            className="text-amber-600 border-amber-200 hover:bg-amber-50"
          >
            <SkipForward className="h-3.5 w-3.5 mr-1.5" /> Try Another Question
          </Button>
        </div>
      )}

      {/* Answers thread */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-neutral-700">Pod Answers</h3>
          <span className="text-sm text-neutral-500">{answers.length} responses</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 divide-y divide-neutral-100">
          {answers.map((answer) => (
            <div key={answer.id} className="p-4 hover:bg-neutral-50 transition-colors">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-gradient-to-r from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-medium">
                  <span>{answer.author.charAt(0)}</span>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-neutral-800 text-sm">{answer.author}</span>
                    <span className="text-xs text-neutral-500">{answer.timestamp}</span>
                  </div>
                  <p className="mt-1 text-neutral-700">{answer.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
