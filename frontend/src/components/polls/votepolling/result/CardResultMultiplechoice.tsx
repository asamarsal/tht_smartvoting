import type { Poll } from "@/utils/dummydata";

interface Props {
  poll: Poll;
}

const getMockResults = (id: number) => {
  const options = ["Option A", "Option B", "Option C", "Option D"];
  const totalRespondents = 850; // Multiple choice often has fewer respondents than total selections

  // Percentages can sum > 100% in multiple choice
  return options
    .map((opt, i) => {
      const base = [65, 40, 25, 15][i];
      const variance = (id % 4) * 5 * (i % 2 === 0 ? 1 : -1);
      const percentage = Math.max(5, Math.min(95, base + variance));
      const count = Math.round((percentage / 100) * totalRespondents);

      return {
        label: opt,
        count,
        percentage,
        color: i === 0 ? "bg-purple-600" : "bg-purple-400 opacity-70",
      };
    })
    .sort((a, b) => b.count - a.count);
};

export default function CardResultMultiplechoice({ poll }: Props) {
  const results = getMockResults(poll.id);
  // In multiple choice, total selections > total respondents
  const totalSelections = results.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <span>Total Selections</span>
        <span className="font-bold text-gray-900 text-lg">
          {totalSelections.toLocaleString()}
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
                  i === 0 ? "bg-purple-600" : "bg-purple-400 opacity-70"
                }`}
                style={{ width: `${result.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4 italic">
        * Percentages may exceed 100% as voters can select multiple options.
      </p>
    </div>
  );
}
