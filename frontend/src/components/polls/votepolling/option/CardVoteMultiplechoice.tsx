import { useState } from "react";
import type { Poll } from "@/utils/dummydata";

interface Props {
  poll: Poll;
  onVote: (selectedIndices: number[], isAnonymous: boolean) => void;
}

const mockOptions = ["Option A", "Option B", "Option C", "Option D"];

export default function CardVoteMultiplechoice({ poll, onVote }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const [isAnonymousVote, setIsAnonymousVote] = useState(false);

  const toggle = (i: number) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-1">{poll.description}</p>
      <p className="text-xs text-gray-400 mb-4">Select all that apply</p>
      {mockOptions.map((opt, i) => (
        <button
          key={i}
          onClick={() => toggle(i)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all ${
            selected.includes(i)
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 text-gray-700"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition ${
              selected.includes(i)
                ? "border-blue-500 bg-blue-500"
                : "border-gray-300"
            }`}
          >
            {selected.includes(i) && (
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </span>
          <span className="font-medium text-sm">{opt}</span>
        </button>
      ))}

      {/* Anonymous Toggle */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="anonymous-multiple"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          checked={isAnonymousVote}
          onChange={(e) => setIsAnonymousVote(e.target.checked)}
        />
        <label
          htmlFor="anonymous-multiple"
          className="text-sm text-gray-700 cursor-pointer select-none"
        >
          Vote anonymously
        </label>
      </div>

      <button
        disabled={selected.length === 0}
        onClick={() => onVote(selected, isAnonymousVote)}
        className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Submit Vote ({selected.length} selected)
      </button>
    </div>
  );
}
