"use client"

import { useState } from "react"
import { Heart, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface AnonymousPost {
  id: number
  pseudonym: string
  gradientClass: string
  content: string
  timestamp: string
  isIdentityRevealed: boolean
}

interface AnonymousPostCardProps {
  post: AnonymousPost
}

export default function AnonymousPostCard({ post }: AnonymousPostCardProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1)
      setLiked(true)
    } else {
      setLikeCount(likeCount - 1)
      setLiked(false)
    }
  }

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      // In a real app, this would submit the reply to the backend
      console.log(`Reply to post ${post.id}: ${replyContent}`)
      setReplyContent("")
      setIsReplying(false)
    }
  }

  // Generate a unique pattern for the abstract avatar
  const patternId = `pattern-${post.id}`
  const patternElements = []
  for (let i = 0; i < 5; i++) {
    patternElements.push(
      <motion.circle
        key={i}
        cx={10 + i * 8}
        cy={10 + (i % 3) * 8}
        r={3 + (i % 3)}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: [0.7, 0.9, 0.7], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
      />,
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
      {/* Post header */}
      <div className="flex justify-between items-start p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${post.gradientClass} relative overflow-hidden`}>
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={patternId} patternUnits="userSpaceOnUse" width="40" height="40">
                  <rect width="40" height="40" fill="none" />
                  {patternElements}
                </pattern>
              </defs>
              <rect width="40" height="40" fill={`url(#${patternId})`} fillOpacity="0.4" />
            </svg>
          </div>
          <div>
            <div className="font-medium text-neutral-800 flex items-center gap-2">
              {post.pseudonym}
              {post.isIdentityRevealed && (
                <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <User className="h-3 w-3" /> Identity Revealed
                </span>
              )}
            </div>
            <div className="text-xs text-neutral-500">{post.timestamp}</div>
          </div>
        </div>
      </div>

      {/* Post content */}
      <div className="p-4 text-neutral-700 whitespace-pre-line">{post.content}</div>

      {/* Post actions */}
      <div className="px-4 pb-3 flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className={`text-neutral-600 hover:text-amber-600 hover:bg-amber-50 ${
            liked ? "text-amber-600 bg-amber-50" : ""
          }`}
        >
          <Heart className={`h-4 w-4 mr-1.5 ${liked ? "fill-amber-600" : ""}`} />
          <span className="text-xs">{likeCount > 0 ? likeCount : "Like"}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
          className="text-neutral-600 hover:text-amber-600 hover:bg-amber-50"
        >
          <MessageCircle className="h-4 w-4 mr-1.5" />
          <span className="text-xs">Reply</span>
        </Button>
      </div>

      {/* Reply form */}
      {isReplying && (
        <div className="p-4 border-t border-neutral-100">
          <Textarea
            placeholder="Write a supportive reply..."
            className="min-h-[80px] bg-neutral-50 border-neutral-200 focus-visible:ring-amber-500 rounded-lg mb-3 text-neutral-700 text-sm resize-none"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsReplying(false)}
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmitReply}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              disabled={!replyContent.trim()}
            >
              Send Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
