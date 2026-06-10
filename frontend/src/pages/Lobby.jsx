import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Lobby = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([
    {
      name: "Jhunna",
      score: 0,
      isHost: true,
    },
    {
      name: "Rahul",
      score: 0,
      isHost: false,
    },
  ]);

  const playerName =
    localStorage.getItem("playerName");

  const isHost = true;

  const copyRoomCode = () => {
    navigator.clipboard.writeText(
      roomCode
    );

    alert("Room Code Copied!");
  };

  const startGameHandler = () => {
    navigate(`/game/${roomCode}`);
  };
console.log("playerName =", playerName);
console.log("host =", players[0]?.name);
console.log("isHost =", isHost);
  useEffect(() => {
    // Socket Join Room
    // socket.emit("join_room", {
    //   roomCode,
    //   playerName,
    // });
  }, [roomCode, playerName]);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-5">

          <h1 className="text-3xl font-bold text-center">
            Game Lobby
          </h1>

          <p className="text-center text-gray-400 mt-2">
            Waiting for players...
          </p>

        </div>

        {/* Room Info */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>

            <h2 className="text-xl font-bold">
              Room Code
            </h2>

            <p className="text-3xl font-bold text-green-400 tracking-widest">
              {roomCode}
            </p>

          </div>

          <button
            onClick={copyRoomCode}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
          >
            Copy Code
          </button>

        </div>

        {/* Players Section */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-5">

          <h2 className="text-2xl font-bold mb-5">
            Players ({players.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {players.map(
              (player, index) => (
                <div
                  key={index}
                  className="bg-slate-700 rounded-xl p-4"
                >
                  <h3 className="text-lg font-semibold">
                    {player.name}
                  </h3>

                  {player.isHost && (
                    <span className="text-yellow-400 text-sm">
                      👑 Host
                    </span>
                  )}
                </div>
              )
            )}

          </div>

        </div>

        {/* Rules Section */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-5">

          <h2 className="text-xl font-bold mb-4">
            Game Settings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-gray-300">
                Max Players
              </p>

              <h3 className="text-xl font-bold">
                8
              </h3>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-gray-300">
                Rounds
              </p>

              <h3 className="text-xl font-bold">
                3
              </h3>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="text-gray-300">
                Draw Time
              </p>

              <h3 className="text-xl font-bold">
                60 sec
              </h3>
            </div>

          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">

          {isHost && (
            <button
              onClick={startGameHandler}
              className="flex-1 bg-green-600 hover:bg-green-700 py-4 rounded-xl text-lg font-bold"
            >
              Start Game
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-red-600 hover:bg-red-700 py-4 rounded-xl text-lg font-bold"
          >
            Leave Room
          </button>

        </div>

      </div>

    </div>
  );
};

export default Lobby;