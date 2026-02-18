import { useState } from "react";
import type { Poll } from "@/utils/dummydata";

interface Props {
  poll: Poll;
  onVote: (optionIndex: number, isAnonymous: boolean) => void;
}

// Mock options per poll (nanti diganti dari API)
const mockOptions = ["Option A", "Option B", "Option C", "Option D"];

export default function CardVoteSinglechoice({ poll, onVote }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnonymousVote, setIsAnonymousVote] = useState(false);

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">{poll.description}</p>
      {mockOptions.map((opt, i) => (
        <button
          key={i}
          onClick={() => setSelected(i)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
            selected === i
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              selected === i ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {selected === i && (
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            )}
          </span>
          <span className="font-medium text-sm">{opt}</span>
        </button>
      ))}

      {/* Anonymous Toggle */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="anonymous-single"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          checked={isAnonymousVote}
          onChange={(e) => setIsAnonymousVote(e.target.checked)}
        />
        <label
          htmlFor="anonymous-single"
          className="text-sm text-gray-700 cursor-pointer select-none"
        >
          Vote anonymously
        </label>
      </div>

      <button
        disabled={selected === null}
        onClick={() => selected !== null && onVote(selected, isAnonymousVote)}
        className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Submit Vote
      </button>
    </div>
  );
}
