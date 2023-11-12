import { useState } from "react";

const prompts: string[] = [
  "This is my first prompt",
  "Second prompt with more content",
  "Third prompt about birds",
  "Fourth prompt about dogs",
  "Fifth prompt about cats",
  "Sixth prompt about animals in general",
];

export const PromptInput = ({
  onSubmit,
}: {
  onSubmit: (prompt: string) => unknown;
}) => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);

  const matchPrompts = (value: string) => {
    const suggestions =
      value.length === 0
        ? []
        : prompts.filter((prompt) => {
            const regex = new RegExp(`${value}`, "i");
            return prompt.match(regex);
          });

    return suggestions;
  };

  const selectSuggestion = (prompt: string) => {
    setSelectedPrompt("");
    setSuggestedPrompts([]);
    onSubmit(prompt);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const matches = matchPrompts(event.currentTarget.value);
    setSuggestedPrompts(matches);
    setSelectedPrompt(event.currentTarget.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value !== "") {
      setSelectedPrompt("");
      onSubmit(event.currentTarget.value);
    }
  };

  return (
    <div className="w-full relative">
      <input
        autoFocus={true}
        name="prompt"
        value={selectedPrompt}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className="w-full text-black flex-auto rounded-t-md border-0 px-3.5 py-2 shadow-sm focus:outline-none  sm:text-sm sm:leading-6"
        placeholder="Start typing to get prompt suggestions"
      />
      {suggestedPrompts.length > 0 && (
        <div className="absolute bg-gray-800 z-50 w-full p-2 rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-white/10">
          <div className="max-h-80 overflow-auto">
            {suggestedPrompts.slice(0, 10).map((prompt) => (
              <button
                onClick={() => selectSuggestion(prompt)}
                key={prompt}
                className="w-full text-left hover:bg-sky-950 px-1 py-1 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
