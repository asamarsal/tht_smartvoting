import { useState } from "react";
import { usePollForm } from "@/hooks/usePollForm";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { Plus, X } from "lucide-react";

export default function CardMultipleChoice() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    options,
    addOption,
    removeOption,
    updateOption,
  } = usePollForm();
  const [minSelections, setMinSelections] = useState(1);
  const [maxSelections, setMaxSelections] = useState(3);

  const handleSubmit = () => {
    const pollData = {
      type: "multiple",
      title,
      description,
      options: options.filter((opt) => opt.trim() !== ""),
      minSelections,
      maxSelections,
    };
    console.log("Poll Data:", pollData);
    // TODO: Submit to API
  };

  return (
    <div className="space-y-6">
      {/* Poll Title */}
      <Input
        label="Poll Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter your poll question"
        required
      />

      {/* Poll Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details about your poll"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
        />
      </div>

      {/* Selection Range */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Selections
          </label>
          <input
            type="number"
            min={1}
            value={minSelections}
            onChange={(e) => setMinSelections(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Selections
          </label>
          <input
            type="number"
            min={minSelections}
            value={maxSelections}
            onChange={(e) => setMaxSelections(parseInt(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options
        </label>
        <div className="space-y-3">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1">
                <Input
                  value={option}
                  onChange={(e) => updateOption(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
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
          Add Option
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
