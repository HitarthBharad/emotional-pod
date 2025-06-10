import { AlertTriangle } from "lucide-react"

export default function SensitiveContentBanner() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3 flex items-center gap-2">
      <AlertTriangle className="h-4 w-4 text-amber-500" />
      <p className="text-sm text-amber-700">This post may contain sensitive content.</p>
    </div>
  )
}
