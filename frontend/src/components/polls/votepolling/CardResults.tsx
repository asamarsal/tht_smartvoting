import { X, RefreshCw, User, History } from "lucide-react";
import type { Poll } from "@/utils/dummydata";
import CardResultSinglechoice from "./result/CardResultSinglechoice";
import CardResultMultiplechoice from "./result/CardResultMultiplechoice";
import CardResultRankedchoice from "./result/CardResultRankedchoice";

interface Props {
  poll: Poll;
  onClose: () => void;
}

// Mock Voter Data
interface VoterLog {
  id: number;
  name: string;
  avatar?: string;
  choice: string;
  time: string;
  isAnonymous: boolean;
}

const getMockVoterLogs = (poll: Poll): VoterLog[] => {
  const names = [
    "Ujang",
    "Roni",
    "Siti",
    "Budi",
    "Dewi",
    "Agus",
    "Winda",
    "Eko",
  ];
  const actions = {
    single: ["Option A", "Option B", "Option C"],
    multiple: ["Option A, Option B", "Option C", "Option A, Option C"],
    ranked: ["A > B > C", "B > A > C", "C > A > B"],
  };

  const choices = actions[poll.type as keyof typeof actions] || actions.single;

  return Array.from({ length: 8 }).map((_, i) => {
    const isAnonymous = i % 3 === 0; // Every 3rd vote is anonymous
    return {
      id: i,
      name: isAnonymous ? "Anonymous" : names[i % names.length],
      choice: choices[i % choices.length],
      time: `${Math.max(1, 10 - i)}m ago`,
      isAnonymous,
    };
  });
};

const VoterLogList = ({ logs }: { logs: VoterLog[] }) => {
  return (
    <div className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg text-sm"
          >
            <div
              className={`p-1.5 rounded-full shrink-0 ${log.isAnonymous ? "bg-gray-200 text-gray-500" : "bg-blue-100 text-blue-600"}`}
            >
              <User className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-gray-900">
                <span className="font-medium">{log.name}</span>
                <span className="text-gray-500 mx-1">voted for</span>
                <span className="font-medium text-gray-900">{log.choice}</span>
              </p>
              <span className="text-xs text-gray-400">{log.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CardResults({ poll, onClose }: Props) {
  const voterLogs = getMockVoterLogs(poll);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg md:max-w-5xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div>
            <h2 className="text-lg font-bold text-gray-900">{poll.title}</h2>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {poll.type.replace("-", " ")} Results
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            {/* Left Column: Charts (takes priority) */}
            <div className="flex-1 space-y-6">
              {poll.type === "single" && <CardResultSinglechoice poll={poll} />}
              {poll.type === "multiple" && (
                <CardResultMultiplechoice poll={poll} />
              )}
              {poll.type === "ranked" && <CardResultRankedchoice poll={poll} />}

              {/* Real-time footer - staying with charts */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl text-blue-700 text-sm">
                <RefreshCw className="w-5 h-5 shrink-0 animate-spin-slow" />
                <div>
                  <p className="font-semibold mb-0.5">Real-time data</p>
                  <p className="text-blue-600/80 text-xs leading-relaxed">
                    Results update as votes come in. You can refresh to see the
                    latest results.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Recent Activity (Sidebar on desktop, stacked below on mobile) */}
            <div className="w-full md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
              <VoterLogList logs={voterLogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
