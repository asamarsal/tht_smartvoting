import { useState } from "react";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Poll } from "@/utils/dummydata";

interface Props {
  poll: Poll;
  onVote: (rankedOrder: number[], isAnonymous: boolean) => void;
}

const mockOptions = ["Option A", "Option B", "Option C", "Option D"];

// Sortable Item Component
function SortableItem({
  id,
  mockId,
  rank,
}: {
  id: string;
  mockId: string;
  rank: number;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white transition-all touch-none ${
        isDragging
          ? "border-blue-400 shadow-lg opacity-90 scale-102"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Rank badge */}
      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
        {rank}
      </span>

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1"
      >
        <GripVertical className="w-4 h-4 text-gray-400 shrink-0" />
      </div>

      <span className="flex-1 font-medium text-sm text-gray-700">{mockId}</span>
    </div>
  );
}

export default function CardVoteRankedchoice({ poll, onVote }: Props) {
  // Store indices as strings for dnd-kit
  const [items, setItems] = useState<string[]>(
    mockOptions.map((_, i) => i.toString()),
  );
  const [isAnonymousVote, setIsAnonymousVote] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-1">{poll.description}</p>
      <p className="text-xs text-gray-400 mb-4">
        Drag items to reorder from most (1) to least preferred
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((id, index) => (
              <SortableItem
                key={id}
                id={id}
                mockId={mockOptions[Number(id)]}
                rank={index + 1}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Anonymous Toggle */}
      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="anonymous-ranked"
          className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
          checked={isAnonymousVote}
          onChange={(e) => setIsAnonymousVote(e.target.checked)}
        />
        <label
          htmlFor="anonymous-ranked"
          className="text-sm text-gray-700 cursor-pointer select-none"
        >
          Vote anonymously
        </label>
      </div>

      <button
        onClick={() => onVote(items.map(Number), isAnonymousVote)}
        className="mt-4 w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition"
      >
        Submit Ranking
      </button>
    </div>
  );
}
