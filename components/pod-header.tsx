"use client"

import { useState, useEffect } from "react"
import { Users, Settings, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import UserSettings from "./user-settings"
import { useRouter } from "next/navigation"

export default function PodHeader() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("emotionalPods_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    // Clear user data and redirect to signup
    localStorage.removeItem("emotionalPods_user")
    localStorage.removeItem("emotionalPods_onboardingCompleted")
    router.push("/signup")
  }

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-100">
      <div className="hidden md:flex p-6">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-sm flex-shrink-0">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-neutral-800">Your Support Pod</h1>
              <p className="text-neutral-500">A safe space to share, support, and grow together</p>
              <div className="text-sm font-medium text-amber-600 pt-2">Week 3 of your journey</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                    <AvatarFallback className="bg-black text-white font-semibold">{getInitials(user.fullName)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.fullName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="p-2 text-sm">
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-neutral-500">{user.email}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setShowSettings(true)}>
                  <Settings className="h-4 w-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-neutral-800">Your Support Pod</h1>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="mb-4">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              {user && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <Avatar className="h-10 w-10 bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                      <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.fullName}</div>
                      <div className="text-sm text-neutral-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" onClick={() => setShowSettings(true)}>
                      <Settings className="h-4 w-4 mr-2" /> Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-500" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" /> Log Out
                    </Button>
                  </div>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        <p className="text-neutral-500 text-sm mb-2">A safe space to share, support, and grow together</p>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
          <div className="text-xs font-medium text-amber-600">Week 3 of your journey</div>
          <div className="text-xs text-neutral-500">7 members • 12 posts today</div>
        </div>
      </div>

      {/* Settings modal */}
      {showSettings && <UserSettings user={user} onClose={() => setShowSettings(false)} />}
    </div>
  )
}
