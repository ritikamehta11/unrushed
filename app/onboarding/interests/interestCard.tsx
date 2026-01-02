type InterestCardProps = {
  label: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}

export default function InterestCard({ label, icon, selected, onClick } : InterestCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex flex-col items-center justify-center gap-2 rounded-xl min-h-24 border px-10 py-10 text-sm transition
        ${selected
          ? "border-neutral-900 bg-neutral-100 text-neutral-900"
          : "border-neutral-200 bg-white text-neutral-700"
        }
        focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
      `}

    >
      <span aria-hidden className="text-xl">{icon}</span> <span>{label}</span>
    </button>
  )
}