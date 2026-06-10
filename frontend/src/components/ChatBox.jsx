import { useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";

const ChatBox = ({
  messages = [],
  onSendMessage,
}) => {
  const [message, setMessage] =
    useState("");

  const messagesEndRef =
    useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSendMessage(message);

    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="bg-slate-800 rounded-xl h-full flex flex-col">

      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <h2 className="text-white text-lg font-bold">
          Chat
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">

        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">
            No messages yet
          </p>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              sender={msg.sender}
              text={msg.text}
              isSystem={msg.isSystem}
              isCorrect={msg.isCorrect}
            />
          ))
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-700 p-4 flex gap-2"
      >
        <input
          type="text"
          placeholder="Type your guess..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white border border-slate-600 outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Send
        </button>
      </form>

    </div>
  );
};

export default ChatBox;