import { useState, useMemo } from "react";
import Topbar from "@/components/common/Topbar";
import {
  Search,
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Lottie from "lottie-react";
import greenDotAnimation from "@/assets/lottie/green-dot.json";
import Button from "@/components/common/Button";
import { mockPolls, type Poll } from "@/utils/dummydata";
import CardVotenow from "@/components/polls/votepolling/CardVotenow";
import CardResults from "@/components/polls/votepolling/CardResults";
import BottomBar from "@/components/common/BottomBar";

type PollType = "all" | "single" | "multiple" | "ranked";
type PollStatus = "all" | "active" | "closed";
type ViewMode = "card" | "list";
type SortKey =
  | "title"
  | "type"
  | "status"
  | "participation"
  | "votes"
  | "timeLeft"
  | "createdAt";
type SortDir = "asc" | "desc";

const pollTypeLabel: Record<string, string> = {
  single: "Single Choice",
  multiple: "Multiple Choice",
  ranked: "Ranked Choice",
};

const pollTypeBadgeClass: Record<string, string> = {
  single: "bg-gray-100 text-gray-700",
  multiple: "bg-blue-50 text-blue-700",
  ranked: "bg-purple-50 text-purple-700",
};

const PAGE_SIZE_OPTIONS = [6, 9, 12, 20];

export default function VotepollingPage() {
  const [pollTypeFilter, setPollTypeFilter] = useState<PollType>("all");
  const [statusFilter, setStatusFilter] = useState<PollStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [selectedResultPoll, setSelectedResultPoll] = useState<Poll | null>(
    null,
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPageIndex(0);
  };

  const filteredData = useMemo(() => {
    let data = mockPolls.filter((poll) => {
      const matchesType =
        pollTypeFilter === "all" || poll.type === pollTypeFilter;
      const matchesStatus =
        statusFilter === "all" || poll.status === statusFilter;
      const matchesSearch =
        poll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poll.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesStatus && matchesSearch;
    });

    if (sortKey) {
      data = [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        return sortDir === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }
    return data;
  }, [pollTypeFilter, statusFilter, searchQuery, sortKey, sortDir]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startItem = filteredData.length === 0 ? 0 : pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, filteredData.length);
  const pageData = filteredData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize,
  );

  const goToPage = (p: number) =>
    setPageIndex(Math.max(0, Math.min(p, totalPages - 1)));

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 opacity-40" />;
    return sortDir === "asc" ? (
      <ArrowUp className="w-3 h-3 text-blue-300" />
    ) : (
      <ArrowDown className="w-3 h-3 text-blue-300" />
    );
  };

  const SortableTh = ({
    col,
    children,
  }: {
    col: SortKey;
    children: React.ReactNode;
  }) => (
    <th
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer select-none hover:bg-gray-700 transition"
      onClick={() => handleSort(col)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon col={col} />
      </div>
    </th>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Topbar />

      <main className="flex-1 max-w-screen-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
        {/* Filter by Poll Type Pills */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Filter by Poll Type
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { value: "all", label: "All Types" },
              { value: "single", label: "○ Single Choice" },
              { value: "multiple", label: "☑ Multiple Choice" },
              { value: "ranked", label: "≡ Ranked Choice" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  setPollTypeFilter(value as PollType);
                  setPageIndex(0);
                }}
                className={`px-6 py-2.5 rounded-full font-medium transition-all text-sm ${
                  pollTypeFilter === value
                    ? value === "ranked"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-900 shadow-md"
                    : "bg-white/50 text-gray-600 hover:bg-white/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ===== CARD 1: Search + Status Filter ===== */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
          {/* Row 1: Search + Status Filter */}
          <div className="flex items-center gap-3 flex-wrap px-4 py-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search polls by title or description..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPageIndex(0);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              {(["all", "active", "closed"] as PollStatus[]).map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatusFilter(s);
                    setPageIndex(0);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    statusFilter === s
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== CARD 2: View Toggle + Content + Pagination ===== */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Row 2: View Toggle + Tampilkan + Count */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-1.5 rounded-md transition ${viewMode === "card" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  title="Card View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-md transition ${viewMode === "list" ? "bg-blue-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Tampilkan */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Tampilkan:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPageIndex(0);
                  }}
                  className="px-2 py-1 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {PAGE_SIZE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span>data</span>
              </div>
            </div>

            {/* Count badge */}
            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium text-xs">
              {startItem}–{endItem} dari {filteredData.length}
            </span>
          </div>

          {/* ===== CARD VIEW ===== */}
          {viewMode === "card" && (
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {pageData.length === 0 ? (
                <div className="col-span-2 py-16 text-center">
                  <div className="text-5xl mb-3">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    No polls found
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Try adjusting your filters or search query
                  </p>
                </div>
              ) : (
                pageData.map((poll) => (
                  <div
                    key={poll.id}
                    className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
                  >
                    <div className="mb-3">
                      <div className="flex items-start justify-between mb-1.5">
                        <h3 className="text-base font-semibold text-gray-900 flex-1">
                          {poll.title}
                        </h3>
                        {poll.isLive && (
                          <span className="flex items-center gap-0.5 px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full ml-2 shrink-0">
                            <Lottie
                              animationData={greenDotAnimation}
                              loop
                              autoplay
                              className="w-5 h-5"
                            />
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2.5">
                        {poll.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${pollTypeBadgeClass[poll.type]}`}
                        >
                          {pollTypeLabel[poll.type]}
                        </span>
                        {poll.isAnonymous && (
                          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                            Anonymous
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-gray-600">
                          Participation
                        </span>
                        <span className="text-xs font-bold text-gray-800">
                          {poll.participation}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                          style={{ width: `${poll.participation}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>{poll.votes.toLocaleString()} votes</span>
                        <span
                          className={`font-medium ${poll.timeLeft === "Ended" ? "text-gray-400" : "text-orange-600"}`}
                        >
                          {poll.timeLeft}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => setSelectedPoll(poll)}
                        >
                          Vote Now
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedResultPoll(poll)}
                        >
                          Results
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ===== LIST VIEW ===== */}
          {viewMode === "list" && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider w-12">
                      No
                    </th>
                    <SortableTh col="title">Poll Title</SortableTh>
                    <SortableTh col="type">Type</SortableTh>
                    <SortableTh col="status">Status</SortableTh>
                    <SortableTh col="participation">Participation</SortableTh>
                    <SortableTh col="votes">Votes</SortableTh>
                    <SortableTh col="timeLeft">Time Left</SortableTh>
                    <SortableTh col="createdAt">Created</SortableTh>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-16 text-center text-gray-500"
                      >
                        No polls found
                      </td>
                    </tr>
                  ) : (
                    pageData.map((poll, i) => (
                      <tr
                        key={poll.id}
                        className={`border-b border-gray-100 hover:bg-blue-50/40 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}
                      >
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {pageIndex * pageSize + i + 1}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900 text-sm">
                            {poll.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {poll.description}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2.5 py-1 text-xs font-medium rounded-full ${pollTypeBadgeClass[poll.type]}`}
                          >
                            {pollTypeLabel[poll.type]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${poll.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                          >
                            {poll.status === "active" ? "Active" : "Closed"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 min-w-[110px]">
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                                style={{ width: `${poll.participation}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-700 w-8 text-right">
                              {poll.participation}%
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          {poll.votes.toLocaleString()}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`text-sm font-medium ${poll.timeLeft === "Ended" ? "text-gray-400" : "text-orange-600"}`}
                          >
                            {poll.timeLeft}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                          {poll.createdAt}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                console.log(
                                  "Clicked Vote button for poll:",
                                  poll.id,
                                );
                                setSelectedPoll(poll);
                              }}
                            >
                              Vote
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setSelectedResultPoll(poll)}
                            >
                              Results
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* ===== PAGINATION (bottom of card) ===== */}
          {filteredData.length > 0 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Page {pageIndex + 1} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goToPage(0)}
                  disabled={pageIndex === 0}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goToPage(pageIndex - 1)}
                  disabled={pageIndex === 0}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i)
                  .filter(
                    (p) =>
                      p === 0 ||
                      p === totalPages - 1 ||
                      Math.abs(p - pageIndex) <= 1,
                  )
                  .map((page, idx, arr) => (
                    <>
                      {idx > 0 && arr[idx - 1] !== page - 1 && (
                        <span
                          key={`ellipsis-${page}`}
                          className="px-1 text-gray-400 text-sm"
                        >
                          …
                        </span>
                      )}
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                          pageIndex === page
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {page + 1}
                      </button>
                    </>
                  ))}

                <button
                  onClick={() => goToPage(pageIndex + 1)}
                  disabled={pageIndex >= totalPages - 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => goToPage(totalPages - 1)}
                  disabled={pageIndex >= totalPages - 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Vote Modal */}
      {selectedPoll && (
        <CardVotenow
          poll={selectedPoll}
          onClose={() => setSelectedPoll(null)}
        />
      )}

      {/* Results Modal */}
      {selectedResultPoll && (
        <CardResults
          poll={selectedResultPoll}
          onClose={() => setSelectedResultPoll(null)}
        />
      )}

      <BottomBar />
    </div>
  );
}
