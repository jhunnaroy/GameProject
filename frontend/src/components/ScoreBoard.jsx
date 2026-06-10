const ScoreBoard = ({
  players = [],
}) => {

  const sortedPlayers = [
    ...players,
  ].sort(
    (a, b) =>
      b.score - a.score
  );

  return (
    <div className="bg-slate-800 rounded-xl p-4">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-bold text-white">
          🏆 Score Board
        </h2>

        <span className="bg-slate-700 px-3 py-1 rounded-lg text-white">
          {players.length} Players
        </span>

      </div>

      {sortedPlayers.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-400">
            No Players Available
          </p>
        </div>
      ) : (
        <div className="space-y-3">

          {sortedPlayers.map(
            (player, index) => (
              <div
                key={
                  player._id ||
                  player.name ||
                  index
                }
                className="bg-slate-700 rounded-lg p-3 flex justify-between items-center"
              >

                {/* Left */}
                <div className="flex items-center gap-3">

                  <div className="text-xl font-bold text-yellow-400">

                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                    {index > 2 &&
                      `#${index + 1}`}

                  </div>

                  <div>

                    <h3 className="text-white font-semibold">
                      {player.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-1">

                      {player.isHost && (
                        <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                          👑 Host
                        </span>
                      )}

                      {player.isDrawer && (
                        <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                          🎨 Drawer
                        </span>
                      )}

                      {player.guessedCorrectly && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                          ✅ Correct
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* Right */}
                <div className="text-right">

                  <p className="text-green-400 font-bold text-xl">
                    {player.score}
                  </p>

                  <p className="text-gray-300 text-sm">
                    Points
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default ScoreBoard;