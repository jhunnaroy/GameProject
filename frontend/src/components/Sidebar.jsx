import PlayerList from "./PlayerList";
import ScoreBoard from "./ScoreBoard";

const Sidebar = ({
  players = [],
  currentDrawer = "",
  round = 1,
  totalRounds = 3,
  timeLeft = 60,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">

      {/* Game Info */}
      <div className="bg-slate-800 rounded-xl p-4">

        <h2 className="text-white text-xl font-bold mb-4">
          Game Info
        </h2>

        <div className="space-y-3">

          {/* Current Drawer */}
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-gray-400 text-sm">
              Current Drawer
            </p>

            <h3 className="text-yellow-400 font-bold text-lg">
              🎨 {currentDrawer || "Waiting..."}
            </h3>
          </div>

          {/* Round */}
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-gray-400 text-sm">
              Round
            </p>

            <h3 className="text-green-400 font-bold text-lg">
              {round} / {totalRounds}
            </h3>
          </div>

          {/* Timer */}
          <div className="bg-slate-700 p-3 rounded-lg">
            <p className="text-gray-400 text-sm">
              Time Remaining
            </p>

            <h3
              className={`font-bold text-lg ${
                timeLeft <= 10
                  ? "text-red-500"
                  : "text-blue-400"
              }`}
            >
              ⏱ {timeLeft}s
            </h3>
          </div>

        </div>

      </div>

      {/* Players */}
      <div className="bg-slate-800 rounded-xl p-4">
        <PlayerList players={players} />
      </div>

      {/* Score Board */}
      <div className="bg-slate-800 rounded-xl p-4">
        <ScoreBoard players={players} />
      </div>

    </div>
  );
};

export default Sidebar;