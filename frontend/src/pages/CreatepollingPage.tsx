import { useState } from "react";
import Topbar from "@/components/common/Topbar";
import Card from "@/components/common/Card";
import Dropdown from "@/components/common/Dropdown";
import CardSingleChoice from "@/components/polls/CardSinglechoice";
import CardMultipleChoice from "@/components/polls/CardMultipleChoice";
import CardRankedChoice from "@/components/polls/CardRankedChoice";
import BottomBar from "@/components/common/BottomBar";

type PollType = "single" | "multiple" | "ranked" | null;

const pollTypeOptions = [
  { value: "single", label: "Single Choice" },
  { value: "multiple", label: "Multiple Choice" },
  { value: "ranked", label: "Ranked Choice" },
];

export default function CreatePollingPage() {
  const [selectedPollType, setSelectedPollType] = useState<PollType>(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Topbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6 w-full">
        {/* Card 1: Header & Dropdown */}
        <Card>
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create New Poll
            </h1>
            <p className="text-gray-600">
              Choose your poll type and configure the options
            </p>
          </div>

          {/* Dropdown */}
          <Dropdown
            id="pollType"
            label="Select Poll Type"
            options={pollTypeOptions}
            value={selectedPollType || ""}
            onChange={(value) => setSelectedPollType(value as PollType)}
            placeholder="Select poll type..."
          />
        </Card>

        {/* Card 2: Poll Type Forms */}
        {selectedPollType === "single" && (
          <Card>
            <CardSingleChoice />
          </Card>
        )}

        {selectedPollType === "multiple" && (
          <Card>
            <CardMultipleChoice />
          </Card>
        )}

        {selectedPollType === "ranked" && (
          <Card>
            <CardRankedChoice />
          </Card>
        )}
      </main>

      <BottomBar />
    </div>
  );
}
