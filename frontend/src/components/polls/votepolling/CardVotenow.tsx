import { X } from "lucide-react";
import type { Poll } from "@/utils/dummydata";
import CardVoteSinglechoice from "./option/CardVoteSinglechoice";
import CardVoteMultiplechoice from "./option/CardVoteMultiplechoice";
import CardVoteRankedchoice from "./option/CardVoteRankedchoice";

interface Props {
  poll: Poll;
  onClose: () => void;
}

export default function CardVotenow({ poll, onClose }: Props) {
  const handleVote = (data: any, isAnonymous: boolean) => {
    console.log(
      "Voted on poll:",
      poll.id,
      "Data:",
      data,
      "Anonymous:",
      isAnonymous,
    );
    // TODO: Connect to backend API
    onClose();
    alert(`Vote submitted successfully! ${isAnonymous ? "(Anonymous)" : ""}`);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{poll.title}</h2>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {poll.type.replace("-", " ")} choice
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {poll.type === "single" && (
            <CardVoteSinglechoice poll={poll} onVote={handleVote} />
          )}
          {poll.type === "multiple" && (
            <CardVoteMultiplechoice poll={poll} onVote={handleVote} />
          )}
          {poll.type === "ranked" && (
            <CardVoteRankedchoice poll={poll} onVote={handleVote} />
          )}
        </div>
      </div>
    </div>
  );
}
