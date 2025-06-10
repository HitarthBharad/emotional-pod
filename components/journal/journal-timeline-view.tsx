"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import type { JournalEntry } from "./types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface JournalTimelineViewProps {
  entries: JournalEntry[]
  onEdit: (entry: JournalEntry) => void
  onDelete: (entryId: string) => void
}

export default function JournalTimelineView({ entries, onEdit, onDelete }: JournalTimelineViewProps) {
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null)

  const getMoodEmoji = (mood: string) => {
    const moodEmojis: Record<string, string> = {
      happy: "😊",
      calm: "😌",
      sad: "😔",
      anxious: "😟",
      neutral: "😐",
      determined: "💪",
      grateful: "🙏",
      inspired: "✨",
      accomplished: "🎉",
      overwhelmed: "😓",
    }
    return moodEmojis[mood] || "😐"
  }

  const groupEntriesByDate = () => {
    const grouped: Record<string, JournalEntry[]> = {}

    entries.forEach((entry) => {
      const date = format(parseISO(entry.date), "MMMM d, yyyy")
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(entry)
    })

    return grouped
  }

  const groupedEntries = groupEntriesByDate()

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-sm font-medium text-neutral-500 sticky top-0 bg-white py-2">{date}</h3>

          {dateEntries.map((entry) => (
            <div key={entry.id} className="bg-neutral-50 rounded-lg p-4 border border-neutral-100">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-neutral-500">{format(parseISO(entry.date), "h:mm a")}</span>
                  {entry.mood && (
                    <Badge variant="outline" className="bg-white">
                      {getMoodEmoji(entry.mood)} <span className="ml-1 capitalize">{entry.mood}</span>
                    </Badge>
                  )}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(entry)}>
                      <Edit2 className="h-4 w-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setEntryToDelete(entry.id)}
                      className="text-red-500 focus:text-red-500"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="text-neutral-800 whitespace-pre-line mb-3">{entry.content}</div>

              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-neutral-100 text-neutral-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

      <AlertDialog open={!!entryToDelete} onOpenChange={(open) => !open && setEntryToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your journal entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (entryToDelete) {
                  onDelete(entryToDelete)
                  setEntryToDelete(null)
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {entries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-neutral-500">No entries found</p>
        </div>
      )}
    </div>
  )
}
