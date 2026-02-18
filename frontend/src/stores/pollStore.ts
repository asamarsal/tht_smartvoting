import { create } from 'zustand';
import type { Poll } from '@/utils/dummydata';
import { mockPolls } from '@/utils/dummydata';

type PollType = 'all' | 'single' | 'multiple' | 'ranked';
type PollStatus = 'all' | 'active' | 'closed';
type ViewMode = 'card' | 'list';

interface PollFilter {
  type: PollType;
  status: PollStatus;
  search: string;
}

interface PollState {
  polls: Poll[];
  filteredPolls: Poll[];
  filters: PollFilter;
  viewMode: ViewMode;
  loading: boolean;

  // Actions
  setFilter: (key: keyof PollFilter, value: any) => void;
  setViewMode: (mode: ViewMode) => void;
  searchPolls: () => void;
  initialize: () => void;
}

export const usePollStore = create<PollState>((set, get) => ({
  polls: [],
  filteredPolls: [],
  filters: {
    type: 'all',
    status: 'all',
    search: '',
  },
  viewMode: 'card',
  loading: false,

  initialize: () => {
    // Ideally this fetches from API
    set({ polls: mockPolls, filteredPolls: mockPolls });
  },

  setFilter: (key, value) => {
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    }));
    get().searchPolls();
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  searchPolls: () => {
    const { polls, filters } = get();
    
    let result = polls.filter((poll) => {
      const matchesType = filters.type === 'all' || poll.type === filters.type;
      const matchesStatus = filters.status === 'all' || poll.status === filters.status;
      const matchesSearch = poll.title.toLowerCase().includes(filters.search.toLowerCase()) || 
                           poll.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesStatus && matchesSearch;
    });

    set({ filteredPolls: result });
  },
}));
