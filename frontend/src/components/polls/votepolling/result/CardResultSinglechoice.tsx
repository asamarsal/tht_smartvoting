import type { Poll } from "@/utils/dummydata";

interface Props {
  poll: Poll;
}

// Mock data generator based on poll id
const getMockResults = (id: number) => {
  const options = ["Option A", "Option B", "Option C", "Option D"];
  const totalVotes = 1250;

  // Semi-random distribution based on id
  return options
    .map((opt, i) => {
      const base = [45, 30, 15, 10][i];
      const variance = (id % 3) * 5 * (i % 2 === 0 ? 1 : -1);
      const percentage = Math.max(5, Math.min(90, base + variance));
      const count = Math.round((percentage / 100) * totalVotes);

      return {
        label: opt,
        count,
        percentage,
        color: i === 0 ? "bg-blue-600" : "bg-gray-400", // Simple winner highlight
      };
    })
    .sort((a, b) => b.count - a.count); // Sort by highest votes
};

export default function CardResultSinglechoice({ poll }: Props) {
  const results = getMockResults(poll.id);
  const totalVotes = results.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>Total Votes</span>
        <span className="font-bold text-gray-900 text-lg">
          {totalVotes.toLocaleString()}
        </span>
      </div>

      <div className="space-y-4">
        {results.map((result, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-end justify-between text-sm">
              <span className="font-medium text-gray-900">{result.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-gray-900">
                  {result.count.toLocaleString()}
                </span>
                <span className="text-gray-500 text-xs w-8 text-right">
                  {result.percentage}%
                </span>
              </div>
            </div>

            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  i === 0 ? "bg-blue-600" : "bg-blue-400 opacity-70"
                }`}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
