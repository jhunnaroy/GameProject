const ChatMessage = ({
  sender,
  text,
  isSystem = false,
  isCorrect = false,
}) => {
  return (
    <div
      className={`p-3 rounded-lg break-words ${
        isSystem
          ? "bg-yellow-600 text-white"
          : isCorrect
          ? "bg-green-600 text-white"
          : "bg-slate-700 text-white"
      }`}
    >
      {!isSystem && (
        <p className="font-semibold text-blue-300 mb-1">
          {sender}
        </p>
      )}

      <p>{text}</p>
    </div>
  );
};

export default ChatMessage;