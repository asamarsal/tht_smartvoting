export interface Poll {
  id: number;
  title: string;
  description: string;
  type: "single" | "multiple" | "ranked";
  isAnonymous: boolean;
  isLive: boolean;
  participation: number;
  votes: number;
  timeLeft: string;
  status: "active" | "closed";
  createdAt: string;
}

export const mockPolls: Poll[] = [
  { id: 1, title: "Rank your priorities in web development", description: "Order these aspects by importance in your workflow", type: "ranked", isAnonymous: true, isLive: true, participation: 82, votes: 667, timeLeft: "23h left", status: "active", createdAt: "18/2/2026" },
  { id: 2, title: "Prioritize features for next release", description: "Rank these proposed features by importance", type: "ranked", isAnonymous: false, isLive: true, participation: 68, votes: 425, timeLeft: "1d left", status: "active", createdAt: "18/2/2026" },
  { id: 3, title: "Best frontend framework 2025", description: "Vote for your preferred frontend framework", type: "single", isAnonymous: false, isLive: true, participation: 91, votes: 1203, timeLeft: "2d left", status: "active", createdAt: "17/2/2026" },
  { id: 4, title: "Team lunch preferences", description: "Select all cuisines you enjoy", type: "multiple", isAnonymous: true, isLive: false, participation: 100, votes: 24, timeLeft: "Ended", status: "closed", createdAt: "15/2/2026" },
  { id: 5, title: "Remote work policy vote", description: "How many days per week should we work remotely?", type: "single", isAnonymous: true, isLive: true, participation: 55, votes: 312, timeLeft: "5h left", status: "active", createdAt: "17/2/2026" },
  { id: 6, title: "Office equipment priority", description: "Rank the equipment upgrades by priority", type: "ranked", isAnonymous: false, isLive: false, participation: 78, votes: 89, timeLeft: "Ended", status: "closed", createdAt: "14/2/2026" },
  { id: 7, title: "Q1 OKR priorities", description: "Select the most important objectives for Q1", type: "multiple", isAnonymous: false, isLive: true, participation: 43, votes: 156, timeLeft: "3d left", status: "active", createdAt: "16/2/2026" },
  { id: 8, title: "Preferred meeting time slots", description: "Choose all time slots that work for you", type: "multiple", isAnonymous: true, isLive: true, participation: 67, votes: 201, timeLeft: "12h left", status: "active", createdAt: "18/2/2026" },
  { id: 9, title: "Tech stack for new project", description: "Vote on the technology stack", type: "single", isAnonymous: false, isLive: false, participation: 100, votes: 45, timeLeft: "Ended", status: "closed", createdAt: "12/2/2026" },
  { id: 10, title: "Annual team event venue", description: "Rank the venue options for our annual event", type: "ranked", isAnonymous: true, isLive: true, participation: 29, votes: 78, timeLeft: "6d left", status: "active", createdAt: "18/2/2026" },
  { id: 11, title: "Code review process improvement", description: "Select improvements for our code review process", type: "multiple", isAnonymous: false, isLive: true, participation: 72, votes: 134, timeLeft: "2d left", status: "active", createdAt: "16/2/2026" },
  { id: 12, title: "Best programming language", description: "Vote for your favorite programming language", type: "single", isAnonymous: true, isLive: false, participation: 100, votes: 892, timeLeft: "Ended", status: "closed", createdAt: "10/2/2026" },
];
