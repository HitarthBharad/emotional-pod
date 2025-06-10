"use client"

interface EmotionTagProps {
  emotion: string
  selected: boolean
  onClick: () => void
}

export default function EmotionTag({ emotion, selected, onClick }: EmotionTagProps) {
  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case "anxious":
        return "😟"
      case "hopeful":
        return "🌱"
      case "grieving":
        return "💔"
      case "grateful":
        return "🙏"
      case "overwhelmed":
        return "😓"
      case "peaceful":
        return "😌"
      case "confused":
        return "🤔"
      case "determined":
        return "💪"
      default:
        return "💭"
    }
  }

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs transition-all flex items-center gap-1 h-8
        ${
          selected
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm"
            : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
        }`}
    >
      <span>{getEmotionEmoji(emotion)}</span>
      <span>{emotion}</span>
    </button>
  )
}
