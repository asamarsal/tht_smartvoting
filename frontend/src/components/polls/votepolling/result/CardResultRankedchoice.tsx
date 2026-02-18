import type { Poll } from "@/utils/dummydata";

interface Props {
  poll: Poll;
}

const getMockResults = (id: number) => {
  const options = ["Option A", "Option B", "Option C", "Option D"];

  // Rank points calculation mock
  // 1st place = 3 pts, 2nd = 2 pts, 3rd = 1 pt
  return options
    .map((opt, i) => {
      const basePoints = [450, 320, 210, 150][i];
      const variance = (id % 5) * 20 * (i % 2 === 0 ? 1 : -1);
      const points = Math.max(50, basePoints + variance);

      // Calculate percentage relative to total points for visualization
      // Max theoretical points is roughly votes * 3 (if everyone ranked 1st)
      // This is just a relative scale for the bar
      const maxPossiblePoints = 500;
      const percentage = Math.round((points / maxPossiblePoints) * 100);

      return {
        label: opt,
        points,
        percentage: Math.min(100, percentage),
        color: i === 0 ? "bg-orange-500" : "bg-orange-300 opacity-80",
      };
    })
    .sort((a, b) => b.points - a.points);
};

export default function CardResultRankedchoice({ poll }: Props) {
  const results = getMockResults(poll.id);

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 text-sm text-orange-800 mb-4">
        <p className="font-semibold mb-1">Ranked Choice Scoring</p>
        <p className="opacity-80 text-xs">
          Points are calculated based on rankings: 1st choice = 3 pts, 2nd
          called = 2 pts, 3rd choice = 1 pt.
        </p>
      </div>

      <div className="space-y-4">
        {results.map((result, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex items-end justify-between text-sm">
              <div className="flex items-center gap-2">
                {i === 0 && (
                  <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide">
                    Winner
                  </span>
                )}
                <span className="font-medium text-gray-900">
                  {result.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-gray-900">
                  {result.points.toLocaleString()} pts
                </span>
              </div>
            </div>

            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  result.color
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
