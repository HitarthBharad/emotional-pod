"use client"

import { useState } from "react"
import { Send, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion } from "framer-motion"
import AnonymousPostCard from "./anonymous-post-card"

// Sample pseudonyms and colors for abstract avatars
const pseudonyms = ["Cloud", "River", "Mountain", "Forest", "Ocean", "Meadow", "Sunset", "Breeze"]
const gradientPairs = [
  ["from-blue-300 to-purple-300", "blue-purple"],
  ["from-green-300 to-teal-300", "green-teal"],
  ["from-amber-300 to-orange-300", "amber-orange"],
  ["from-pink-300 to-rose-300", "pink-rose"],
  ["from-indigo-300 to-blue-300", "indigo-blue"],
  ["from-teal-300 to-cyan-300", "teal-cyan"],
  ["from-violet-300 to-purple-300", "violet-purple"],
  ["from-emerald-300 to-green-300", "emerald-green"],
]

// Sample posts
const samplePosts = [
  {
    id: 1,
    pseudonym: "Cloud",
    gradientClass: "from-blue-300 to-purple-300",
    content:
      "I've been feeling a sense of calm lately that I haven't experienced in years. It's like the constant noise in my head has finally quieted down.",
    timestamp: "Today, 10:23 AM",
    isIdentityRevealed: false,
  },
  {
    id: 2,
    pseudonym: "River",
    gradientClass: "from-teal-300 to-cyan-300",
    content:
      "Does anyone else struggle with feeling like they're not doing enough, even when logically they know they're working hard?",
    timestamp: "Today, 9:15 AM",
    isIdentityRevealed: false,
  },
]

export default function AnonymousSharingSystem() {
  const [posts, setPosts] = useState(samplePosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [revealIdentity, setRevealIdentity] = useState(false)
  const [postsUsedToday, setPostsUsedToday] = useState(2)
  const [dailyPostLimit] = useState(3)

  const handleSubmitPost = () => {
    if (newPostContent.trim() && postsUsedToday < dailyPostLimit) {
      // Generate random pseudonym and gradient for new user
      const randomPseudonymIndex = Math.floor(Math.random() * pseudonyms.length)
      const randomGradientIndex = Math.floor(Math.random() * gradientPairs.length)

      const newPost = {
        id: Date.now(),
        pseudonym: pseudonyms[randomPseudonymIndex],
        gradientClass: gradientPairs[randomGradientIndex][0],
        content: newPostContent,
        timestamp: "Just now",
        isIdentityRevealed: revealIdentity,
      }

      setPosts([newPost, ...posts])
      setNewPostContent("")
      setPostsUsedToday(postsUsedToday + 1)
      setRevealIdentity(false)
    }
  }

  const isLimitReached = postsUsedToday > dailyPostLimit

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
        <h2 className="text-lg font-medium text-neutral-800 mb-4">Share it with Community</h2>

        {postsUsedToday >= dailyPostLimit ? (
          <Alert className="mb-4 bg-amber-50 border-amber-200 text-amber-800">
            <AlertDescription className="flex items-center gap-2">
              <div className="bg-amber-100 p-2 rounded-full">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 2 }}
                >
                  🌱
                </motion.div>
              </div>
              <span>You've shared a lot today. Take a moment to reflect.</span>
            </AlertDescription>
          </Alert>
        ) : (
          <Textarea
            placeholder="What's on your mind today? Share in a safe, anonymous space..."
            className="min-h-[120px] bg-neutral-50 border-neutral-200 focus-visible:ring-amber-500 rounded-lg mb-4 text-neutral-700 resize-none"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                postsUsedToday < dailyPostLimit ? "bg-green-400" : "bg-neutral-300"
              }`}
            ></div>
            <span className="text-sm text-neutral-600">
              <span className="font-medium">{postsUsedToday}</span> of{" "}
              <span className="font-medium">{dailyPostLimit}</span> posts today used
            </span>
          </div>

          {!isLimitReached && (
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2">
                <Switch
                  id="reveal-identity"
                  checked={revealIdentity}
                  onCheckedChange={setRevealIdentity}
                  className="data-[state=checked]:bg-amber-500"
                />
                <Label htmlFor="reveal-identity" className="text-sm text-neutral-700 cursor-pointer">
                  {revealIdentity ? (
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> Reveal identity
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <EyeOff className="h-3.5 w-3.5" /> Stay anonymous
                    </span>
                  )}
                </Label>
              </div>

              <Button
                onClick={handleSubmitPost}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-5 h-9 text-sm shadow-sm transition-all duration-300 hover:shadow ml-auto"
                disabled={!newPostContent.trim()}
              >
                <Send className="mr-2 h-3.5 w-3.5" /> Share
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Anonymous posts feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <AnonymousPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
