import Topbar from "@/components/common/Topbar";
import BottomBar from "@/components/common/BottomBar";
import ApexChart from "@/components/common/ApexChart";
import { mockPolls } from "@/utils/dummydata";
import { Users, Vote, CheckCircle, XCircle } from "lucide-react";

export default function DashboardPage() {
  // --- Analytics Calculations ---
  const totalPolls = mockPolls.length;
  const activePolls = mockPolls.filter((p) => p.status === "active").length;
  const closedPolls = mockPolls.filter((p) => p.status === "closed").length;
  const totalVotes = mockPolls.reduce((sum, p) => sum + p.votes, 0);

  // Chart Data: Top 5 Polls by Votes
  const topPolls = [...mockPolls].sort((a, b) => b.votes - a.votes).slice(0, 5);

  const barChartSeries = [
    {
      name: "Votes",
      data: topPolls.map((p) => p.votes),
    },
  ];

  const barChartOptions = {
    chart: { type: "bar", toolbar: { show: false } },
    plotOptions: {
      bar: { borderRadius: 4, horizontal: true, barHeight: "60%" },
    },
    dataLabels: { enabled: false },
    xaxis: { categories: topPolls.map((p) => p.title) },
    colors: ["#3b82f6"],
    grid: { borderColor: "#f3f4f6" },
  };

  // Chart Data: Poll Type Distribution
  const typeCounts = {
    single: mockPolls.filter((p) => p.type === "single").length,
    multiple: mockPolls.filter((p) => p.type === "multiple").length,
    ranked: mockPolls.filter((p) => p.type === "ranked").length,
  };

  const pieChartSeries = [
    typeCounts.single,
    typeCounts.multiple,
    typeCounts.ranked,
  ];
  const pieChartOptions = {
    labels: ["Single Choice", "Multiple Choice", "Ranked Choice"],
    colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
    legend: { position: "bottom" },
    dataLabels: { enabled: true },
    plotOptions: { pie: { donut: { size: "55%" } } },
  };

  // Chart Data: Participation Trends (Mock)
  const trendSeries = [
    {
      name: "Participation",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];
  const trendOptions = {
    chart: { type: "area", toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    colors: ["#10b981"],
    dataLabels: { enabled: false },
    grid: { show: false },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Topbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Overview of polling activity and engagement
          </p>
        </div>

        {/* 1. Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            label="Total Polls"
            value={totalPolls}
            icon={CheckCircle}
            color="text-blue-600"
            bg="bg-blue-50"
          />
          <SummaryCard
            label="Active Polls"
            value={activePolls}
            icon={Vote}
            color="text-green-600"
            bg="bg-green-50"
          />
          <SummaryCard
            label="Closed Polls"
            value={closedPolls}
            icon={XCircle}
            color="text-gray-600"
            bg="bg-gray-100"
          />
          <SummaryCard
            label="Total Votes Cast"
            value={totalVotes.toLocaleString()}
            icon={Users}
            color="text-purple-600"
            bg="bg-purple-50"
          />
        </div>

        {/* 2. Main Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Polls (Bar) - Takes up 2 columns */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Top Polls by Engagement
            </h3>
            <div className="h-[300px]">
              <ApexChart
                type="bar"
                series={barChartSeries}
                options={barChartOptions}
                height="100%"
              />
            </div>
          </div>

          {/* Poll Types (Donut) - Takes up 1 column */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Poll Type Distribution
            </h3>
            <div className="h-[300px]">
              <ApexChart
                type="donut"
                series={pieChartSeries}
                options={pieChartOptions}
                height="100%"
              />
            </div>
          </div>
        </div>

        {/* 3. Trend Chart (Area) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Voting Activity Trend (2024)
          </h3>
          <div className="h-[300px]">
            <ApexChart
              type="area"
              series={trendSeries}
              options={trendOptions}
              height="100%"
            />
          </div>
        </div>
      </main>

      <BottomBar />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  color,
  bg,
}: {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  bg: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
