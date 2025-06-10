"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Save, X, Smile, Tag, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import type { JournalEntry } from "./types"
import { v4 as uuidv4 } from "uuid"

interface JournalEditorProps {
  onSave: (entry: JournalEntry) => void
  onCancel: () => void
  entry?: JournalEntry | null
}

const moodOptions = [
  { emoji: "😊", name: "happy" },
  { emoji: "😌", name: "calm" },
  { emoji: "😔", name: "sad" },
  { emoji: "😟", name: "anxious" },
  { emoji: "😐", name: "neutral" },
  { emoji: "💪", name: "determined" },
  { emoji: "🙏", name: "grateful" },
  { emoji: "✨", name: "inspired" },
  { emoji: "🎉", name: "accomplished" },
  { emoji: "😓", name: "overwhelmed" },
]

export default function JournalEditor({ onSave, onCancel, entry }: JournalEditorProps) {
  const [content, setContent] = useState("")
  const [mood, setMood] = useState<string | null>(null)
  const [date, setDate] = useState<Date>(new Date())
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  useEffect(() => {
    if (entry) {
      setContent(entry.content)
      setMood(entry.mood || null)
      setDate(new Date(entry.date))
      setTags(entry.tags || [])
    }
  }, [entry])

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSave = () => {
    if (!content.trim()) return

    const journalEntry: JournalEntry = {
      id: entry?.id || uuidv4(),
      content,
      date: date.toISOString(),
      mood: mood || undefined,
      tags: tags.length > 0 ? tags : undefined,
    }

    onSave(journalEntry)
  }

  const getMoodEmoji = (moodName: string) => {
    const found = moodOptions.find((m) => m.name === moodName)
    return found ? found.emoji : "😐"
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-neutral-800">{entry ? "Edit Journal Entry" : "New Journal Entry"}</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!content.trim()}
          >
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              {format(date, "MMM d, yyyy")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(date) => {
                if (date) {
                  setDate(date)
                  setIsDatePickerOpen(false)
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              <Smile className="h-3.5 w-3.5 mr-1.5" />
              {mood ? (
                <span className="flex items-center">
                  {getMoodEmoji(mood)} <span className="ml-1 capitalize">{mood}</span>
                </span>
              ) : (
                "Add mood"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((option) => (
                <button
                  key={option.name}
                  className={`flex flex-col items-center p-2 rounded-md hover:bg-neutral-100 ${
                    mood === option.name ? "bg-indigo-100 text-indigo-700" : ""
                  }`}
                  onClick={() => setMood(option.name)}
                >
                  <span className="text-xl mb-1">{option.emoji}</span>
                  <span className="text-xs capitalize">{option.name}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Tag className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-neutral-400" />
            <Input
              placeholder="Add tags..."
              className="pl-8 h-8 bg-neutral-50 border-neutral-200"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button variant="outline" size="sm" className="h-8" onClick={handleAddTag} disabled={!tagInput.trim()}>
            Add
          </Button>
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
              {tag}
              <button className="ml-1 text-indigo-500 hover:text-indigo-700" onClick={() => handleRemoveTag(tag)}>
                ×
              </button>
            </Badge>
          ))}
        </div>
      )}

      <Textarea
        placeholder="What's on your mind today?"
        className="min-h-[300px] bg-neutral-50 border-neutral-200 focus-visible:ring-indigo-500 rounded-lg text-neutral-700 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  )
}
