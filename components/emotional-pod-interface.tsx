"use client"

import { useState } from "react"
import { Send, Plus, BookOpen } from "lucide-react"
import PodSidebar from "./pod-sidebar"
import EmotionTag from "./emotion-tag"
import PostCard from "./post-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import QuestionOfTheDay from "./question-of-the-day"
import AnonymousSharingSystem from "./anonymous-sharing-system"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JournalInterface from "./journal/journal-interface"
import PodHeader from "./pod-header"

const anonymousUsers = [
  "HealingHydro",
  "PowerfulRose",
  "GentleBreeze",
  "SteadyMountain",
  "WarmSunshine",
  "CalmOcean",
  "BrightStar",
]

const samplePosts = [
  {
    id: 1,
    author: "HealingHydro",
    content:
      "I've been feeling overwhelmed with work lately. It's hard to find balance between my job and taking care of myself.",
    timestamp: "Today, 10:23 AM",
    emotion: "anxious",
    reactions: { "❤️": 3, "🤗": 2, "🙏": 1, "💪": 0 },
    replies: [
      {
        id: 101,
        author: "PowerfulRose",
        content:
          "I've been there too. Remember to take small breaks throughout the day, even just 5 minutes of deep breathing can help.",
        timestamp: "Today, 10:45 AM",
      },
      {
        id: 102,
        author: "GentleBreeze",
        content:
          "Sending you strength. Would it help to make a list of priorities so you can focus on what's most important?",
        timestamp: "Today, 11:02 AM",
      },
    ],
  },
  {
    id: 2,
    author: "CalmOcean",
    content:
      "I received some good news today about my health situation. After months of uncertainty, I finally have some clarity. I'm feeling grateful but also a bit cautious.",
    timestamp: "Today, 9:15 AM",
    emotion: "hopeful",
    reactions: { "❤️": 5, "🤗": 3, "🙏": 4, "💪": 2 },
    replies: [
      {
        id: 201,
        author: "BrightStar",
        content:
          "That's wonderful news! It's okay to feel cautious too - those feelings can coexist. We're here for you either way.",
        timestamp: "Today, 9:30 AM",
      },
    ],
  },
  {
    id: 3,
    author: "SteadyMountain",
    content:
      "I'm struggling with some dark thoughts lately. Sometimes I feel like everything is pointless and I'm just going through the motions. Does anyone else ever feel this way?",
    timestamp: "Today, 8:45 AM",
    emotion: "overwhelmed",
    hasSensitiveContent: true,
    reactions: { "❤️": 7, "🤗": 8, "🙏": 5, "💪": 3 },
    replies: [
      {
        id: 301,
        author: "WarmSunshine",
        content:
          "I've definitely been there. Those feelings are valid, and you're not alone. Would it help to talk more specifically about what's triggering these thoughts?",
        timestamp: "Today, 9:02 AM",
      },
    ],
  },
]

const emotionTags = ["anxious", "hopeful", "grieving", "grateful", "overwhelmed", "peaceful", "confused", "determined"]

export default function EmotionalPodInterface() {
  const [postContent, setPostContent] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [posts, setPosts] = useState(samplePosts)
  const [activeTab, setActiveTab] = useState("feed")

  const handleSubmit = () => {
    if (postContent.trim() && selectedEmotion) {
      setShowConfirmation(true)
    }
  }

  const confirmSubmit = () => {
    // Create new post
    const newPost = {
      id: Date.now(),
      author: anonymousUsers[Math.floor(Math.random() * anonymousUsers.length)],
      content: postContent,
      timestamp: "Just now",
      emotion: selectedEmotion,
      reactions: { "❤️": 0, "🤗": 0, "🙏": 0, "💪": 0 },
      replies: [],
    }

    // Add to posts
    setPosts([newPost, ...posts])
    setPostContent("")
    setSelectedEmotion("")
    setShowConfirmation(false)
    setActiveTab("feed")
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <PodHeader />

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="flex w-full mb-6">
              <TabsTrigger value="feed" className="flex-1 text-sm">
                Pod Feed
              </TabsTrigger>
              <TabsTrigger value="question" className="flex-1 text-sm">
                Question of the Day
              </TabsTrigger>
              <TabsTrigger value="anonymous" className="flex-1 text-sm">
                Community Feed
              </TabsTrigger>
              <TabsTrigger value="journal" className="flex-1 text-sm">
                Journal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="space-y-6 mt-0">
              {/* Post creation area */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-medium">
                    Y
                  </div>
                  <Textarea
                    placeholder="What's weighing on you today?"
                    className="flex-1 min-h-[60px] bg-neutral-50 border-neutral-200 focus-visible:ring-amber-500 rounded-xl text-neutral-700 text-sm resize-none"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {emotionTags.slice(0, 4).map((emotion) => (
                      <EmotionTag
                        key={emotion}
                        emotion={emotion}
                        selected={selectedEmotion === emotion}
                        onClick={() => setSelectedEmotion(emotion)}
                      />
                    ))}
                    <Button variant="ghost" size="sm" className="text-amber-600 h-8">
                      <Plus className="h-3 w-3 mr-1" /> More
                    </Button>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full px-5 h-9 text-sm shadow-sm transition-all duration-300 hover:shadow"
                    disabled={!postContent.trim() || !selectedEmotion}
                  >
                    <Send className="mr-2 h-3.5 w-3.5" /> Share
                  </Button>
                </div>
              </div>

              {/* Posts feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="anonymous" className="mt-0">
              <AnonymousSharingSystem />
            </TabsContent>

            <TabsContent value="question" className="mt-0">
              <QuestionOfTheDay />
            </TabsContent>
            <TabsContent value="journal" className="mt-0">
              <JournalInterface />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <PodSidebar users={anonymousUsers} />
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="bg-white rounded-xl border-neutral-200 p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-neutral-800 text-xl">Share with your pod?</DialogTitle>
            <DialogDescription className="text-neutral-500">
              Your message will be shared anonymously with your pod members.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-neutral-50 p-4 rounded-xl my-2 text-neutral-700">
            {postContent}
            <div className="mt-2">
              <EmotionTag emotion={selectedEmotion} selected={true} onClick={() => { }} />
            </div>
          </div>

          <DialogFooter className="flex gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Edit message
            </Button>
            <Button
              onClick={confirmSubmit}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
            >
              Share now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
