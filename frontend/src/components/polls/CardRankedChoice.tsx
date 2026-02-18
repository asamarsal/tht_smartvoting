import { useState } from "react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Plus, X, GripVertical } from "lucide-react";

export default function CardRankedChoice() {
  const [pollTitle, setPollTitle] = useState("");
  const [pollDescription, setPollDescription] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    const pollData = {
      type: "ranked",
      title: pollTitle,
      description: pollDescription,
      options: options.filter((opt) => opt.trim() !== ""),
    };
    console.log("Poll Data:", pollData);
    // TODO: Submit to API
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Ranked Choice Voting:</strong> Voters will rank candidates in
          order of preference (1st, 2nd, 3rd, etc.)
        </p>
      </div>

      {/* Poll Title */}
      <Input
        label="Poll Title"
        value={pollTitle}
        onChange={(e) => setPollTitle(e.target.value)}
        placeholder="Enter your poll question"
        required
      />

      {/* Poll Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={pollDescription}
          onChange={(e) => setPollDescription(e.target.value)}
          placeholder="Add more details about your poll"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Candidates
        </label>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <div className="flex-1">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Candidate ${index + 1}`}
                  required
                />
              </div>
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  aria-label="Remove option"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addOption}
          className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Add Candidate
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t">
        <Button onClick={handleSubmit} variant="primary">
          Create Poll
        </Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    </div>
  );
}
