"use client"

import { useState } from "react"
import { MessageCircle, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import EmotionTag from "./emotion-tag"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import ModerationInterface from "./moderation-interface"
import SensitiveContentBanner from "./sensitive-content-banner"

interface Reply {
  id: number
  author: string
  content: string
  timestamp: string
}

interface Post {
  id: number
  author: string
  content: string
  timestamp: string
  emotion: string
  reactions: {
    "❤️": number
    "🤗": number
    "🙏": number
    "💪": number
  }
  replies: Reply[]
  hasSensitiveContent?: boolean
}

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [localPost, setLocalPost] = useState<Post>(post)
  const [isFlagged, setIsFlagged] = useState(false)

  const handleReaction = (emoji: "❤️" | "🤗" | "🙏" | "💪") => {
    setLocalPost({
      ...localPost,
      reactions: {
        ...localPost.reactions,
        [emoji]: localPost.reactions[emoji] + 1,
      },
    })
  }

  const handleSubmitReply = () => {
    if (replyContent.trim()) {
      const newReply = {
        id: Date.now(),
        author: "You (anonymous)",
        content: replyContent,
        timestamp: "Just now",
      }

      setLocalPost({
        ...localPost,
        replies: [...localPost.replies, newReply],
      })

      setReplyContent("")
      setIsReplying(false)
    }
  }

  const handleFlagPost = (postId: number, reason: string, details?: string) => {
    console.log(`Post ${postId} flagged for: ${reason}`, details)
    setIsFlagged(true)
  }

  if (isFlagged) {
    return (
      <div className="bg-neutral-50 rounded-xl shadow-sm border border-neutral-100 p-5 text-center">
        <p className="text-neutral-500">This post has been flagged and is under review.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
      {/* Sensitive content banner */}
      {localPost.hasSensitiveContent && <SensitiveContentBanner />}

      {/* Post header */}
      <div className="flex justify-between items-start p-4 border-b border-neutral-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-medium">
            {post.author.charAt(0)}
          </div>
          <div>
            <div className="font-medium text-neutral-800">{post.author}</div>
            <div className="text-xs text-neutral-500">{post.timestamp}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <EmotionTag emotion={post.emotion} selected={true} onClick={() => {}} />
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-neutral-500">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>

      {/* Post content */}
      <div className="p-4 text-neutral-700 whitespace-pre-line">{post.content}</div>

      {/* Reactions and moderation */}
      <div className="px-4 pb-3 flex flex-wrap gap-2">
        <button
          onClick={() => handleReaction("❤️")}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <span>❤️</span>
          <span>{localPost.reactions["❤️"]}</span>
        </button>
        <button
          onClick={() => handleReaction("🤗")}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <span>🤗</span>
          <span>{localPost.reactions["🤗"]}</span>
        </button>
        <button
          onClick={() => handleReaction("🙏")}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <span>🙏</span>
          <span>{localPost.reactions["🙏"]}</span>
        </button>
        <button
          onClick={() => handleReaction("💪")}
          className="flex items-center gap-1 px-3 py-1 bg-neutral-50 rounded-full border border-neutral-200 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <span>💪</span>
          <span>{localPost.reactions["💪"]}</span>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <ModerationInterface postId={post.id} onFlagPost={handleFlagPost} />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsReplying(!isReplying)}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
          >
            <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
            <span className="text-xs">Reply</span>
          </Button>
        </div>
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

      {/* Replies */}
      {localPost.replies.length > 0 && (
        <div className="border-t border-neutral-100">
          {localPost.replies.map((reply) => (
            <div key={reply.id} className="p-4 border-b border-neutral-100 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-medium">
                    {reply.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-800 text-sm">{reply.author}</div>
                    <div className="text-xs text-neutral-500">{reply.timestamp}</div>
                  </div>
                </div>
              </div>
              <div className="text-neutral-700 text-sm pl-9">{reply.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
