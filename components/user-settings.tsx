"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Bell, Shield } from "lucide-react"
import { toast } from "sonner"

interface UserSettingsProps {
  user: any
  onClose: () => void
}

export default function UserSettings({ user, onClose }: UserSettingsProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    notifications: {
      newMessages: true,
      podUpdates: true,
      weeklyDigest: false,
    },
    privacy: {
      showRealName: false,
      allowDirectMessages: true,
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleToggleChange = (section: string, setting: string, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [setting]: value,
      },
    }))
  }

  const handleSave = () => {
    // Update user data in localStorage
    const updatedUser = {
      ...user,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      settings: {
        notifications: formData.notifications,
        privacy: formData.privacy,
      },
    }

    localStorage.setItem("emotionalPods_user", JSON.stringify(updatedUser))

    toast("Settings saved");
    onClose()
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
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Account Settings</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1">
              <Shield className="h-4 w-4" /> Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xl">
                <AvatarFallback>{getInitials(formData.fullName)}</AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline" size="sm" className="text-sm">
                  Change Photo
                </Button>
                <p className="text-xs text-neutral-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">New Messages</Label>
                  <p className="text-sm text-neutral-500">Get notified when you receive new messages</p>
                </div>
                <Switch
                  checked={formData.notifications.newMessages}
                  onCheckedChange={(value) => handleToggleChange("notifications", "newMessages", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Pod Updates</Label>
                  <p className="text-sm text-neutral-500">Get notified about changes in your pod</p>
                </div>
                <Switch
                  checked={formData.notifications.podUpdates}
                  onCheckedChange={(value) => handleToggleChange("notifications", "podUpdates", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Weekly Digest</Label>
                  <p className="text-sm text-neutral-500">Receive a weekly summary of pod activity</p>
                </div>
                <Switch
                  checked={formData.notifications.weeklyDigest}
                  onCheckedChange={(value) => handleToggleChange("notifications", "weeklyDigest", value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Show Real Name</Label>
                  <p className="text-sm text-neutral-500">Display your real name instead of a pseudonym</p>
                </div>
                <Switch
                  checked={formData.privacy.showRealName}
                  onCheckedChange={(value) => handleToggleChange("privacy", "showRealName", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Allow Direct Messages</Label>
                  <p className="text-sm text-neutral-500">Let pod members message you directly</p>
                </div>
                <Switch
                  checked={formData.privacy.allowDirectMessages}
                  onCheckedChange={(value) => handleToggleChange("privacy", "allowDirectMessages", value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
