"use client"

import { useState } from "react"
import { format, parseISO, isSameDay } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import type { JournalEntry } from "./types"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface JournalCalendarViewProps {
  entries: JournalEntry[]
  onSelectEntry: (entry: JournalEntry) => void
}

export default function JournalCalendarView({ entries, onSelectEntry }: JournalCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Get entries for the selected date
  const selectedDateEntries = selectedDate
    ? entries.filter((entry) => isSameDay(parseISO(entry.date), selectedDate))
    : []

  // Get dates that have entries
  const datesWithEntries = entries.map((entry) => parseISO(entry.date))

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

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={{
            hasEntry: datesWithEntries,
          }}
          modifiersStyles={{
            hasEntry: {
              fontWeight: "bold",
              backgroundColor: "rgba(99, 102, 241, 0.1)",
            },
          }}
        />
      </div>

      <div className="md:w-1/2">
        <div className="bg-neutral-50 rounded-lg p-4 h-full border border-neutral-100">
          <h3 className="text-lg font-medium text-neutral-800 mb-4">
            {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
          </h3>

          {selectedDateEntries.length > 0 ? (
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {selectedDateEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-lg p-4 border border-neutral-100 cursor-pointer hover:border-indigo-200 transition-colors"
                    onClick={() => onSelectEntry(entry)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-500">{format(parseISO(entry.date), "h:mm a")}</span>
                      {entry.mood && (
                        <Badge variant="outline">
                          {getMoodEmoji(entry.mood)} <span className="ml-1 capitalize">{entry.mood}</span>
                        </Badge>
                      )}
                    </div>

                    <div className="text-neutral-800 line-clamp-3 mb-2">{entry.content}</div>

                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
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
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <div className="bg-indigo-100 h-12 w-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl">📝</span>
              </div>
              {selectedDate ? (
                <>
                  <p className="text-neutral-600 mb-1">No entries for this date</p>
                  <p className="text-neutral-400 text-sm">Select another date or create a new entry</p>
                </>
              ) : (
                <p className="text-neutral-600">Select a date to view entries</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
