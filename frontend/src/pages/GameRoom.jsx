import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import DrawingCanvas from "../components/DrawingCanvas";
import ChatBox from "../components/ChatBox";
import PlayerList from "../components/PlayerList";
import Leaderboard from "../components/Leaderboard";
import Timer from "../components/Timer";
import WordSelection from "../components/WordSelecton";

import { getRoom } from "../services/roomApi";

import {
  connectSocket,
} from "../services/socket";

const GameRoom = () => {
  const { roomCode } = useParams();
  const location = useLocation();

  const socket = connectSocket();

  const playerName =
    location.state?.playerName ||
    localStorage.getItem("playerName") ||
    "Player";

  const [players, setPlayers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentWord, setCurrentWord] =
  useState("");

const [hint, setHint] =
  useState("_ _ _ _");

const [showWordSelection, setShowWordSelection] =
  useState(false);

const [isDrawer, setIsDrawer] =
  useState(false);

  const words = [
    "Apple",
    "Tiger",
    "Cricket",
  ];

  // ==========================
  // Load Room
  // ==========================
  useEffect(() => {
    const loadRoom = async () => {
      try {
        const data = await getRoom(roomCode);

        if (data?.room?.players) {
          const updatedPlayers =
            data.room.players.map((player) => ({
              ...player,
              score: player.score || 0,
              guessedCorrectly:
                player.guessedCorrectly || false,
            }));

          setPlayers(updatedPlayers);
        } else if (data?.players) {
          const updatedPlayers =
            data.players.map((player) => ({
              ...player,
              score: player.score || 0,
              guessedCorrectly:
                player.guessedCorrectly || false,
            }));

          setPlayers(updatedPlayers);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadRoom();
  }, [roomCode]);

  // ==========================
  // Socket Events
  // ==========================
useEffect(() => {
  if (!socket) return;

  socket.emit("join_room", {
    roomCode,
    playerName,
  });

  socket.on(
    "player_joined",
    ({ players }) => {
      setPlayers(players);
    }
  );

  socket.on(
    "player_left",
    ({ players }) => {
      setPlayers(players);
    }
  );

  socket.on(
    "game_started",
    (room) => {
      setPlayers(room.players || []);

      if (
        room.currentDrawer ===
        playerName
      ) {
        setIsDrawer(true);
        setShowWordSelection(true);
      } else {
        setIsDrawer(false);
        setShowWordSelection(false);
      }
    }
  );

  socket.on(
    "word_selected",
    (data) => {

      setHint(data.hint);

      setShowWordSelection(false);

      if (
        data.drawer ===
        playerName
      ) {
        setCurrentWord(data.word);
      }

    }
  );

  socket.on(
    "guess_wrong",
    ({ playerName, guess }) => {

      setMessages((prev) => [
        ...prev,
        {
          sender: playerName,
          text: guess,
        },
      ]);

    }
  );

  socket.on(
    "correct_guess",
    ({ playerName, points }) => {

      setMessages((prev) => [
        ...prev,
        {
          sender: "System",
          text: `${playerName} guessed correctly 🎉`,
        },
      ]);

      setPlayers((prev) =>
        prev.map((player) =>
          player.name === playerName
            ? {
                ...player,
                score: points,
                guessedCorrectly: true,
              }
            : player
        )
      );

    }
  );

  socket.on(
    "leaderboard_update",
    (leaderboard) => {
      setPlayers(leaderboard);
    }
  );

  return () => {

    socket.off("player_joined");
    socket.off("player_left");
    socket.off("game_started");
    socket.off("word_selected");
    socket.off("guess_wrong");
    socket.off("correct_guess");
    socket.off("leaderboard_update");

  };

}, [roomCode, playerName]);
  // ==========================
  // Select Word
  // ==========================
  const handleWordSelect = (word) => {

  setCurrentWord(word);

  socket.emit(
    "choose_word",
    {
      roomCode,
      word,
    }
  );

  setShowWordSelection(false);

};

  // ==========================
  // Send Guess
  // ==========================
  const handleSendMessage = (text) => {

    socket.emit("guess", {
      roomCode,
      playerName,
      guess: text,
      remainingTime: 30,
    });

  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">

   {isDrawer &&
  showWordSelection && (
    <WordSelection
      words={words}
      onSelectWord={
        handleWordSelect
      }
    />
)}

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

        <div className="lg:col-span-2">
          <PlayerList players={players} />
        </div>

        <div className="lg:col-span-7">

          <div className="bg-slate-800 rounded-xl p-4">

            <div className="flex justify-between mb-4">

              <h3 className="font-bold">
                Word Hint
              </h3>

              <span className="text-2xl tracking-widest">

               {isDrawer
  ? currentWord
  : hint}

              </span>

            </div>

            <DrawingCanvas />

          </div>

        </div>

        <div className="lg:col-span-3">

          <ChatBox
            messages={messages}
            onSendMessage={
              handleSendMessage
            }
          />

        </div>

      </div>

      <div className="mt-4">

        <Leaderboard
          players={players}
        />

      </div>

    </div>
  );
};

export default GameRoom;