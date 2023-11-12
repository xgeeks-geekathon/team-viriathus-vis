"use client";
import Navbar from "@/components/Navbar";
import { useRef, useState } from "react";
import { useCompletion } from "ai/react";
import { PromptInput } from "@/components/PromptInput";

export default function Home() {
  const {
    completion,
    complete,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/qa-openai",
    onFinish: (_prompt, answer) => {
      setMessages((prevMessages) => [answer, ...prevMessages]);
    },
  });
  const [messages, setMessages] = useState<string[]>([]);
  const [prompt, setPrompt] = useState(input);
  const formRef = useRef<HTMLFormElement>(null);

  const onPromptChange = (e: any) => {
    setPrompt(e.target.value);
    handleInputChange(e);
  };

  const onPromptSubmit = (prompt: string) => {
    setMessages((prevMessages) => [prompt, ...prevMessages]);
    complete(prompt);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Navbar />

      <div className="flex flex-col w-full min-h-screen h-full bg-gray-900 pt-[100px]">
        <div className="container mx-auto">
          <PromptInput onSubmit={(prompt) => onPromptSubmit(prompt)} />

          <div className="messages rounded-b-md min-h-[40px] mb-[20px] bg-gray-800 p-4 mb-5">
            {messages.map((message) => (
              <div
                key={message}
                className="message even:bg-gray-500 odd:bg-gray-600 odd:mt-4 text-white p-5"
              >
                {message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
