"use client"

import { CalendarCheck, MessageCircle, Smile, Users, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface PodSidebarProps {
  users: string[]
}

export default function PodSidebar({ users }: PodSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-neutral-100 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="border-b border-neutral-100">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-base text-neutral-800 font-medium">
                <Users className="h-4 w-4 text-amber-500" />
                Pod Members
              </div>
              <div className="text-sm text-neutral-500">7 members</div>
              <div className="text-sm text-neutral-500">12 posts today</div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-amber-600 mt-1"
            >
              View all <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {users.slice(0, 5).map((user, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-medium">
                  {user.charAt(0)}
                </div>
                <span className="text-neutral-700 text-sm">{user}</span>
                <div className="ml-auto w-2 h-2 rounded-full bg-green-400"></div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-white border-neutral-100 shadow-sm rounded-xl overflow-hidden">
        <CardHeader className="pb-3 border-b border-neutral-100">
          <CardTitle className="text-neutral-800 text-base">Pod Insights</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-neutral-700 flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4 text-amber-500" /> Pod check-in streak
              </span>
              <span className="text-amber-600 font-medium text-sm">5 days</span>
            </div>
            <Progress value={70} className="h-2 bg-neutral-100">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
            </Progress>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-neutral-700 flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-amber-500" /> Messages today
            </span>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">12</span>
          </div>

          {/* Emotional Tone */}
          <div>
            <div className="text-sm text-neutral-700 mb-3 flex items-center gap-1.5">
              <Smile className="h-4 w-4 text-amber-500" /> Emotional tone of the day
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <div className="text-xl mb-1">🤗</div>
                <div className="text-xs text-neutral-500">Supportive</div>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <div className="text-xl mb-1">💪</div>
                <div className="text-xs text-neutral-500">Resilient</div>
              </div>
              <div className="bg-neutral-50 rounded-lg p-3 text-center">
                <div className="text-xl mb-1">🙏</div>
                <div className="text-xs text-neutral-500">Grateful</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
