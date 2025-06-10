"use client"

import { useState } from "react"
import { Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ModerationInterfaceProps {
  postId: number
  onFlagPost: (postId: number, reason: string, details?: string) => void
}

export default function ModerationInterface({ postId, onFlagPost }: ModerationInterfaceProps) {
  const [showFlagDialog, setShowFlagDialog] = useState(false)
  const [flagReason, setFlagReason] = useState("")
  const [otherDetails, setOtherDetails] = useState("")

  const handleSubmitFlag = () => {
    onFlagPost(postId, flagReason, flagReason === "other" ? otherDetails : undefined)
    setShowFlagDialog(false)
    // Reset form
    setFlagReason("")
    setOtherDetails("")
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowFlagDialog(true)}
        className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
      >
        <Flag className="h-3.5 w-3.5 mr-1.5" />
        <span className="text-xs">Flag</span>
      </Button>

      <Dialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
        <DialogContent className="bg-white rounded-xl border-neutral-200 p-6 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-neutral-800">Flag this post</DialogTitle>
            <DialogDescription className="text-neutral-500">
              Please let us know why you're flagging this post. This helps us maintain a supportive environment.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <RadioGroup value={flagReason} onValueChange={setFlagReason}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 gap-2">
                  <RadioGroupItem value="judgmental" id="judgmental" />
                  <Label htmlFor="judgmental" className="text-neutral-700">
                    Judgmental or critical
                  </Label>
                </div>
                <div className="flex items-center space-x-2 gap-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="text-neutral-700">
                    Aggressive or hostile
                  </Label>
                </div>
                <div className="flex items-center space-x-2 gap-2">
                  <RadioGroupItem value="off-topic" id="off-topic" />
                  <Label htmlFor="off-topic" className="text-neutral-700">
                    Off-topic or inappropriate
                  </Label>
                </div>
                <div className="flex items-center space-x-2 gap-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="text-neutral-700">
                    Other reason
                  </Label>
                </div>

                {flagReason === "other" && (
                  <Textarea
                    placeholder="Please provide more details..."
                    className="mt-2 bg-neutral-50 border-neutral-200 focus-visible:ring-amber-500 rounded-lg text-neutral-700 text-sm resize-none"
                    value={otherDetails}
                    onChange={(e) => setOtherDetails(e.target.value)}
                  />
                )}
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className="flex gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setShowFlagDialog(false)}
              className="border-neutral-200 text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitFlag}
              disabled={!flagReason || (flagReason === "other" && !otherDetails.trim())}
            >
              Submit Flag
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
