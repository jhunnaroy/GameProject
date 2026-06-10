const Leaderboard = ({
  players = [],
}) => {

  const sortedPlayers = [
    ...players,
  ].sort(
    (a, b) =>
      b.score - a.score
  );

  const getMedal = (
    index
  ) => {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `#${index + 1}`;
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4">

      <h2 className="text-white text-xl font-bold mb-4">
        Leaderboard
      </h2>

      {sortedPlayers.length === 0 ? (
        <p className="text-gray-400 text-center">
          No players available
        </p>
      ) : (
        <div className="space-y-3">

          {sortedPlayers.map(
            (
              player,
              index
            ) => (
              <div
                key={player.name}
                className="bg-slate-700 rounded-lg p-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    {getMedal(
                      index
                    )}
                  </span>

                  <div>
                    <h3 className="text-white font-semibold">
                      {
                        player.name
                      }
                    </h3>

                    {player.isDrawer && (
                      <p className="text-yellow-400 text-sm">
                        🎨 Drawing
                      </p>
                    )}
                  </div>

                </div>

                <div className="text-green-400 font-bold">
                  {
                    player.score
                  }{" "}
                  pts
                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
};

export default Leaderboard;