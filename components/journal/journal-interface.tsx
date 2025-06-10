"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Book, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import JournalEditor from "./journal-editor"
import JournalCalendarView from "./journal-calendar-view"
import JournalTimelineView from "./journal-timeline-view"
import type { JournalEntry } from "./types"

export default function JournalInterface() {
  const [activeView, setActiveView] = useState<"calendar" | "timeline">("timeline")
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null)
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([])

  // Load entries from localStorage on component mount
  useEffect(() => {
    const user = localStorage.getItem("emotionalPods_user")
    if (user) {
      const userId = JSON.parse(user).id
      const savedEntries = localStorage.getItem(`journal_entries_${userId}`)
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries))
      } else {
        // Sample entries for first-time users
        const sampleEntries = [
          {
            id: "1",
            content:
              "Today I felt a sense of accomplishment after completing my project. It's been weighing on me for weeks, and finally getting it done has lifted a huge weight off my shoulders.",
            date: new Date(Date.now() - 86400000).toISOString(),
            mood: "accomplished",
            tags: ["work", "project"],
          },
        ]
        setEntries(sampleEntries)
        saveEntries(sampleEntries, userId)
      }
    }
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEntries(entries)
    } else {
      const filtered = entries.filter(
        (entry) =>
          entry.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          entry.mood?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredEntries(filtered)
    }
  }, [searchQuery, entries])

  const saveEntries = (updatedEntries: JournalEntry[], userId: string) => {
    localStorage.setItem(`journal_entries_${userId}`, JSON.stringify(updatedEntries))
  }

  const handleSaveEntry = (entry: JournalEntry) => {
    const user = localStorage.getItem("emotionalPods_user")
    if (user) {
      const userId = JSON.parse(user).id
      let updatedEntries: JournalEntry[]

      if (editingEntry) {
        // Update existing entry
        updatedEntries = entries.map((e) => (e.id === entry.id ? entry : e))
      } else {
        // Add new entry
        updatedEntries = [entry, ...entries]
      }

      setEntries(updatedEntries)
      saveEntries(updatedEntries, userId)
      setIsCreating(false)
      setEditingEntry(null)
    }
  }

  const handleDeleteEntry = (entryId: string) => {
    const user = localStorage.getItem("emotionalPods_user")
    if (user) {
      const userId = JSON.parse(user).id
      const updatedEntries = entries.filter((entry) => entry.id !== entryId)
      setEntries(updatedEntries)
      saveEntries(updatedEntries, userId)
    }
  }

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntry(entry)
    setIsCreating(true)
  }

  return (
    <div className="space-y-6">
      {/* Header with privacy indicator */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Book className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-neutral-800">Journal</h2>
          </div>
        </div>
        <Button
          onClick={() => {
            setIsCreating(true)
            setEditingEntry(null)
          }}
        >
          <Plus className="h-4 w-4 mr-2" /> New Entry
        </Button>
      </div>

      {isCreating ? (
        <JournalEditor
          onSave={handleSaveEntry}
          onCancel={() => {
            setIsCreating(false)
            setEditingEntry(null)
          }}
          entry={editingEntry}
        />
      ) : (
        <>
          {/* Search and view toggle */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-neutral-100">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
              <div className="relative w-full sm:w-64">
                <Search className="ml-5 absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <Input
                  placeholder="Search entries..."
                  className="pl-9 bg-neutral-50 border-neutral-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">View:</span>
                <Button
                  variant={activeView === "timeline" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveView("timeline")}
                >
                  <Clock className="h-4 w-4 mr-2" /> Timeline
                </Button>
                <Button
                  variant={activeView === "calendar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveView("calendar")}
                >
                  <Calendar className="h-4 w-4 mr-2" /> Calendar
                </Button>
              </div>
            </div>

            {entries.length === 0 ? (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <div className="bg-indigo-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Book className="h-6 w-6 text-indigo-500" />
                </div>
                <h3 className="text-lg font-medium text-neutral-700 mb-2">Your journal is empty</h3>
                <p className="text-neutral-500 mb-4">Start writing your thoughts and reflections</p>
                <Button onClick={() => setIsCreating(true)} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Create First Entry
                </Button>
              </div>
            ) : (
              <>
                {activeView === "timeline" ? (
                  <JournalTimelineView
                    entries={filteredEntries}
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                  />
                ) : (
                  <JournalCalendarView entries={entries} onSelectEntry={handleEditEntry} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
