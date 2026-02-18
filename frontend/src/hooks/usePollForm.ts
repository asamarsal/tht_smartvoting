import { useState } from "react";

export const usePollForm = (initialOptions: string[] = ["", ""]) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState<string[]>(initialOptions);

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

  return {
    title,
    setTitle,
    description,
    setDescription,
    options,
    addOption,
    removeOption,
    updateOption,
  };
};
