import { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
} from "react-router-dom";
import DrawingCanvas from "../components/DrawingCanvas";
import ChatBox from "../components/ChatBox";
import PlayerList from "../components/PlayerList";
import Leaderboard from "../components/Leaderboard";
import Timer from "../components/Timer";
import WordSelection from "../components/WordSelecton";

import { getRoom } from "../services/roomApi";

const GameRoom = () => {
  const { roomCode } = useParams();
  const location = useLocation();

const playerName =
  location.state?.playerName ||
  localStorage.getItem("playerName") ||
  "Player";

  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedWord, setSelectedWord] =
    useState("");

  const [showWordSelection, setShowWordSelection] =
    useState(true);

  const words = [
    "Apple",
    "Tiger",
    "Cricket",
  ];

  // Load room from database
  useEffect(() => {
    const loadRoom = async () => {
      try {
        const data = await getRoom(roomCode);

console.log("FULL DATA:", data);
console.log("ROOM:", data?.room);
console.log("PLAYERS:", data?.room?.players);
console.log("DIRECT PLAYERS:", data?.players);

if (data?.room?.players) {

  const updatedPlayers =
    data.room.players.map(
      (player) => ({
        ...player,
        score: player.score || 0,
        guessedCorrectly:
          player.guessedCorrectly || false,
      })
    );

  setPlayers(updatedPlayers);

} else if (data?.players) {

  const updatedPlayers =
    data.players.map(
      (player) => ({
        ...player,
        score: player.score || 0,
        guessedCorrectly:
          player.guessedCorrectly || false,
      })
    );

  setPlayers(updatedPlayers);
}
   

      } catch (error) {
        console.log(error);
      }
    };

    loadRoom();
  }, [roomCode]);

  const handleWordSelect = (word) => {
    setSelectedWord(word);
    setShowWordSelection(false);
  };

const handleSendMessage = (text) => {

  // Add chat message
  setMessages((prev) => [
    ...prev,
    {
      sender: playerName,
      text,
    },
  ]);

  // Correct answer
  if (
    selectedWord &&
    text.trim().toLowerCase() ===
      selectedWord.trim().toLowerCase()
  ) {

    alert(
      `🎉 ${playerName} guessed correctly!`
    );

    setPlayers((prev) =>
      prev.map((player) =>
        player.name === playerName
          ? {
              ...player,
              score:
                (player.score || 0) + 100,
              guessedCorrectly: true,
            }
          : player
      )
    );
  }
};
  console.log("Players State:", players);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">

      {/* Word Selection */}
      {showWordSelection && (
        <WordSelection
          words={words}
          onSelectWord={handleWordSelect}
        />
      )}

      {/* Top Bar */}
      <div className="bg-slate-800 rounded-xl p-4 mb-4 flex justify-between items-center">

        <h2 className="text-xl font-bold">
          Room: {roomCode}
        </h2>

        <div className="flex gap-4">

          <Timer initialTime={60} />

          <div className="bg-green-600 px-4 py-2 rounded-lg">
            Round 1 / 3
          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Players */}
        <div className="lg:col-span-2">

          <PlayerList players={players} />

        </div>

        {/* Canvas */}
        <div className="lg:col-span-7">

          <div className="bg-slate-800 rounded-xl p-4">

            <div className="flex justify-between mb-4">

              <h3 className="font-bold">
                Word Hint
              </h3>

              <span className="text-2xl tracking-widest">

                {selectedWord
                  ? selectedWord
                      .split("")
                      .map((char) =>
                        char === " "
                          ? " "
                          : "_"
                      )
                      .join(" ")
                  : "_ _ _ _ _"}

              </span>

            </div>

            <DrawingCanvas />

          </div>

        </div>

        {/* Chat */}
        <div className="lg:col-span-3">

          <ChatBox
            messages={messages}
            onSendMessage={
              handleSendMessage
            }
          />

        </div>

      </div>

      {/* Leaderboard */}
      <div className="mt-4">

        <Leaderboard
          players={players}
        />

      </div>

    </div>
  );
};

export default GameRoom;